package com.hms;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HotelManagementApplicationTest {
    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate http;

    private String url(String path) {
        return "http://localhost:" + port + "/api/v1" + path;
    }

    private long createGuest() {
        String suffix = UUID.randomUUID().toString();
        Map<String, String> request = Map.of(
            "name", "Guest " + suffix.substring(0, 8),
            "email", suffix + "@example.test",
            "phone", "1234567890",
            "idNumber", "ID-" + suffix.substring(0, 8)
        );
        ResponseEntity<Map> response = http.postForEntity(url("/guests"), request, Map.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        return ((Number) response.getBody().get("id")).longValue();
    }

    private long createRoom() {
        Map<String, Object> request = Map.of(
            "roomNumber", "R-" + UUID.randomUUID().toString().substring(0, 8),
            "type", "DOUBLE",
            "pricePerNight", 125.00,
            "status", "AVAILABLE"
        );
        ResponseEntity<Map> response = http.postForEntity(url("/rooms"), request, Map.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        return ((Number) response.getBody().get("id")).longValue();
    }

    private Map<String, Object> bookingRequest(long guestId, long roomId, LocalDate checkIn, LocalDate checkOut) {
        return Map.of(
            "guestId", guestId,
            "roomId", roomId,
            "checkInDate", checkIn.toString(),
            "checkOutDate", checkOut.toString()
        );
    }

    @Test
    void healthEndpointIsAvailable() {
        ResponseEntity<String> response = http.getForEntity(url("/health"), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).contains("UP");
    }

    @Test
    void roomsEndpointReturnsAList() {
        ResponseEntity<String> response = http.getForEntity(url("/rooms"), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).startsWith("[");
        assertThat(response.getBody()).endsWith("]");
    }

    @Test
    void concurrentOverlappingBookingsCannotBothSucceedAndAdjacentStayIsAllowed() throws Exception {
        long guestOne = createGuest();
        long guestTwo = createGuest();
        long roomId = createRoom();
        LocalDate checkIn = LocalDate.now().plusDays(10);
        LocalDate checkOut = checkIn.plusDays(2);

        Map<String, Object> firstRequest = bookingRequest(guestOne, roomId, checkIn, checkOut);
        Map<String, Object> secondRequest = bookingRequest(guestTwo, roomId, checkIn.plusDays(1), checkOut.plusDays(1));

        ExecutorService executor = Executors.newFixedThreadPool(2);
        CountDownLatch ready = new CountDownLatch(2);
        CountDownLatch start = new CountDownLatch(1);

        try {
            Future<ResponseEntity<String>> first = executor.submit(() -> {
                ready.countDown();
                start.await();
                return http.postForEntity(url("/bookings"), firstRequest, String.class);
            });
            Future<ResponseEntity<String>> second = executor.submit(() -> {
                ready.countDown();
                start.await();
                return http.postForEntity(url("/bookings"), secondRequest, String.class);
            });

            assertThat(ready.await(5, TimeUnit.SECONDS)).isTrue();
            start.countDown();

            ResponseEntity<String> firstResponse = first.get(15, TimeUnit.SECONDS);
            ResponseEntity<String> secondResponse = second.get(15, TimeUnit.SECONDS);

            assertThat(java.util.List.of(firstResponse.getStatusCode(), secondResponse.getStatusCode()))
                .containsExactlyInAnyOrder(HttpStatus.CREATED, HttpStatus.CONFLICT);
        } finally {
            start.countDown();
            executor.shutdownNow();
        }

        ResponseEntity<String> adjacent = http.postForEntity(
            url("/bookings"),
            bookingRequest(guestTwo, roomId, checkOut, checkOut.plusDays(2)),
            String.class
        );
        assertThat(adjacent.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        ResponseEntity<String> invalidDates = http.postForEntity(
            url("/bookings"),
            bookingRequest(guestTwo, roomId, checkOut.plusDays(3), checkOut.plusDays(3)),
            String.class
        );
        assertThat(invalidDates.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}

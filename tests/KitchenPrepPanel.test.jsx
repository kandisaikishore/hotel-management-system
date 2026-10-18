import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KitchenPrepPanel from '../components/KitchenPrepPanel.jsx';

afterEach(() => cleanup());

describe('kitchen recipe prep station', () => {
  it('shows ingredient quantities for two guests by default', () => {
    render(<KitchenPrepPanel />);
    expect(screen.getByRole('heading', { name: /recipe prep station/i })).toBeInTheDocument();
    expect(screen.getByText('180–200 g')).toBeInTheDocument();
    expect(screen.getByText('2 packed cups')).toBeInTheDocument();
  });

  it('scales quantities for four servings', async () => {
    const user = userEvent.setup();
    render(<KitchenPrepPanel />);
    await user.click(screen.getByRole('button', { name: /4 servings/i }));
    expect(screen.getByText('360–400 g')).toBeInTheDocument();
    expect(screen.getByText('4 packed cups')).toBeInTheDocument();
    expect(screen.getByText(/Quantities for four guests/i)).toBeInTheDocument();
  });

  it('tracks ingredient checklist progress and can reset it', async () => {
    const user = userEvent.setup();
    render(<KitchenPrepPanel />);
    await user.click(screen.getByRole('checkbox', { name: /spaghetti or penne/i }));
    expect(screen.getByText('1 of 10 ingredients ready')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /reset prep checklist/i }));
    expect(screen.getByText('0 of 10 ingredients ready')).toBeInTheDocument();
  });

  it('advances through the cooking workflow and reports completion', async () => {
    const user = userEvent.setup();
    render(<KitchenPrepPanel />);
    await user.click(screen.getByRole('button', { name: /complete & next step/i }));
    expect(screen.getByText(/Warm olive oil over medium-low heat/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /complete & next step/i }));
    await user.click(screen.getByRole('button', { name: /complete & next step/i }));
    await user.click(screen.getByRole('button', { name: /finish recipe/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/workflow complete/i);
  });
});

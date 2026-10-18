import { useMemo, useState } from 'react';
import { ChefHat, CheckCircle2, Circle, Clock3, RotateCcw, Users } from 'lucide-react';

const INGREDIENTS = [
  { id: 'pasta', name: 'Spaghetti or penne', two: '180–200 g', four: '360–400 g' },
  { id: 'spinach', name: 'Fresh baby spinach', two: '2 packed cups', four: '4 packed cups' },
  { id: 'lemon', name: 'Lemon', two: '1', four: '2' },
  { id: 'garlic', name: 'Garlic cloves, minced', two: '3', four: '6' },
  { id: 'oil', name: 'Olive oil', two: '2 tbsp', four: '4 tbsp' },
  { id: 'cheese', name: 'Parmesan, grated', two: '¼ cup', four: '½ cup' },
  { id: 'water', name: 'Reserved pasta water', two: '½ cup', four: '1 cup' },
  { id: 'salt', name: 'Salt', two: 'To taste', four: 'To taste' },
  { id: 'pepper', name: 'Black pepper', two: 'To taste', four: 'To taste' },
  { id: 'chilli', name: 'Chilli flakes (optional)', two: '¼ tsp', four: '½ tsp' },
];

const STEPS = [
  { title: 'Boil the pasta', time: '8–12 min', detail: 'Cook pasta in salted boiling water until al dente. Reserve the listed pasta water before draining.' },
  { title: 'Build the garlic base', time: '2 min', detail: 'Warm olive oil over medium-low heat. Stir in minced garlic and optional chilli for 30–60 seconds; do not brown.' },
  { title: 'Wilt the spinach', time: '2–3 min', detail: 'Add spinach in handfuls and stir until wilted. Add a splash of pasta water if the pan looks dry.' },
  { title: 'Toss and finish', time: '2 min', detail: 'Toss pasta with Parmesan, lemon zest and juice to taste. Add pasta water gradually until glossy; season with salt and pepper.' },
];

export default function KitchenPrepPanel() {
  const [servings, setServings] = useState(2);
  const [checked, setChecked] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const progress = useMemo(() => Math.round((checked.length / INGREDIENTS.length) * 100), [checked.length]);
  const portionLabel = servings === 2 ? 'two guests' : 'four guests';

  function toggleIngredient(id) {
    setChecked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function resetPrep() {
    setChecked([]);
    setActiveStep(0);
    setCompletedSteps([]);
  }

  function markStepComplete() {
    setCompletedSteps((current) => current.includes(activeStep) ? current : [...current, activeStep]);
    if (activeStep < STEPS.length - 1) setActiveStep((current) => current + 1);
  }

  return (
    <section aria-labelledby="kitchen-prep-heading" className="mt-10 border-t-4 border-avail bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-avail-ink">
            <ChefHat className="size-5" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Kitchen operations</p>
          </div>
          <h2 id="kitchen-prep-heading" className="mt-2 font-display text-2xl font-bold sm:text-3xl">Recipe prep station</h2>
          <p className="mt-1 max-w-2xl text-sm text-ink/70">A guided lemon-and-spinach pasta prep card for the kitchen team. Ingredient quantities scale with the selected covers.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-sm font-semibold"><Clock3 className="size-4" aria-hidden="true" /> About 25 minutes</span>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xl font-bold">Ingredient checklist</h3>
            <div className="inline-flex rounded-md border border-line p-1" role="group" aria-label="Recipe servings">
              {[2, 4].map((count) => (
                <button key={count} type="button" aria-pressed={servings === count} onClick={() => setServings(count)}
                  className={`rounded px-3 py-2 text-sm font-semibold transition-colors ${servings === count ? 'bg-ink text-white' : 'text-ink hover:bg-paper'}`}>
                  <Users className="mr-1 inline size-4" aria-hidden="true" />{count} servings
                </button>
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-ink/65">Quantities for {portionLabel}. Check ingredients as they are gathered.</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper" role="progressbar" aria-label="Ingredients gathered" aria-valuemin="0" aria-valuemax={INGREDIENTS.length} aria-valuenow={checked.length}>
            <div className="h-full rounded-full bg-avail transition-all" style={{ width: progress + '%' }} />
          </div>
          <p className="mt-1 text-right text-xs text-ink/65">{checked.length} of {INGREDIENTS.length} ingredients ready</p>
          <ul className="mt-3 divide-y divide-line">
            {INGREDIENTS.map((ingredient) => {
              const isChecked = checked.includes(ingredient.id);
              return (
                <li key={ingredient.id}>
                  <label className={`flex cursor-pointer items-center gap-3 py-3 ${isChecked ? 'text-ink/55' : ''}`}>
                    <input type="checkbox" checked={isChecked} onChange={() => toggleIngredient(ingredient.id)} className="size-4 accent-[#2f9e66]" />
                    {isChecked ? <CheckCircle2 className="size-4 shrink-0 text-avail" aria-hidden="true" /> : <Circle className="size-4 shrink-0 text-ink/30" aria-hidden="true" />}
                    <span className={`min-w-0 flex-1 text-sm ${isChecked ? 'line-through' : 'font-medium'}`}>{ingredient.name}</span>
                    <span className="shrink-0 text-right text-sm tabular-nums text-ink/70">{servings === 2 ? ingredient.two : ingredient.four}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <button type="button" onClick={resetPrep} className="mt-4 inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold hover:bg-paper">
            <RotateCcw className="size-4" aria-hidden="true" /> Reset prep checklist
          </button>
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold">Cooking workflow</h3>
          <p className="mt-2 text-sm text-ink/65">Complete each stage in order. Finished steps are marked for this session.</p>
          <ol className="mt-4 space-y-3">
            {STEPS.map((step, index) => {
              const isComplete = completedSteps.includes(index);
              const isActive = activeStep === index;
              return (
                <li key={step.title} className={`border p-4 transition-colors ${isActive ? 'border-brass bg-paper' : 'border-line'}`}>
                  <button type="button" onClick={() => setActiveStep(index)} className="flex w-full items-start gap-3 text-left">
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold ${isComplete ? 'bg-avail text-white' : 'bg-ink text-white'}`}>{isComplete ? '✓' : index + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2 font-semibold">{step.title}<span className="text-xs font-medium text-ink/60">{step.time}</span></span>
                      {isActive && <span className="mt-2 block text-sm leading-6 text-ink/80">{step.detail}</span>}
                    </span>
                  </button>
                  {isActive && (
                    <button type="button" onClick={markStepComplete} className="ml-10 mt-3 rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white hover:bg-ink/85">
                      {isComplete ? 'Step completed' : index === STEPS.length - 1 ? 'Finish recipe' : 'Complete & next step'}
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
          {completedSteps.length === STEPS.length && (
            <p role="status" className="mt-4 rounded-md bg-avail-tint px-4 py-3 text-sm font-semibold text-avail-ink">Recipe workflow complete. Plate and serve while hot.</p>
          )}
          <p className="mt-4 text-xs leading-5 text-ink/60">Checklist and step progress are session-only; they reset when this component is refreshed or reset. This demo does not create kitchen orders or persist stock usage.</p>
        </div>
      </div>
    </section>
  );
}

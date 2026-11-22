import type { StudioCraftStep } from "@/data/artist";

export function StudioTechnique({ steps }: { steps: StudioCraftStep[] }) {
  return (
    <ol className="relative mt-8 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:grid-cols-4 lg:gap-5">
      {steps.map((step, index) => (
        <li
          key={step.step}
          className="relative flex w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none"
        >
          {index < steps.length - 1 && (
            <span
              className="pointer-events-none absolute start-10 top-10 hidden h-px w-[calc(100%-1.25rem)] bg-soft lg:block"
              aria-hidden="true"
            />
          )}
          <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-card border border-light bg-white p-5 transition-[border-color,box-shadow,transform] duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-raised sm:p-6 motion-reduce:transform-none motion-reduce:transition-none">
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-soft group-hover:scale-x-100 motion-reduce:transition-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex items-center justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-soft bg-ice font-mono text-xs font-semibold text-brand transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                {step.step}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-steel/70 transition-colors duration-300 group-hover:text-brand">
                Layer {step.step}
              </span>
            </div>

            <h3 className="mt-5 font-serif text-lg font-medium leading-snug tracking-tight text-deep transition-colors duration-300 group-hover:text-brand sm:mt-6 sm:text-xl">
              {step.title}
            </h3>

            <p className="mt-3 border-t border-light pt-3 text-sm leading-relaxed text-steel sm:mt-4 sm:pt-4">
              {step.description}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}

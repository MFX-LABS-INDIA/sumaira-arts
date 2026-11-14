import type { StudioCraftStep } from "@/data/artist";

export function StudioTechnique({ steps }: { steps: StudioCraftStep[] }) {
  return (
    <ol className="relative mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4">
      {steps.map((step, index) => (
        <li key={step.step} className="relative">
          {index < steps.length - 1 && (
            <span
              className="absolute start-5 top-5 hidden h-px w-[calc(100%+1rem)] bg-soft lg:block"
              aria-hidden="true"
            />
          )}
          <details
            name="studio-technique"
            className="group relative h-full overflow-hidden rounded-card border border-light bg-white transition-[border-color,box-shadow,transform] duration-500 ease-out-soft open:-translate-y-1 open:border-brand/40 open:shadow-raised hover:-translate-y-1 hover:border-brand/40 hover:shadow-raised focus-within:-translate-y-1 focus-within:border-brand/40 focus-within:shadow-raised motion-reduce:transition-none"
          >
            <summary className="flex min-h-56 cursor-pointer list-none flex-col p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand marker:content-none [&::-webkit-details-marker]:hidden sm:min-h-60 sm:p-6">
              <span className="flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-soft bg-ice font-mono text-xs font-medium text-brand transition-colors duration-300 group-open:border-brand group-open:bg-brand group-open:text-white">
                  {step.step}
                </span>
                <span
                  className="grid h-8 w-8 place-items-center rounded-full border border-light text-lg font-light leading-none text-brand transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </span>
              <span className="mt-6 font-serif text-lg font-medium leading-snug tracking-tight text-deep sm:text-xl">
                {step.title}
              </span>
            </summary>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out-soft group-open:grid-rows-[1fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] motion-reduce:transition-none">
              <div className="overflow-hidden">
                <p className="translate-y-2 border-t border-light px-5 py-4 text-sm leading-relaxed text-steel opacity-0 transition-[opacity,transform] delay-75 duration-500 ease-out-soft group-open:translate-y-0 group-open:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:px-6 sm:py-5 motion-reduce:translate-y-0 motion-reduce:transition-none">
                  {step.description}
                </p>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

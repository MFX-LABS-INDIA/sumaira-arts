"use client";

import { useState } from "react";
import type { StudioCraftStep } from "@/data/artist";

export function StudioTechnique({ steps }: { steps: StudioCraftStep[] }) {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const toggleStep = (stepKey: string) => {
    setActiveStep((curr) => (curr === stepKey ? null : stepKey));
  };

  return (
    <ol className="relative mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4">
      {steps.map((step, index) => {
        const isPinned = activeStep === step.step;

        return (
          <li key={step.step} className="relative">
            {index < steps.length - 1 && (
              <span
                className="absolute start-5 top-5 hidden h-px w-[calc(100%+1rem)] bg-soft lg:block"
                aria-hidden="true"
              />
            )}
            <article
              role="button"
              tabIndex={0}
              aria-expanded={isPinned}
              onClick={() => toggleStep(step.step)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleStep(step.step);
                }
              }}
              className={`group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-card border bg-white outline-none transition-[border-color,box-shadow,transform] duration-500 ease-out-soft hover:-translate-y-1 hover:border-brand/40 hover:shadow-raised focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none ${
                isPinned
                  ? "-translate-y-1 border-brand/40 shadow-raised"
                  : "border-light"
              }`}
            >
              <div className="flex min-h-56 flex-col p-5 sm:min-h-60 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full border font-mono text-xs font-medium transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white ${
                      isPinned
                        ? "border-brand bg-brand text-white"
                        : "border-soft bg-ice text-brand"
                    }`}
                  >
                    {step.step}
                  </span>
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full border border-light text-lg font-light leading-none text-brand transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none ${
                      isPinned ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-lg font-medium leading-snug tracking-tight text-deep sm:text-xl">
                  {step.title}
                </h3>
              </div>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-out-soft group-hover:grid-rows-[1fr] motion-reduce:transition-none ${
                  isPinned ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`border-t border-light px-5 py-4 text-sm leading-relaxed text-steel transition-[opacity,transform] duration-500 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100 sm:px-6 sm:py-5 motion-reduce:translate-y-0 motion-reduce:transition-none ${
                      isPinned
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

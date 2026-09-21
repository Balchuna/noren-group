"use client";

import { useEffect, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, NorenButton } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import { ICON_BY_NAME } from "@/components/brand/Icons";
import { SIGNAL_METRICS, SIGNAL_STEPS } from "@/data/signal";

type Phase = "idle" | "scanning" | "done";

/**
 * NOREN SIGNAL — simulação visual.
 * Nenhuma consulta é feita, nenhum dado é enviado. O resultado é mockado e
 * está declarado em tela como exemplo.
 */
export function SignalDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (phase !== "scanning") return;
    if (step >= SIGNAL_STEPS.length) {
      const done = window.setTimeout(() => setPhase("done"), 620);
      return () => window.clearTimeout(done);
    }
    const next = window.setTimeout(() => setStep((s) => s + 1), 640);
    return () => window.clearTimeout(next);
  }, [phase, step]);

  const start = () => {
    setStep(0);
    setPhase("scanning");
  };

  const reset = () => {
    setPhase("idle");
    setStep(0);
  };

  return (
    <div className="shell py-[clamp(56px,9vw,128px)]">
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <SectionLabel className="mb-8">Noren Signal</SectionLabel>
          <RevealLines as="h2" lines={["Um diagnóstico", "no ponto certo."]} className="display display-xl text-cream" />
          <Reveal delay={0.12}>
            <p className="lede mt-6 max-w-[40ch]">
              Em poucos minutos, você tem uma análise inicial da presença digital, reputação, posicionamento
              e oportunidades do seu restaurante.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="relative min-h-[248px]">
            {/* formulário */}
            <div
              className={
                "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                (phase === "idle" ? "opacity-100" : "pointer-events-none absolute inset-0 -translate-y-3 opacity-0")
              }
            >
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  start();
                }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] text-cream/80">Nome do restaurante</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Ex.: Terra Restaurante"
                    className="h-[54px] w-full border border-cream/16 bg-transparent px-4 text-[14.5px] text-cream placeholder:text-cream/28 transition-colors duration-500 focus:border-gold/60 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] text-cream/80">Cidade</span>
                  <input
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="Ex.: São Paulo"
                    className="h-[54px] w-full border border-cream/16 bg-transparent px-4 text-[14.5px] text-cream placeholder:text-cream/28 transition-colors duration-500 focus:border-gold/60 focus:outline-none"
                  />
                </label>
                <div className="sm:col-span-2">
                  <NorenButton type="submit" variant="primary" className="w-full sm:w-auto">
                    Analisar agora
                  </NorenButton>
                </div>
              </form>
              <p className="mt-5 flex items-center gap-2 text-[12px] text-cream/38">
                <span className="inline-block h-[6px] w-[6px] rounded-full bg-gold/60" />
                Demonstração visual. Nenhum dado é enviado ou consultado.
              </p>
            </div>

            {/* varredura */}
            <div
              className={
                "transition-opacity duration-500 " +
                (phase === "scanning" ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0")
              }
            >
              <ul className="flex flex-col gap-4">
                {SIGNAL_STEPS.map((label, index) => {
                  const done = index < step;
                  const current = index === step;
                  return (
                    <li
                      key={label}
                      className={
                        "flex items-center gap-4 text-[14px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                        (index <= step ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")
                      }
                    >
                      <span
                        className={
                          "h-[6px] w-[6px] shrink-0 rounded-full transition-colors duration-500 " +
                          (done ? "bg-gold" : current ? "bg-gold/70" : "bg-cream/20")
                        }
                      />
                      <span className={done ? "text-cream/55" : "text-cream"}>{label}</span>
                    </li>
                  );
                })}
              </ul>
              <span className="mt-8 block h-px w-full bg-cream/10">
                <span
                  className="block h-px bg-gold transition-[width] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: Math.min(100, ((step + (phase === "done" ? 1 : 0)) / SIGNAL_STEPS.length) * 100) + "%" }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* resultado mockado */}
      <div
        className={
          "overflow-hidden transition-[max-height,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] " +
          (phase === "done" ? "mt-16 max-h-[720px] opacity-100 lg:mt-24" : "max-h-0 opacity-0")
        }
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8">
          <SectionLabel>Seu restaurante em números</SectionLabel>
          <span className="micro flex items-center gap-3 text-[9.5px] text-cream/35">
            Exemplo de diagnóstico
            <ArrowRight className="h-[8px] w-[16px]" />
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-6 lg:gap-x-0">
          {SIGNAL_METRICS.map((metric, index) => {
            const Icon = ICON_BY_NAME[metric.icon];
            const numeric = Number(metric.value.replace(/[^0-9-]/g, ""));
            const isNumeric = !Number.isNaN(numeric) && /[0-9]/.test(metric.value);
            return (
              <li
                key={metric.label}
                className={
                  "flex flex-col border-cream/10 lg:px-6 " +
                  (index > 0 ? "lg:border-l " : "lg:pl-0") +
                  (index === SIGNAL_METRICS.length - 1 ? " lg:pr-0" : "") +
                  (index % 2 === 1 ? " border-l pl-6 lg:pl-6" : "")
                }
              >
                <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-gold/32 text-gold">
                  <Icon className="h-[17px] w-[17px]" />
                </span>
                <span className="mt-5 text-[13.5px] text-cream/85">{metric.label}</span>
                <span className="display mt-2 text-[30px] leading-none tabular-nums text-cream lg:text-[34px]">
                  {isNumeric ? (
                    <CountUp
                      value={numeric}
                      prefix={metric.value.trim().startsWith("+") ? "+" : metric.value.trim().startsWith("−") ? "−" : ""}
                      suffix={metric.suffix ?? ""}
                      duration={1.15}
                    />
                  ) : (
                    metric.value
                  )}
                </span>
                <span className="body-sm mt-3 max-w-[22ch] text-[12px]">{metric.note}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <NorenButton href="/contato" variant="primary">
            Iniciar diagnóstico
          </NorenButton>
          <button
            type="button"
            onClick={reset}
            data-cursor="link"
            className="link-underline text-[13px] text-cream/55 transition-colors duration-500 hover:text-cream"
          >
            Analisar outro restaurante
          </button>
          {name || city ? (
            <span className="text-[12px] text-cream/30">
              Referência simulada: {name || "restaurante"} {city ? "· " + city : ""}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/motion/RevealLines";
import { Reveal } from "@/components/motion/Reveal";
import { NorenButton } from "@/components/ui/Button";
import { IconCalendar, IconChat, IconLock, IconPulse } from "@/components/brand/Icons";

const CHANNELS = [
  {
    icon: IconChat,
    title: "Resposta consultiva",
    text: "Nossa equipe analisa sua mensagem e retorna com uma visão inicial e direcionamentos relevantes.",
  },
  {
    icon: IconPulse,
    title: "Diagnóstico inicial",
    text: "Entendemos seu contexto e identificamos oportunidades de valor, sem custo.",
  },
  {
    icon: IconCalendar,
    title: "Conversa sem compromisso",
    text: "Se fizer sentido, marcamos uma conversa para explorar caminhos em conjunto.",
  },
];

const FIELD =
  "h-[56px] w-full border border-cream/16 bg-transparent px-4 text-[14.5px] text-cream placeholder:text-cream/28 transition-colors duration-500 focus:border-gold/60 focus:outline-none";

/** Formulário simulado: nada é enviado, nada é persistido. */
export function ContactForm() {
  const [phase, setPhase] = useState<"idle" | "sending" | "sent">("idle");

  return (
    <div className="shell grid grid-cols-1 gap-y-14 py-[clamp(56px,9vw,124px)] lg:grid-cols-12 lg:gap-x-0">
      <div className="lg:col-span-7 lg:pr-16">
        <SectionLabel className="mb-9">Envie uma mensagem</SectionLabel>

        <div className="relative">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setPhase("sending");
              window.setTimeout(() => setPhase("sent"), 760);
            }}
            className={
              "transition-opacity duration-700 " + (phase === "idle" ? "opacity-100" : "pointer-events-none opacity-0")
            }
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[13px] text-cream/80">Nome</span>
                <input className={FIELD} placeholder="Seu nome" name="nome" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[13px] text-cream/80">Restaurante</span>
                <input className={FIELD} placeholder="Nome do restaurante" name="restaurante" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[13px] text-cream/80">Cidade</span>
                <input className={FIELD} placeholder="Sua cidade" name="cidade" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[13px] text-cream/80">E-mail / WhatsApp</span>
                <input className={FIELD} placeholder="Seu e-mail ou número de WhatsApp" name="contato" />
              </label>
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-[13px] text-cream/80">Qual é o principal desafio hoje?</span>
                <textarea
                  name="desafio"
                  rows={5}
                  placeholder="Conte um pouco sobre a sua realidade..."
                  className="w-full resize-none border border-cream/16 bg-transparent px-4 py-4 text-[14.5px] leading-relaxed text-cream placeholder:text-cream/28 transition-colors duration-500 focus:border-gold/60 focus:outline-none"
                />
              </label>
            </div>

            <div className="mt-7">
              <NorenButton type="submit" variant="primary" fullWidth arrow>
                Enviar mensagem
              </NorenButton>
            </div>

            <p className="mt-5 flex items-center gap-3 text-[12.5px] text-cream/38">
              <IconLock className="h-[15px] w-[15px] text-cream/35" />
              Seus dados estão seguros. Não enviamos spam.
            </p>
          </form>

          <div
            className={
              "absolute inset-0 flex items-start transition-opacity duration-700 " +
              (phase === "idle" ? "pointer-events-none opacity-0" : "opacity-100")
            }
            aria-live="polite"
          >
            {phase === "sending" ? (
              <div className="flex flex-col gap-5 pt-2">
                <span className="micro text-[10px] text-gold">Enviando</span>
                <span className="block h-px w-[220px] overflow-hidden bg-cream/12">
                  <span
                    className="block h-px bg-gold"
                    style={{ width: "100%", animation: "noren-load 760ms cubic-bezier(0.4,0,0.2,1) forwards" }}
                  />
                </span>
              </div>
            ) : (
              <div className="flex max-w-[44ch] flex-col gap-5 pt-2">
                <span className="h-px w-14 bg-gold" />
                <p className="display display-lg text-cream">Mensagem recebida.</p>
                <p className="lede">
                  Obrigado. Vamos analisar seu cenário e retornar com uma leitura inicial. Esta é uma
                  demonstração — nenhum dado foi enviado.
                </p>
                <button
                  type="button"
                  onClick={() => setPhase("idle")}
                  data-cursor="link"
                  className="link-underline self-start text-[13px] text-cream/55 transition-colors duration-500 hover:text-cream"
                >
                  Enviar outra mensagem
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative lg:col-span-5 lg:pl-16">
        <span className="absolute left-0 top-0 hidden h-full w-px bg-cream/10 lg:block" />
        <span className="absolute left-[-3px] top-1/2 hidden h-[7px] w-[7px] -translate-y-1/2 rotate-45 border border-gold/70 lg:block" />

        <RevealLines
          as="h2"
          lines={["Uma conversa", "pode ser o primeiro", "passo para um novo", "resultado."]}
          className="display display-xl max-w-[16ch] text-cream"
        />

        <ul className="mt-10 flex flex-col gap-9">
          {CHANNELS.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 0.08} className="flex gap-5">
              <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-gold/32 text-gold">
                <Icon className="h-[20px] w-[20px]" />
              </span>
              <span className="flex flex-col gap-2">
                <span className="micro text-[10px] text-gold">{title}</span>
                <span className="body-sm max-w-[38ch] text-[13px]">{text}</span>
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className="italic-serif mt-12 max-w-[22ch] text-[20px] leading-[1.35] text-cream/80">
            “Restaurantes grandes não têm sorte. Têm método.”
          </p>
          <span className="mt-5 block h-px w-10 bg-gold/60" />
        </Reveal>
      </div>
    </div>
  );
}

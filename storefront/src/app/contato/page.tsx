import Image from "next/image";
import EditorialShell from "@/components/EditorialShell";

const contactImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBLjbxDgN3C274dnptMvbO-rNESHKD7O6NyhCMeHWHCoLvhAeSVoQL4eofWTfgYRirHq9iCDwkDtNYCNgqEnCHbiaCF0Y9fwrwO7gCyjOuE5mf_EahyPVZJ4OAwbnQXk4qA1Tlg860tk_BJocviRvWiMLXT88mUaeGWrM7_7TJD-_Um5pFxRQ6mLeInw0k_Ee21fAMHzxxHp0v1IDzDR8rVZZMrDvLYXh6Y0iAbbibvScjnzCAYfaXbo1wUbApIVPE8I78F9GMN_bI";

export default function ContactPage() {
  return (
    <EditorialShell>
      <section className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="editorial-section bg-brand-surface-low">
          <p className="eyebrow">Concierge</p>
          <h1 className="mt-5 text-5xl leading-tight md:text-7xl">
            Um atendimento tao curado quanto a vitrine.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-brand-muted">
            A equipe MOMO &amp; CIA atende com proximidade e repertorio. Use o
            contato abaixo para duvidas de produto, suporte de compra ou
            orientacao de styling.
          </p>

          <div className="mt-12 space-y-8">
            <div>
              <p className="eyebrow">WhatsApp</p>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-3xl text-brand-accent transition hover:opacity-70"
              >
                +55 (11) 99999-9999
              </a>
            </div>
            <div>
              <p className="eyebrow">E-mail</p>
              <p className="mt-2 text-2xl">contato@momoecia.com.br</p>
            </div>
            <div>
              <p className="eyebrow">Base</p>
              <p className="mt-2 text-2xl">Sao Paulo, SP</p>
            </div>
          </div>

          <div className="relative mt-12 hidden aspect-[4/3] overflow-hidden rounded-[2rem] md:block">
            <Image
              src={contactImage}
              alt="Editorial de contato da Momo & Cia"
              fill
              unoptimized
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-brand-accent/8 mix-blend-multiply" />
          </div>
        </div>

        <div className="editorial-section">
          <div className="mx-auto max-w-xl">
            <p className="eyebrow">Send inquiry</p>
            <h2 className="mt-5 text-4xl md:text-5xl">
              Envie uma mensagem para nosso time.
            </h2>

            <form className="mt-10 space-y-8">
              <div>
                <label className="eyebrow">Nome completo</label>
                <input
                  type="text"
                  className="editorial-input mt-2"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="eyebrow">E-mail</label>
                <input
                  type="email"
                  className="editorial-input mt-2"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="eyebrow">Como podemos ajudar?</label>
                <textarea
                  rows={4}
                  className="editorial-input mt-2 resize-none"
                  placeholder="Conte para a gente o que voce procura."
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Enviar mensagem
              </button>
              <p className="text-center text-[0.68rem] uppercase tracking-[0.24em] text-brand-muted">
                Ao enviar, voce concorda com nosso padrao de atendimento e
                privacidade.
              </p>
            </form>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}

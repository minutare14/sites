export default function ContactPage() {
  return (
    <section className="section-padding bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-20 md:grid-cols-2">
          <div>
            <h4 className="mb-6 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-navy">
              Contato
            </h4>
            <h1 className="mb-8 text-5xl md:text-6xl">Vamos conversar?</h1>
            <p className="mb-12 max-w-md text-xl text-brand-text/70">
              Estamos em Sao Paulo e atendemos com proximidade, delicadeza e
              seriedade.
            </p>

            <div className="space-y-8">
              <div>
                <h5 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-navy">
                  WhatsApp geral
                </h5>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noreferrer"
                  className="text-2xl font-serif text-brand-terracotta transition-opacity hover:opacity-70"
                >
                  +55 (11) 99999-9999
                </a>
              </div>
              <div>
                <h5 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-navy">
                  Email
                </h5>
                <p className="text-xl font-serif text-brand-text">
                  contato@momoecia.com.br
                </p>
              </div>
              <div>
                <h5 className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-navy">
                  Localizacao
                </h5>
                <p className="text-xl font-serif text-brand-text">
                  Sao Paulo, SP
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-outline/10 bg-brand-cream-dark/30 p-12">
            <h3 className="mb-8 text-2xl">Envie uma mensagem</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[0.6rem] font-bold uppercase tracking-widest opacity-60">
                  Nome completo
                </label>
                <input
                  type="text"
                  className="w-full border-b border-brand-outline/30 bg-transparent py-3 outline-none transition-colors focus:border-brand-terracotta"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.6rem] font-bold uppercase tracking-widest opacity-60">
                  E-mail
                </label>
                <input
                  type="email"
                  className="w-full border-b border-brand-outline/30 bg-transparent py-3 outline-none transition-colors focus:border-brand-terracotta"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[0.6rem] font-bold uppercase tracking-widest opacity-60">
                  Mensagem
                </label>
                <textarea
                  rows={4}
                  className="w-full resize-none border-b border-brand-outline/30 bg-transparent py-3 outline-none transition-colors focus:border-brand-terracotta"
                  placeholder="Como podemos te ajudar?"
                />
              </div>
              <button type="submit" className="btn-primary mt-6 w-full">
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

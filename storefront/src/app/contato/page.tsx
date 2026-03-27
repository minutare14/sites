import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div className="flex flex-col font-sans">
      <Navbar />
      <section className="section-padding bg-brand-cream mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h4 className="uppercase text-[0.6rem] tracking-[0.3em] font-bold text-brand-navy mb-6">Contato</h4>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">Vamos conversar?</h1>
              <p className="text-xl font-light text-brand-text/70 mb-12 max-w-md">
                Estamos em São Paulo e atendemos com a proximidade e seriedade que você merece.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest text-brand-navy mb-2">WhatsApp Geral</h5>
                  <a href="https://wa.me/5511999999999" target="_blank" className="text-2xl font-serif text-brand-terracotta hover:opacity-70 transition-opacity">
                    +55 (11) 99999-9999
                  </a>
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest text-brand-navy mb-2">Email</h5>
                  <p className="text-xl font-serif text-brand-text">contato@momoecia.com.br</p>
                </div>
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-widest text-brand-navy mb-2">Localização</h5>
                  <p className="text-xl font-serif text-brand-text">São Paulo, SP</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-cream-dark/30 p-12 rounded-3xl border border-brand-outline/10">
              <h3 className="text-2xl font-serif mb-8">Envie uma mensagem</h3>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-widest font-bold opacity-60">Nome Completo</label>
                  <input type="text" className="w-full bg-transparent border-b border-brand-outline/30 py-3 focus:border-brand-terracotta outline-none transition-colors" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-widest font-bold opacity-60">E-mail</label>
                  <input type="email" className="w-full bg-transparent border-b border-brand-outline/30 py-3 focus:border-brand-terracotta outline-none transition-colors" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6rem] uppercase tracking-widest font-bold opacity-60">Mensagem</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-brand-outline/30 py-3 focus:border-brand-terracotta outline-none transition-colors resize-none" placeholder="Como podemos te ajudar?" />
                </div>
                <button type="submit" className="btn-primary w-full mt-6">Enviar Mensagem</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

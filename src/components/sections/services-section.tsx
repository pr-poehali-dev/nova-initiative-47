import { useState, type FormEvent } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

const IMAGES = [
  {
    src: "https://cdn.poehali.dev/projects/01787a70-ed5e-47d1-adbf-a9ba119d1d70/bucket/f676e7e7-d330-4909-87b0-9102eac43ae7.png",
    alt: "Устройство Coravin",
  },
  {
    src: "https://cdn.poehali.dev/projects/01787a70-ed5e-47d1-adbf-a9ba119d1d70/bucket/05d789b1-6897-4cc9-a5db-4c449d35cc33.png",
    alt: "Многоразовый баллон с манометром",
  },
  {
    src: "https://cdn.poehali.dev/projects/01787a70-ed5e-47d1-adbf-a9ba119d1d70/bucket/599a737d-a074-4d84-ac93-1426e0caef78.png",
    alt: "Многоразовый баллон — вид сбоку",
  },
  {
    src: "https://cdn.poehali.dev/projects/01787a70-ed5e-47d1-adbf-a9ba119d1d70/bucket/48c9ab2f-230f-4489-88e3-2c3e433c1933.png",
    alt: "Механизм зарядки баллона аргона",
  },
]

const SPECS = [
  { label: "Вес", value: "212 г" },
  { label: "Размеры", value: "30 × 179 мм" },
  { label: "Рабочее давление", value: "150 атм" },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [activeImage, setActiveImage] = useState(0)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    setIsSubmitting(true)
    await fetch("https://functions.poehali.dev/9b828e06-e91f-41d5-8de9-eec75fcf6f29", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, subject: "Заказ: Баллоны для Coravin" }),
    })
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-32 md:px-12 md:pt-36 lg:px-16"
    >
      <div className="absolute inset-0 bg-background" />
      <div className="relative mx-auto w-full max-w-7xl">

        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}>
          <h2 className="mb-1 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Продукты
          </h2>
          <p className="font-mono text-xs text-foreground/50">/ Наши решения</p>
        </div>

        {/* Product layout: image left, info right */}
        <div className={`grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-12 lg:gap-16 transition-all duration-700 delay-150 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>

          {/* Image */}
          <div className="flex flex-col gap-3">
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/50">
              <img
                src={IMAGES[activeImage].src}
                alt={IMAGES[activeImage].alt}
                className="h-full w-full object-contain transition-opacity duration-300"
              />
            </div>
            <div className="flex gap-2">
              {IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-14 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    activeImage === i ? "border-foreground/50" : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-1 font-mono text-xs text-foreground/40">01 · В продаже</p>
              <h3 className="font-sans text-2xl font-light text-foreground md:text-3xl">
                Многоразовые баллоны Coravin
              </h3>
            </div>

            <p className="font-sans text-sm font-light leading-relaxed text-foreground/70">
              Совместимы с Pivot, Model Two, Three, Six, Eight. Один баллон = два одноразовых картриджа. Готов к работе из коробки.
            </p>

            {/* Price + specs row */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-y border-foreground/10 py-4">
              <div>
                <p className="mb-0.5 font-mono text-xs text-foreground/40">Стоимость</p>
                <p className="font-sans text-2xl font-light text-foreground">40 000 ₽</p>
              </div>
              <div>
                <p className="mb-0.5 font-mono text-xs text-foreground/40">Гарантия</p>
                <p className="font-sans text-lg font-light text-foreground">1 год</p>
              </div>
              {SPECS.map((s) => (
                <div key={s.label}>
                  <p className="mb-0.5 font-mono text-xs text-foreground/40">{s.label}</p>
                  <p className="font-sans text-sm text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Order form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="font-mono text-xs text-foreground/40">/ Оставить заявку</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-mono text-xs text-foreground/50">Имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="w-full border-b border-foreground/20 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-xs text-foreground/50">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full border-b border-foreground/20 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/50 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs text-foreground/50">Комментарий</label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Количество, вопросы о совместимости..."
                  className="w-full border-b border-foreground/20 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-foreground/50 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-6 pt-1">
                <MagneticButton type="submit" variant="primary" disabled={isSubmitting} className="disabled:opacity-50">
                  {isSubmitting ? "Отправка..." : "Оставить заявку"}
                </MagneticButton>
                <a href="mailto:info@adderevinum.ru" className="flex items-center gap-1.5 font-mono text-xs text-foreground/50 transition-colors hover:text-foreground">
                  <Icon name="Mail" size={12} />
                  info@adderevinum.ru
                </a>
              </div>
              {submitSuccess && (
                <p className="font-mono text-xs text-foreground/60">Заявка отправлена — мы свяжемся с вами!</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
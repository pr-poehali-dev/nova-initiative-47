import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { MagneticButton } from "@/components/magnetic-button"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
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

const KIT = [
  "Многоразовый баллон для систем Coravin",
  "Механизм зарядки для баллонов аргона с присоединением G 3/4",
]

export default function Coravin() {
  const navigate = useNavigate()
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
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <GrainOverlay />

      {/* Header nav */}
      <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between px-6 py-6 md:px-12 lg:px-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-mono text-xs text-foreground/60 transition-colors hover:text-foreground"
        >
          <Icon name="ArrowLeft" size={14} />
          Назад
        </button>
        <span className="font-mono text-xs text-foreground/40">01 / Разработки</span>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-12 md:pt-32 lg:px-16">

        {/* Hero */}
        <div className="mb-16 md:mb-24">
          <p className="mb-3 font-mono text-xs text-foreground/50">Многоразовые картриджи · В продаже</p>
          <h1 className="font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Баллоны для Coravin
          </h1>
        </div>

        {/* Main content grid */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/50">
              <img
                src={IMAGES[activeImage].src}
                alt={IMAGES[activeImage].alt}
                className="h-full w-full object-contain transition-opacity duration-500"
              />
            </div>
            <div className="flex gap-3">
              {IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    activeImage === i ? "border-foreground/50" : "border-transparent opacity-50 hover:opacity-75"
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-start gap-10">
            <p className="font-sans text-base font-light leading-relaxed text-foreground/80 md:text-lg">
              Практичное и экологичное решение для винотек, ресторанов и винных баров. Многоразовый баллон полностью
              совместим с популярными системами Coravin — Pivot, Model Two, Three, Six, Eight и другими моделями, —
              позволяя сохранять вино в бутылке без извлечения пробки.
            </p>

            <p className="font-sans text-base font-light leading-relaxed text-foreground/80 md:text-lg">
              По объёму один баллон эквивалентен двум одноразовым картриджам Coravin, что заметно снижает расходы
              на эксплуатацию и сокращает количество отходов. Готов к работе из коробки.
            </p>

            {/* Price & guarantee */}
            <div className="flex items-end gap-8 border-b border-foreground/10 pb-8">
              <div>
                <p className="mb-1 font-mono text-xs text-foreground/50">Стоимость</p>
                <p className="font-sans text-3xl font-light text-foreground md:text-4xl">40 000 ₽</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-foreground/50">Гарантия</p>
                <p className="font-sans text-xl font-light text-foreground">1 год</p>
              </div>
            </div>

            {/* Specs */}
            <div>
              <p className="mb-4 font-mono text-xs text-foreground/50">/ Технические характеристики</p>
              <div className="space-y-3">
                {SPECS.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between border-b border-foreground/10 pb-3">
                    <span className="font-mono text-xs text-foreground/60">{s.label}</span>
                    <span className="font-sans text-sm text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kit */}
            <div>
              <p className="mb-4 font-mono text-xs text-foreground/50">/ Комплектация</p>
              <ul className="space-y-2">
                {KIT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    <span className="font-sans text-sm font-light text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-mono text-xs leading-relaxed text-foreground/50">
              Для работы системы требуется баллон с чистым аргоном (чистота 5.0 — 99,999% и выше),
              который приобретается отдельно.
            </p>
          </div>
        </div>

        {/* Order form */}
        <div className="mt-24 border-t border-foreground/10 pt-16 md:mt-32 md:pt-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16 lg:gap-24">
            <div>
              <p className="mb-3 font-mono text-xs text-foreground/50">/ Оформить заказ</p>
              <h2 className="font-sans text-3xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
                Оставьте
                <br />
                заявку
              </h2>
              <p className="mt-6 font-sans text-sm font-light leading-relaxed text-foreground/60">
                Заполните форму — мы свяжемся с вами для уточнения деталей и подтверждения поставки.
              </p>
              <div className="mt-8">
                <a
                  href="mailto:info@adderevinum.ru"
                  className="group flex items-center gap-2 font-mono text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  <Icon name="Mail" size={14} />
                  info@adderevinum.ru
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="mb-2 block font-mono text-xs text-foreground/60">Имя</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/60 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs text-foreground/60">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/60 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-xs text-foreground/60">Комментарий (необязательно)</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Количество, вопросы о совместимости..."
                  className="w-full border-b border-foreground/30 bg-transparent py-2 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/60 focus:outline-none"
                />
              </div>
              <div className="pt-2">
                <MagneticButton variant="primary" size="lg" className="w-full disabled:opacity-50">
                  {isSubmitting ? "Отправка..." : "Оставить заявку"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-4 text-center font-mono text-sm text-foreground/70">
                    Заявка отправлена — мы свяжемся с вами!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Cartridge() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Многоразовый картридж для Coravin — аналог одноразовых капсул | Adderum"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "Многоразовый баллон аргона для Coravin: заправляется заново, экономит на капсулах. Российская разработка Adderum — аналог Coravin.")
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-12 md:py-28">

        {/* Breadcrumb */}
        <nav className="mb-10 font-mono text-xs text-foreground/40">
          <button onClick={() => navigate("/")} className="hover:text-foreground/70 transition-colors">
            Adderum
          </button>
          <span className="mx-2">/</span>
          <span>Многоразовый картридж для Coravin</span>
        </nav>

        {/* H1 */}
        <h1 className="mb-4 font-sans text-3xl font-light leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Многоразовый картридж для Coravin
        </h1>
        <p className="mb-12 font-mono text-xs text-foreground/50">Российская разработка · Adderum</p>

        {/* H2 + text 1 */}
        <h2 className="mb-4 font-sans text-xl font-light text-foreground md:text-2xl">
          Аналог Coravin: зачем платить за одноразовые капсулы?
        </h2>
        <p className="mb-6 font-sans text-sm font-light leading-relaxed text-foreground/75 md:text-base">
          Стандартные картриджи Coravin одноразовые — после использования они выбрасываются, и цикл повторяется снова.
          Многоразовый баллон для Coravin от Adderum работает иначе: после опустошения его просто заправляют аргоном заново
          и используют снова. Один баллон заменяет два оригинальных картриджа по объёму газа.
        </p>

        {/* H2 + text 2 */}
        <h2 className="mb-4 font-sans text-xl font-light text-foreground md:text-2xl">
          Полная совместимость с системами Coravin
        </h2>
        <p className="mb-6 font-sans text-sm font-light leading-relaxed text-foreground/75 md:text-base">
          Многоразовый картридж Adderum совместим с Coravin Pivot, Model Two, Three, Six, Eight и другими
          моделями линейки. Конструкция разработана так, чтобы установка ничем не отличалась от оригинала —
          никаких переходников или доработок устройства не требуется.
        </p>

        {/* H2 + text 3 */}
        <h2 className="mb-4 font-sans text-xl font-light text-foreground md:text-2xl">
          Экономия и экология в одном решении
        </h2>
        <p className="mb-10 font-sans text-sm font-light leading-relaxed text-foreground/75 md:text-base">
          Для ресторанов и винотек, которые разливают вино по бокалу каждый день, расходы на одноразовые
          картриджи Coravin накапливаются быстро. Многоразовый аналог Coravin от Adderum окупается уже
          в первые месяцы использования и не производит пластикового мусора.
        </p>

        {/* Specs */}
        <div className="mb-10 border-t border-foreground/10 pt-8">
          <p className="mb-4 font-mono text-xs text-foreground/40">/ Характеристики</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Вес", value: "212 г" },
              { label: "Размеры", value: "30 × 179 мм" },
              { label: "Рабочее давление", value: "150 атм" },
              { label: "Стоимость", value: "40 000 ₽" },
              { label: "Гарантия", value: "1 год" },
              { label: "Тип газа", value: "Аргон" },
            ].map((s) => (
              <div key={s.label} className="border border-foreground/10 rounded-lg p-4">
                <p className="mb-1 font-mono text-xs text-foreground/40">{s.label}</p>
                <p className="font-sans text-sm text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-foreground/10 pt-8">
          <p className="mb-4 font-sans text-sm font-light text-foreground/70">
            Хотите узнать подробнее или оформить заказ?
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/")}
              className="border border-foreground/30 px-6 py-2.5 font-mono text-xs text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              Перейти на сайт
            </button>
            <a
              href="mailto:info@adderevinum.ru"
              className="border border-foreground/10 px-6 py-2.5 font-mono text-xs text-foreground/60 transition-colors hover:text-foreground"
            >
              info@adderevinum.ru
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

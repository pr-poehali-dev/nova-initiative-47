import { useNavigate } from "react-router-dom"
import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-24 md:px-12 md:pt-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Продукты
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-sm">/ Наши решения</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Многоразовые баллоны Coravin",
              description: "Экономичная и экологичная альтернатива оригинальным картриджам. Полная совместимость с уже используемым оборудованием Coravin.",
              direction: "top",
              href: "/coravin",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>

        <p
          className={`mt-12 font-mono text-xs text-foreground/40 transition-all duration-700 delay-300 md:mt-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Все решения разработаны под требования пищевой индустрии, профессиональных сомелье и ценителей вина.
        </p>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string; href?: string }
  index: number
  isVisible: boolean
}) {
  const navigate = useNavigate()

  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      onClick={() => service.href && navigate(service.href)}
      className={`group transition-all duration-700 ${getRevealClass()} ${service.href ? "cursor-pointer" : ""}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-xl font-light text-foreground transition-colors duration-300 group-hover:text-foreground/70 md:text-2xl">
        {service.title}
        {service.href && <span className="ml-2 opacity-0 transition-all duration-300 group-hover:opacity-60">→</span>}
      </h3>
      <p className="max-w-sm text-xs leading-relaxed text-foreground/80 md:text-sm">{service.description}</p>
    </div>
  )
}
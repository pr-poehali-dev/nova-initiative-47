import { useNavigate } from "react-router-dom"
import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-32 md:px-12 md:pt-36 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-8 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Разработки
          </h2>
          <p className="font-mono text-xs text-foreground/60 md:text-sm">/ Наши продукты</p>
        </div>

        <div className="space-y-0">
          {[
            {
              number: "01",
              title: "Баллоны для Coravin",
              category: "Многоразовые картриджи · В продаже",
              year: "2025",
              direction: "left",
              href: "/coravin",
            },
            {
              number: "02",
              title: "Собственная система сохранения Adderum",
              category: "Собственное устройство · Прототип",
              year: "2026",
              direction: "right",
              href: null,
            },
            {
              number: "03",
              title: "Ресторанный диспенсер",
              category: "Розлив без извлечения пробки · НИОКР",
              year: "2026",
              direction: "left",
              href: null,
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { number: string; title: string; category: string; year: string; direction: string; href: string | null }
  index: number
  isVisible: boolean
}) {
  const navigate = useNavigate()

  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      onClick={() => project.href && navigate(project.href)}
      className={`group flex items-center justify-between border-b border-foreground/10 py-3 transition-all duration-700 hover:border-foreground/20 md:py-4 ${getRevealClass()} ${project.href ? "cursor-pointer" : ""}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
        {project.href && (
          <span className="font-mono text-xs text-foreground/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground/60">→</span>
        )}
      </div>
    </div>
  )
}
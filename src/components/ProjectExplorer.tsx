import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  evidenceStatus: string;
  heroExcerpt: string;
  role: string;
  tags: string[];
  href: string;
};

type Category = {
  slug: string;
  label: string;
};

type Props = {
  projects: ProjectCardData[];
  categories: Category[];
};

export default function ProjectExplorer({ projects, categories }: Props) {
  const [active, setActive] = useState("all");
  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((project) => project.categorySlug === active)),
    [active, projects]
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2" aria-label="Project filters">
        <span className="chip">
          <SlidersHorizontal size={14} aria-hidden="true" />
          Filter
        </span>
        {[{ slug: "all", label: "All work" }, ...categories].map((category) => (
          <button
            key={category.slug}
            type="button"
            className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition ${
              active === category.slug
                ? "border-accent bg-accent text-white"
                : "border-border bg-surface text-muted hover:border-accent hover:text-text"
            }`}
            onClick={() => setActive(category.slug)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="flex min-h-[330px] flex-col justify-between rounded-portfolio border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent/60 hover:bg-elevated md:p-6"
            >
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="chip">{project.category}</span>
                  <span className="chip">{project.evidenceStatus}</span>
                </div>
                <h3 className="text-xl font-semibold leading-snug text-text">{project.title}</h3>
                <p className="mt-3 text-sm font-semibold text-accent">{project.role}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{project.heroExcerpt}</p>
              </div>
              <div className="mt-6">
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span className="chip text-[0.72rem]" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a className="inline-flex min-h-11 items-center rounded-portfolio border border-border px-4 text-sm font-semibold hover:border-accent" href={project.href}>
                  View case study
                  <ArrowRight className="ml-2" size={15} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

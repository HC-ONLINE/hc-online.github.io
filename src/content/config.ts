import { defineCollection, z } from "astro:content";

const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    subtitle: z.string(),
    stack: z.string(),
    github: z.string().url().optional(),
    site: z.string().url().optional(),
  }),
});

const sectionsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),

    // Header
    nav: z
      .object({
        home: z.string(),
        projects: z.string(),
        skills: z.string(),
        experience: z.string(),
        philosophy: z.string().optional(),
        contact: z.string(),
      })
      .optional(),

    // Footer
    builtWith: z.string().optional(),
    rights: z.string().optional(),

    // Hero
    greeting: z.string().optional(),
    name: z.string().optional(),
    role: z.string().optional(),
    tagline: z.string().optional(),
    availability: z.string().optional(),
    ctaPrimary: z.string().optional(),
    ctaSecondary: z.string().optional(),
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .optional(),

    // Skills
    skills: z
      .array(
        z.object({
          title: z.string(),
          icon: z.string(),
          items: z.array(z.string()),
          color: z.string(),
          span: z.string().optional(),
        })
      )
      .optional(),

    // Featured Projects
    viewAll: z.string().optional(),
    viewDemo: z.string().optional(),
    viewCode: z.string().optional(),
    projects: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          tags: z.array(z.string()),
          icon: z.string(),
          color: z.string(),
          metrics: z.record(z.string()),
          demo: z.string().optional(),
          code: z.string().optional(),
        })
      )
      .optional(),

    // Experience
    educationTitle: z.string().optional(),
    certificationsTitle: z.string().optional(),
    experience: z
      .array(
        z.object({
          period: z.string(),
          role: z.string(),
          company: z.string(),
          description: z.string(),
          achievements: z.array(z.string()),
          current: z.boolean().default(false),
        })
      )
      .optional(),
    education: z
      .array(
        z.object({
          degree: z.string(),
          institution: z.string(),
          year: z.string(),
        })
      )
      .optional(),
    certifications: z
      .array(
        z.object({
          degree: z.string(),
          institution: z.string(),
          year: z.string(),
        })
      )
      .optional(),

    // Philosophy
    philosophyMetrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .optional(),
    principles: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      )
      .optional(),

    // Contact
    formName: z.string().optional(),
    formEmail: z.string().optional(),
    formMessage: z.string().optional(),
    formMessagePlaceholder: z.string().optional(),
    formSubmit: z.string().optional(),
    formSending: z.string().optional(),
    formSuccess: z.string().optional(),
    formError: z.string().optional(),
    contactEmail: z.string().optional(),
    contactLocation: z.string().optional(),
    infoEmailLabel: z.string().optional(),
    infoLocationLabel: z.string().optional(),
    infoConnectLabel: z.string().optional(),
    copyEmailLabel: z.string().optional(),
    socials: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
          icon: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  projects: projectsCollection,
  sections: sectionsCollection,
};

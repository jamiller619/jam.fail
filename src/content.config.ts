import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publishDate: z.string().date(),
      tags: z.array(z.string()),
      link: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
})

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.string(),
      description: z.string(),
      link: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      links: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      ),
    }),
})

export const collections = {
  projects,
  blog,
}

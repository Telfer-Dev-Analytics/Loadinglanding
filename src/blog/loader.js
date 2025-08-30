/**
 * This file uses Vite's `import.meta.glob` feature to auto-import all .mdx files
 * in this directory and expose their metadata (frontmatter).
 *
 * @see https://vitejs.dev/guide/features.html#glob-import
 */

// Import all .mdx files eagerly.
const modules = import.meta.glob('./*.mdx', { eager: true });

export const posts = Object.values(modules)
    // Map the modules to a more usable format
    .map((module) => ({
        ...module.frontmatter, // Spread the frontmatter properties (title, date, etc.)
        Component: module.default, // The MDX content itself
        // Generate a slug from the title for URLs
        slug: module.frontmatter.title.toLowerCase().replace(/\s+/g, '-'),
    }))
    // Sort posts by date, with the newest post first
    .sort((a, b) => new Date(b.date) - new Date(a.date));
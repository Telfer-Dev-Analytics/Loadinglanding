// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/telferbta-new-website/' : '/';

  return {
    base: base,
    plugins: [
      react(),
      mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      }),
    ],
  };
});
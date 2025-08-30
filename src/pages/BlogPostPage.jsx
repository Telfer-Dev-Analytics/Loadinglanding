import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../blog/loader';
import { AnimatedPage } from '../components/AnimatedPage';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <AnimatedPage>
        <div className="text-center py-24 px-6">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link to="/" className="text-accent hover:underline">
            &larr; Back to Home
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  const { title, author, date, Component } = post;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AnimatedPage>
      <div className="bg-background text-foreground min-h-screen">
        <div className="py-16 sm:py-24">
          <article className="prose dark:prose-invert max-w-3xl mx-auto px-6">
            <header className="mb-12 text-center">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">{title}</h1>
              <p className="mt-4 text-base text-text-muted">
                By {author} &bull; {formattedDate}
              </p>
            </header>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <Component />
            </div>
          </article>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default BlogPostPage;
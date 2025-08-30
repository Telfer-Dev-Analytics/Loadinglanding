import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { posts } from '../blog/loader';
import { BlogPostItem } from './BlogPostItem';

export const Blog = () => {
    const [ref, isVisible] = useScrollAnimation();
    
    return (
        <section id="blog" className="py-24 bg-muted transition-colors duration-500">
            <div ref={ref} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground">From the Blog</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full" />
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {posts.map(post => (
                        <BlogPostItem key={post.slug} {...post} />
                    ))}
                </div>
            </div>
        </section>
    );
};
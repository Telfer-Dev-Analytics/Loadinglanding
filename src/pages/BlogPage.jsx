import React, { useState, useMemo } from 'react';
import { posts } from '../blog/loader';
import { BlogPostItem } from '../components/BlogPostItem';
import { Link } from 'react-router-dom';
import { AnimatedPage } from '../components/AnimatedPage';
import { BlogFilters } from '../components/BlogFilters';

const BlogPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'alphabetical'
    const [selectedAuthor, setSelectedAuthor] = useState('all');

    const authors = useMemo(() => {
        const allAuthors = posts.map(post => post.author);
        return ['all', ...new Set(allAuthors)];
    }, []);

    const filteredAndSortedPosts = useMemo(() => {
        let filtered = posts;

        // Filter by selected author
        if (selectedAuthor !== 'all') {
            filtered = filtered.filter(post => post.author === selectedAuthor);
        }

        // Filter by search query (case-insensitive)
        if (searchQuery) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort the posts
        if (sortOrder === 'alphabetical') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else { // 'newest'
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        return filtered;
    }, [posts, searchQuery, sortOrder, selectedAuthor]);

    const groupedPosts = useMemo(() => {
        if (sortOrder !== 'newest') {
            return { 'all': filteredAndSortedPosts };
        }

        return filteredAndSortedPosts.reduce((acc, post) => {
            const date = new Date(post.date);
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'long' });
            const key = `${month} ${year}`;

            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(post);
            return acc;
        }, {});
    }, [filteredAndSortedPosts, sortOrder]);


    return (
        <div className="bg-background text-foreground min-h-screen">
            <div className="max-w-7xl mx-auto py-24 sm:py-32 px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-3">The BTA Blog</h1>
                    <p className="text-lg text-text-muted">
                        Insights and updates from the Telfer Business Technology Association.
                    </p>
                </div>

                <BlogFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    authors={authors}
                    selectedAuthor={selectedAuthor}
                    setSelectedAuthor={setSelectedAuthor}
                />

                <AnimatedPage>
                    {Object.keys(groupedPosts).length > 0 ? (
                        Object.keys(groupedPosts).map(group => (
                            <section key={group} className="mb-12">
                                {group !== 'all' && (
                                     <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">{group}</h2>
                                )}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {groupedPosts[group].map(post => (
                                        <BlogPostItem key={post.slug} {...post} />
                                    ))}
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-text-muted">No posts found.</p>
                        </div>
                    )}
                     <div className="text-center mt-12">
                        <Link to="/" className="text-accent hover:underline">
                            &larr; Back to Home
                        </Link>
                    </div>
                </AnimatedPage>
            </div>
        </div>
    );
};

export default BlogPage;

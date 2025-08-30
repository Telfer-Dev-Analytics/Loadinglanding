import React from 'react';
import { SearchIcon } from '../icons/SearchIcon';

export const BlogFilters = ({
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder,
    authors,
    selectedAuthor,
    setSelectedAuthor
}) => {
    return (
        <div className="mb-12 p-6 bg-muted/50 rounded-2xl border border-border flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-1/3">
                <input
                    type="text"
                    placeholder="Search posts or authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-full bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            </div>

            {/* Author Filter */}
            <div className="w-full md:w-1/3">
                 <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-full bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
                >
                    {authors.map(author => (
                        <option key={author} value={author} className="capitalize">{author === 'all' ? 'All Authors' : author}</option>
                    ))}
                </select>
            </div>

            {/* Sort Order */}
            <div className="w-full md:w-1/3">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-full bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
                >
                    <option value="newest">Sort by Newest</option>
                    <option value="alphabetical">Sort Alphabetically (A-Z)</option>
                </select>
            </div>
        </div>
    );
};

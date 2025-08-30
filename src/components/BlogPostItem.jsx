import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const BlogPostItem = ({ title, date, excerpt, author, slug }) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-background/50 backdrop-blur-xl border border-border rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 p-6 flex flex-col group">
            <div className="flex-grow">
                <p className="text-sm text-accent font-semibold">{formattedDate}</p>
                <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground group-hover:text-accent transition-colors">{title}</h3>
                <p className="text-sm text-text-muted mb-4">By {author}</p>
                <p className="text-text-muted mb-4">{excerpt}</p>
            </div>
            <div className="mt-auto">
                <Link to={`/blog/${slug}`} className="font-bold text-accent hover:underline flex items-center gap-2">
                    Read More <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>
        </div>
    );
};
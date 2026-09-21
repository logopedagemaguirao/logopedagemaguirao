import React from 'react';
import { BlogPost } from '../types';
import { SafeImage } from './SafeImage';
import { Calendar, Clock, Send, Sparkles, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onRead: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onRead }) => {
  return (
    <article
      id={`blog-card-${post.id}`}
      className="bg-white rounded-2xl border border-[#EADFED] overflow-hidden shadow-sm hover:border-[#B68FC1] hover:shadow-md transition-all flex flex-col justify-between text-left group"
    >
      <div>
        {/* Post Image */}
        {post.imageUrl && (
          <div className="relative aspect-[16/9] overflow-hidden bg-[#F5ECDF]/60 cursor-pointer" onClick={() => onRead(post)}>
            <SafeImage
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#6E2F82] font-semibold text-xs shadow-xs border border-[#EADFED]">
                {post.category}
              </span>
            </div>

            {post.sentToNewsletter && (
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-[#3F1F4D]/85 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1 shadow-xs">
                  <Send className="w-3 h-3 text-[#EADFED]" />
                  <span>Enviado a Newsletter</span>
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6 space-y-3">
          {!post.imageUrl && (
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="px-2.5 py-1 rounded-full bg-[#EADFED] text-[#6E2F82] font-semibold">
                {post.category}
              </span>
              {post.sentToNewsletter && (
                <span className="text-[11px] text-[#6E2F82] flex items-center gap-1">
                  <Send className="w-3 h-3" />
                  <span>Enviado a Newsletter</span>
                </span>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 text-[11px] text-[#2F2931]/60">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#B68FC1]" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#B68FC1]" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h3
            onClick={() => onRead(post)}
            className="font-serif text-lg sm:text-xl font-bold text-[#3F1F4D] group-hover:text-[#6E2F82] transition-colors cursor-pointer leading-snug"
          >
            {post.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#2F2931]/75 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 border-t border-[#EADFED]/60 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#FBF8F3] border border-[#EADFED] text-[#2F2931]/70">
              #{tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onRead(post)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E2F82] hover:text-[#3F1F4D] transition-colors cursor-pointer"
        >
          <span>Leer artículo</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
};

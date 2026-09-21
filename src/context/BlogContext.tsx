import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/blogPostsData';

interface NewsletterCampaign {
  id: string;
  postId: string;
  postTitle: string;
  category: string;
  sentDate: string;
  recipientCount: number;
  openRateEstimated: string;
}

interface BlogContextType {
  posts: BlogPost[];
  activePost: BlogPost | null;
  selectedCategory: string;
  searchQuery: string;
  isEditorOpen: boolean;
  isNewsletterModalOpen: boolean;
  campaigns: NewsletterCampaign[];
  totalSubscribers: number;
  setActivePost: (post: BlogPost | null) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  openEditor: (postToEdit?: BlogPost) => void;
  closeEditor: () => void;
  openNewsletterModal: (post?: BlogPost) => void;
  closeNewsletterModal: () => void;
  savePost: (postData: Omit<BlogPost, 'id' | 'slug'>, existingId?: string, sendToNewsletterNow?: boolean) => BlogPost;
  deletePost: (postId: string) => void;
  dispatchPostToNewsletter: (postId: string) => void;
  resetPostsToDefault: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_BLOG_POSTS = 'gema_guirao_blog_posts';
const STORAGE_CAMPAIGNS = 'gema_guirao_newsletter_campaigns';
const STORAGE_SUBSCRIBERS = 'gema_guirao_newsletter_subscribers';

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([
    {
      id: 'camp-1',
      postId: 'post-1',
      postTitle: 'Estrategias de higiene vocal para docentes: cómo prevenir la disfonía y fatiga vocal',
      category: 'Voz',
      sentDate: '18 Sep 2026',
      recipientCount: 148,
      openRateEstimated: '64.2%'
    },
    {
      id: 'camp-2',
      postId: 'post-2',
      postTitle: 'Alimentación segura tras un ictus: cómo identificar la disfagia y los signos de atragantamiento silente',
      category: 'Disfagia',
      sentDate: '2 Sep 2026',
      recipientCount: 145,
      openRateEstimated: '71.0%'
    }
  ]);
  const [totalSubscribers, setTotalSubscribers] = useState<number>(148);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem(STORAGE_BLOG_POSTS);
      if (savedPosts) {
        const parsed: BlogPost[] = JSON.parse(savedPosts);
        const map = new Map(INITIAL_BLOG_POSTS.map(p => [p.id, p]));
        parsed.forEach(p => map.set(p.id, p));
        setPosts(Array.from(map.values()));
      }

      const savedCampaigns = localStorage.getItem(STORAGE_CAMPAIGNS);
      if (savedCampaigns) {
        setCampaigns(JSON.parse(savedCampaigns));
      }

      const subscribersRaw = localStorage.getItem(STORAGE_SUBSCRIBERS);
      if (subscribersRaw) {
        const subs = JSON.parse(subscribersRaw);
        setTotalSubscribers(148 + (Array.isArray(subs) ? subs.length : 0));
      }
    } catch {
      // Fallback to defaults
    }
  }, []);

  const savePostsToStorage = (updatedPosts: BlogPost[]) => {
    try {
      localStorage.setItem(STORAGE_BLOG_POSTS, JSON.stringify(updatedPosts));
    } catch (e) {
      console.error('Error saving posts', e);
    }
  };

  const saveCampaignsToStorage = (updatedCampaigns: NewsletterCampaign[]) => {
    try {
      localStorage.setItem(STORAGE_CAMPAIGNS, JSON.stringify(updatedCampaigns));
    } catch (e) {
      console.error('Error saving campaigns', e);
    }
  };

  const openEditor = (postToEdit?: BlogPost) => {
    if (postToEdit) {
      setActivePost(postToEdit);
    }
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
  };

  const openNewsletterModal = (post?: BlogPost) => {
    if (post) {
      setActivePost(post);
    }
    setIsNewsletterModalOpen(true);
  };

  const closeNewsletterModal = () => {
    setIsNewsletterModalOpen(false);
  };

  const dispatchPostToNewsletter = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const todayStr = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const updatedPosts = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          sentToNewsletter: true,
          newsletterSentDate: todayStr,
          subscribersNotifiedCount: totalSubscribers
        };
      }
      return p;
    });

    setPosts(updatedPosts);
    savePostsToStorage(updatedPosts);

    // Register campaign
    const newCamp: NewsletterCampaign = {
      id: `camp-${Date.now()}`,
      postId: post.id,
      postTitle: post.title,
      category: post.category,
      sentDate: todayStr,
      recipientCount: totalSubscribers,
      openRateEstimated: '70%+'
    };

    const nextCamps = [newCamp, ...campaigns];
    setCampaigns(nextCamps);
    saveCampaignsToStorage(nextCamps);

    if (activePost && activePost.id === postId) {
      setActivePost({
        ...activePost,
        sentToNewsletter: true,
        newsletterSentDate: todayStr,
        subscribersNotifiedCount: totalSubscribers
      });
    }
  };

  const savePost = (
    postData: Omit<BlogPost, 'id' | 'slug'>,
    existingId?: string,
    sendToNewsletterNow: boolean = true
  ): BlogPost => {
    const today = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const slug = postData.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let saved: BlogPost;

    if (existingId) {
      saved = {
        ...postData,
        id: existingId,
        slug,
        sentToNewsletter: sendToNewsletterNow ? true : postData.sentToNewsletter,
        newsletterSentDate: sendToNewsletterNow ? today : postData.newsletterSentDate,
        subscribersNotifiedCount: sendToNewsletterNow ? totalSubscribers : postData.subscribersNotifiedCount
      };

      const updated = posts.map(p => (p.id === existingId ? saved : p));
      setPosts(updated);
      savePostsToStorage(updated);
    } else {
      saved = {
        ...postData,
        id: `post-custom-${Date.now()}`,
        slug,
        date: today,
        sentToNewsletter: sendToNewsletterNow,
        newsletterSentDate: sendToNewsletterNow ? today : undefined,
        subscribersNotifiedCount: sendToNewsletterNow ? totalSubscribers : 0
      };

      const updated = [saved, ...posts];
      setPosts(updated);
      savePostsToStorage(updated);
    }

    if (sendToNewsletterNow) {
      const newCamp: NewsletterCampaign = {
        id: `camp-${Date.now()}`,
        postId: saved.id,
        postTitle: saved.title,
        category: saved.category,
        sentDate: today,
        recipientCount: totalSubscribers,
        openRateEstimated: 'Reciente'
      };
      const nextCamps = [newCamp, ...campaigns];
      setCampaigns(nextCamps);
      saveCampaignsToStorage(nextCamps);
    }

    closeEditor();
    return saved;
  };

  const deletePost = (postId: string) => {
    const updated = posts.filter(p => p.id !== postId);
    setPosts(updated);
    savePostsToStorage(updated);
    if (activePost && activePost.id === postId) {
      setActivePost(null);
    }
  };

  const resetPostsToDefault = () => {
    localStorage.removeItem(STORAGE_BLOG_POSTS);
    setPosts(INITIAL_BLOG_POSTS);
    setActivePost(null);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        activePost,
        selectedCategory,
        searchQuery,
        isEditorOpen,
        isNewsletterModalOpen,
        campaigns,
        totalSubscribers,
        setActivePost,
        setSelectedCategory,
        setSearchQuery,
        openEditor,
        closeEditor,
        openNewsletterModal,
        closeNewsletterModal,
        savePost,
        deletePost,
        dispatchPostToNewsletter,
        resetPostsToDefault
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

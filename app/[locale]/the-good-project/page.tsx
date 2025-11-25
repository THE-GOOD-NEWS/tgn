"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crown, 
  Video, 
  BookOpen, 
  Lock, 
  Play,
  Clock,
  User,
  Calendar,
  Star,
  Sparkles
} from 'lucide-react';

// Mock data for exclusive content
const exclusiveArticles = [
  {
    id: '1',
    title: 'The Psychology of Positive News Consumption',
    excerpt: 'Deep dive into how consuming positive news affects our mental health and worldview.',
    author: 'Dr. Sarah Johnson',
    readTime: '12 min read',
    publishedAt: '2024-01-20',
    category: 'Psychology',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg'
  },
  {
    id: '2',
    title: 'Building Sustainable Communities: A Global Perspective',
    excerpt: 'Exploring successful community initiatives around the world that are making a real difference.',
    author: 'Maria Rodriguez',
    readTime: '15 min read',
    publishedAt: '2024-01-18',
    category: 'Community',
    image: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg'
  }
];

const videoPlaylists = [
  {
    id: '1',
    title: 'Mental Health & Wellness',
    description: 'Expert interviews and practical tips for mental wellness',
    thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
    videoCount: 8,
    duration: '2h 15m',
    videos: [
      {
        id: '1',
        title: 'Understanding Anxiety in Modern Times',
        duration: '18:30',
        thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg'
      },
      {
        id: '2',
        title: 'Mindfulness Techniques for Daily Life',
        duration: '22:45',
        thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg'
      }
    ]
  },
  {
    id: '2',
    title: 'Sustainable Living',
    description: 'Practical guides for eco-friendly lifestyle changes',
    thumbnail: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg',
    videoCount: 12,
    duration: '3h 42m',
    videos: [
      {
        id: '3',
        title: 'Zero Waste Kitchen Setup',
        duration: '15:20',
        thumbnail: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg'
      },
      {
        id: '4',
        title: 'Renewable Energy for Homes',
        duration: '28:15',
        thumbnail: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg'
      }
    ]
  }
];

export default function TheGoodProjectPage() {
  const { data: session } = useSession();
  const locale = useLocale();
  const router = useRouter();
  const [selectedPlaylist, setSelectedPlaylist] = useState(videoPlaylists[0]);

  // Check if user has access (subscriber)
  const hasAccess = session && (session as any).user?.role === 'subscriber';

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <Crown className="w-16 h-16 text-bright-yellow mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Sign In Required
            </h1>
            <p className="text-muted-foreground mb-8">
              Please sign in to access The Good Project exclusive content.
            </p>
            <Button
              onClick={() => router.push(`/${locale}/auth/login`)}
              className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow text-black"
            >
              Sign In
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <Lock className="w-16 h-16 text-hot-pink mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Subscription Required
            </h1>
            <p className="text-muted-foreground mb-8">
              Upgrade to access The Good Project exclusive content and video playlists.
            </p>
            <Button
              onClick={() => router.push(`/${locale}/subscribe`)}
              className="button-glow bg-gradient-to-r from-hot-pink to-bright-yellow text-black"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-hot-pink/20 to-bright-yellow/20 border border-hot-pink/30 mb-6">
            <Sparkles className="w-4 h-4 text-bright-yellow mr-2 rtl:mr-0 rtl:ml-2" />
            <span className="text-sm font-medium text-foreground">Exclusive Content</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-hot-pink to-bright-yellow bg-clip-text text-transparent">
              The Good Project
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Premium content designed to inspire, educate, and empower our community members.
          </p>
        </div>

        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-fit lg:grid-cols-2">
            <TabsTrigger 
              value="articles" 
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <BookOpen className="w-4 h-4" />
              <span>Exclusive Articles</span>
            </TabsTrigger>
            <TabsTrigger 
              value="videos" 
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Video className="w-4 h-4" />
              <span>Video Playlists</span>
            </TabsTrigger>
          </TabsList>

          {/* Exclusive Articles */}
          <TabsContent value="articles" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {exclusiveArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className="group card-hover border-0 bg-gradient-to-br from-background to-muted/20 shadow-lg hover:shadow-2xl overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-gradient-to-r from-hot-pink to-bright-yellow text-black">
                      <Star className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      Exclusive
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-hot-pink transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>

                    <Button
                      variant="ghost"
                      className="w-full justify-between group/btn hover:bg-gradient-to-r hover:from-hot-pink/10 hover:to-bright-yellow/10"
                    >
                      <span className="font-medium">Read Article</span>
                      <BookOpen className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Video Playlists */}
          <TabsContent value="videos" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Playlist Sidebar */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Playlists</h3>
                {videoPlaylists.map((playlist) => (
                  <Card
                    key={playlist.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedPlaylist.id === playlist.id
                        ? 'ring-2 ring-hot-pink bg-gradient-to-r from-hot-pink/10 to-bright-yellow/10'
                        : 'hover:shadow-lg card-hover'
                    }`}
                    onClick={() => setSelectedPlaylist(playlist)}
                  >
                    <CardContent className="p-4">
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <div className="relative w-16 h-12 flex-shrink-0">
                          <img
                            src={playlist.thumbnail}
                            alt={playlist.title}
                            className="w-full h-full object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded">
                            <Video className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-foreground line-clamp-1">
                            {playlist.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {playlist.videoCount} videos • {playlist.duration}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Video Area */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 bg-gradient-to-br from-background to-muted/20 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-foreground">
                        {selectedPlaylist.title}
                      </h2>
                      <Badge className="bg-gradient-to-r from-hot-pink/20 to-bright-yellow/20 text-foreground border-hot-pink/30">
                        {selectedPlaylist.videoCount} Videos
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {selectedPlaylist.description}
                    </p>

                    {/* Video List */}
                    <div className="space-y-4">
                      {selectedPlaylist.videos.map((video, index) => (
                        <div
                          key={video.id}
                          className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                        >
                          <div className="relative w-24 h-16 flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover rounded"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded group-hover:bg-black/60 transition-colors">
                              <Play className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground group-hover:text-hot-pink transition-colors">
                              {video.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Duration: {video.duration}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

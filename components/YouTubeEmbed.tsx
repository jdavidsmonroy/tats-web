"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  thumbnailUrl?: string;
}

export default function YouTubeEmbed({ videoId, title = "YouTube video player", thumbnailUrl }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Si no se proporciona thumbnail, usa el de máxima resolución por defecto de YouTube
  const thumbUrl = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (isLoaded) {
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full border-none"
      />
    );
  }

  return (
    <div 
      className="relative w-full h-full cursor-pointer group overflow-hidden bg-neutral-900"
      onClick={() => setIsLoaded(true)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${thumbUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-2xl transition-all group-hover:bg-white group-hover:text-black text-white"
        >
          <Play className="w-6 h-6 ml-1" />
        </motion.div>
      </div>

      {title && title !== "YouTube video player" && (
        <div className="absolute bottom-4 left-5 right-5 z-10">
          <span className="text-white font-medium text-sm leading-tight drop-shadow-lg line-clamp-2">{title}</span>
        </div>
      )}
    </div>
  );
}

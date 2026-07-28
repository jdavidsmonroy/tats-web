"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 pr-5 w-fit hover:bg-black/60 transition-colors">
      <button 
        onClick={togglePlay}
        className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-transform"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
      </button>
      <div className="flex flex-col">
        <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">En vivo</span>
        <span className="text-sm text-white font-medium">{title}</span>
      </div>
      
      <audio 
        ref={audioRef} 
        src={src} 
        onEnded={() => setIsPlaying(false)}
        className="hidden" 
      />
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from "lucide-react";

export interface Track {
  id: string;
  title: string;
  artist?: string;
  src: string;
  duration?: string;
}

interface PlaylistPlayerProps {
  tracks: Track[];
  albumTitle?: string;
}

export default function PlaylistPlayer({ tracks, albumTitle = "Álbum en vivo" }: PlaylistPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const playTrack = (index: number) => {
    if (index === currentIndex) {
      togglePlay();
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-300">
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleNext}
      />

      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-white/10">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-neutral-800 to-black border border-white/10 flex items-center justify-center shadow-inner group flex-shrink-0">
          <Music className={`w-10 h-10 ${isPlaying ? "text-white animate-pulse" : "text-neutral-500"}`} />
          {isPlaying && (
            <div className="absolute bottom-3 flex items-end gap-1 h-4">
              <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
              <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
            </div>
          )}
        </div>

        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="mb-3 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">{albumTitle}</span>
            <h3 className="text-2xl font-bold text-white tracking-tight mt-1">{currentTrack?.title}</h3>
            <p className="text-sm text-neutral-400 font-light">{currentTrack?.artist || "Deep Roots Duo"}</p>
          </div>

          <div className="w-full mb-4">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-neutral-300 transition-colors"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 mx-auto md:mx-0">
              <button
                onClick={handlePrev}
                className="p-2 text-neutral-400 hover:text-white transition-colors active:scale-95"
                title="Canción anterior"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg hover:bg-neutral-200"
                title={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="p-2 text-neutral-400 hover:text-white transition-colors active:scale-95"
                title="Siguiente canción"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
                title={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-white" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 md:w-24 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2 px-3">
          Lista de canciones ({tracks.length})
        </h4>

        {tracks.map((track, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <div
              key={track.id || idx}
              onClick={() => playTrack(idx)}
              className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-white/10 border border-white/20 text-white"
                  : "bg-neutral-900/40 hover:bg-white/5 text-neutral-300 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-xs font-semibold flex-shrink-0">
                  {isSelected && isPlaying ? (
                    <Pause className="w-3.5 h-3.5 text-white" />
                  ) : isSelected ? (
                    <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                  ) : (
                    <span className="text-neutral-500">{idx + 1}</span>
                  )}
                </div>
                <div className="truncate">
                  <p className={`text-sm font-medium truncate ${isSelected ? "text-white font-semibold" : ""}`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-neutral-400 truncate">{track.artist || "Deep Roots Duo"}</p>
                </div>
              </div>

              {isSelected && (
                <span className="text-xs text-white font-medium px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                  {isPlaying ? "Reproduciendo" : "Pausado"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

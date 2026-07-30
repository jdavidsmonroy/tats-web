"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface VideoItem {
  id: string;
  type: "youtube" | "mp4";
  title: string;
  subtitle?: string;
  youtubeId?: string;
  mp4Src?: string;
  posterSrc?: string;
}

interface VideoGalleryProps {
  featuredVideo: VideoItem;
  videos: VideoItem[];
}

export default function VideoGallery({ featuredVideo, videos }: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeVideo]);

  return (
    <>
      {/* Featured Video Card */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold tracking-tight mb-6 text-white">Destacado</h2>
        <div className="bg-neutral-900/50 rounded-3xl p-6 border border-white/5 h-fit shadow-2xl space-y-6">
          <div
            onClick={() => setActiveVideo(featuredVideo)}
            className="group relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black cursor-pointer shadow-lg"
          >
            <Image
              src={featuredVideo.posterSrc || "/images/in-the-mix/photo1.jpg"}
              alt={featuredVideo.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/40 transition-colors" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 text-black flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-sm">
                <Play className="w-6 h-6 ml-1 fill-black" />
              </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-300 block mb-0.5">
                Vídeo en directo
              </span>
              <h3 className="text-sm font-bold truncate">{featuredVideo.title}</h3>
            </div>
          </div>

          <p className="text-neutral-400 text-sm font-light leading-relaxed">
            Nuestra puesta en escena destaca por la frescura y la conexión con el público. Hacemos que cada concierto sea una auténtica fiesta de Soul y Funk.
          </p>
        </div>
      </div>

      {/* Full Video Grid Section */}
      <div className="col-span-full mt-12">
        <div className="flex items-center gap-3 mb-8">
          <Film className="w-6 h-6 text-neutral-400" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Más conciertos en directo</h2>
            <p className="text-neutral-400 text-sm font-light">Vídeos en vivo y actuaciones del grupo.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => {
            const thumbnailSrc =
              video.type === "youtube"
                ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                : video.posterSrc || "/images/in-the-mix/photo1.jpg";

            return (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 shadow-2xl cursor-pointer hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-video w-full bg-black relative overflow-hidden">
                  <Image
                    src={thumbnailSrc}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all shadow-xl backdrop-blur-sm">
                      <Play className="w-5 h-5 ml-0.5 fill-black" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-neutral-900">
                  <h3 className="font-semibold text-sm text-white truncate">{video.title}</h3>
                  {video.subtitle && (
                    <p className="text-xs text-neutral-400 font-light truncate mt-0.5">{video.subtitle}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              title="Cerrar vídeo"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              {activeVideo.type === "youtube" ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative max-h-[80vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black flex items-center justify-center">
                  <video
                    src={activeVideo.mp4Src}
                    autoPlay
                    controls
                    playsInline
                    className="max-h-[80vh] max-w-full rounded-2xl object-contain"
                  />
                </div>
              )}

              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white">{activeVideo.title}</h3>
                {activeVideo.subtitle && (
                  <p className="text-sm text-neutral-400 font-light mt-0.5">{activeVideo.subtitle}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

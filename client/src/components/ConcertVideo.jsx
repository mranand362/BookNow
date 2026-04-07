import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaSpinner,
} from 'react-icons/fa';

const ConcertVideo = () => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  // 🔥 Autoplay Fix
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log('Autoplay prevented:', err);
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleVideoReady = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = () => {
    console.log('Video failed to load');
    setIsVideoLoading(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* 🎬 Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onCanPlay={handleVideoReady}
        onLoadedData={handleVideoReady}
        onError={handleVideoError}
      >
        <source src="/videos/concert2.mp4" type="video/mp4" />
      </video>

      {/* ⏳ Loading Spinner */}
      <AnimatePresence>
        {isVideoLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"
          >
            <FaSpinner className="text-white text-4xl animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌑 Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 🎤 Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Experience the Music
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
        >
          Watch highlights from our latest concerts and enjoy live vibes 🎶
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4"
        >
          
        </motion.div>
      </div>

      {/* 🎮 Controls */}
      <div className="absolute bottom-4 right-4 z-30 flex gap-2">
        <button
          onClick={togglePlay}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
        >
          {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>

        <button
          onClick={toggleMute}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
        >
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
      </div>

    </section>
  );
};

export default ConcertVideo;
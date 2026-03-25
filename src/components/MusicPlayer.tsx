import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Cyberpunk Dreams",
    artist: "AI Synth",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/seed/cyber/200/200"
  },
  {
    id: 2,
    title: "Neon Rain",
    artist: "Digital Soul",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/seed/neon/200/200"
  },
  {
    id: 3,
    title: "Velocity Shift",
    artist: "Binary Beat",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/seed/velocity/200/200"
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleSkip = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    }
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = (parseFloat(e.target.value) / 100) * (audioRef.current?.duration || 0);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  return (
    <div className="w-full max-w-md bg-black/60 backdrop-blur-md p-6 rounded-2xl neon-border">
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={onTimeUpdate}
        onEnded={() => handleSkip('next')}
      />
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <img 
            src={currentTrack.cover} 
            alt="Cover" 
            className={`w-24 h-24 rounded-lg object-cover shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-transform duration-500 ${isPlaying ? 'animate-spin-slow' : ''}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
            <Music className="text-neon-blue w-8 h-8" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <h3 className="text-xl font-bold text-neon-blue truncate neon-text-blue">{currentTrack.title}</h3>
          <p className="text-white/60 text-sm truncate">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-neon-blue shadow-[0_0_10px_#00f2ff]" 
            style={{ width: `${progress}%` }}
          />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleSkip('prev')}
              className="p-2 text-white/80 hover:text-neon-blue transition-colors"
            >
              <SkipBack fill="currentColor" size={24} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-neon-blue text-black rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_#00f2ff]"
            >
              {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} className="ml-1" />}
            </button>
            <button 
              onClick={() => handleSkip('next')}
              className="p-2 text-white/80 hover:text-neon-blue transition-colors"
            >
              <SkipForward fill="currentColor" size={24} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-white/40">
            <Volume2 size={18} />
            <div className="w-16 h-1 bg-white/10 rounded-full">
               <div className="w-2/3 h-full bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

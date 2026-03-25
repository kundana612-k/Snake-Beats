import { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Trophy, Gamepad2, Music } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Background Neon Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-pink/10 blur-[120px] rounded-full pointer-events-none" />

      <header className="mb-8 text-center relative">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic neon-text-blue mb-2">
            NEON <span className="text-neon-pink neon-text-pink">BEATS</span>
          </h1>
          <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold">
            Retro Arcade • Lo-Fi Experience
          </p>
        </motion.div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Stats & Info */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-6"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4 text-neon-green">
              <Trophy size={20} className="neon-text-green drop-shadow-[0_0_5px_rgba(57,255,20,0.8)]" />
              <h2 className="font-bold uppercase tracking-wider text-sm">Scoreboard</h2>
            </div>
            <div className="text-5xl font-mono font-bold neon-text-green">
              {score.toString().padStart(4, '0')}
            </div>
            <div className="mt-4 text-xs text-white/30 uppercase font-bold">
              High Score: 0420
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4 text-neon-blue">
              <Gamepad2 size={20} className="neon-text-blue drop-shadow-[0_0_5px_rgba(0,242,255,0.8)]" />
              <h2 className="font-bold uppercase tracking-wider text-sm">Controls</h2>
            </div>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex justify-between"><span>Move</span> <span className="text-white font-mono">Arrows</span></li>
              <li className="flex justify-between"><span>Pause</span> <span className="text-white font-mono">Space</span></li>
              <li className="flex justify-between"><span>Music</span> <span className="text-white font-mono">Player UI</span></li>
            </ul>
          </div>
        </motion.div>

        {/* Center Panel: Snake Game */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex justify-center"
        >
          <div className="relative">
             <div className="absolute -inset-4 bg-neon-blue/20 blur-2xl rounded-3xl animate-pulse" />
             <SnakeGame onScoreChange={setScore} />
          </div>
        </motion.div>

        {/* Right Panel: Music Player */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 text-neon-pink ml-2">
            <Music size={20} className="neon-text-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]" />
            <h2 className="font-bold uppercase tracking-wider text-sm">Now Playing</h2>
          </div>
          <MusicPlayer />
          
          <div className="mt-auto p-4 border-t border-white/5 text-[10px] text-white/20 uppercase tracking-widest text-center">
            System v2.4.0 • Stable Connection
          </div>
        </motion.div>
      </main>

      <footer className="mt-12 text-white/20 text-[10px] uppercase tracking-[0.5em]">
        Designed for the Digital Frontier
      </footer>
    </div>
  );
}

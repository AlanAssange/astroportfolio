import React, { useRef, useEffect } from "react";
import { useStore } from "../utils/useStore";
import "../styles/pianoknight.css";
import pianoKnightImg from "/src/assets/images/pianoknight.png";
import pianoKnightHappy from "/src/assets/images/happyknight.png";
import notesImg from "../assets/images/musicnotes.png";
import musicGrausam from "../assets/sounds/grausamkeit.mp3";

export default function PianoKnight() {
  const isMuted = useStore((state) => state.isMuted);
  const isStarted = useStore((state) => state.isAudioStarted);
  const toggleAudio = useStore((state) => state.toggleAudio);
  const startAudio = useStore((state) => state.startAudio);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isStarted && !audioRef.current) {
      audioRef.current = new Audio(musicGrausam);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(console.error);
    }
    
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isStarted, isMuted]);

  const isPlaying = isStarted && !isMuted;
  const knightImage = isPlaying ? pianoKnightHappy : pianoKnightImg;

  return (
    <div className="knight-container">
      {isPlaying && (
        <img 
          src={notesImg.src}
          className="music-notes" 
          alt="Notes"
        />
      )}
      <img
        className="piano-knight"
        src={knightImage.src}
        onClick={isStarted ? toggleAudio : startAudio}
        alt="Piano Knight"
      />
    </div>
  );
}
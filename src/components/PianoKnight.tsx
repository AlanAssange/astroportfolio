import React, { useState, useEffect } from "react";
import "../styles/pianoknight.css";
import pianoKnightImg from "/src/assets/images/pianoknight.png";
import pianoKnightHappy from "/src/assets/images/happyknight.png";
import notesImg from "../assets/images/musicnotes.png";
import musicGrausam from "../assets/sounds/grausamkeit.mp3";

export default function PianoKnight() {
  const [started, setStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleSync = (e: any) => {
      setIsMuted(e.detail.isMuted);
    };
    
    window.addEventListener("syncKnightAudio", handleSync);
    return () => window.removeEventListener("syncKnightAudio", handleSync);
  }, []);

  const handleStartSound = async () => {
    let audio = (window as any).knightAudio;

    if (!audio) {
      audio = new Audio(musicGrausam);
      audio.loop = true;
      audio.volume = 0.4;
      (window as any).knightAudio = audio;
    }

    if (!started) {
      try {
        audio.muted = false;
        await audio.play();
        setStarted(true);
        setIsMuted(false);
        
        window.dispatchEvent(new CustomEvent("syncKnightAudio", { 
          detail: { isMuted: false, started: true } 
        }));
      } catch (error) {
        console.error(error);
      }
    } else {
      const nextMutedState = !audio.muted;
      audio.muted = nextMutedState;
      setIsMuted(nextMutedState);
      
      window.dispatchEvent(new CustomEvent("syncKnightAudio", { 
        detail: { isMuted: nextMutedState, started: true } 
      }));
    }
  };

  const isPlaying = started && !isMuted;
  const knightImage = isPlaying 
    ? pianoKnightHappy
    : pianoKnightImg;

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
        onClick={handleStartSound}
        alt="Piano Knight"
      />
    </div>
  );
}
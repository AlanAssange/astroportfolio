import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../utils/useStore";
import { useDraggable } from "../utils/useDraggable";
import "../styles/shortcuts.css";

interface ShortcutProps {
  id: string;
  label: string;
  icon: string;
  target: string;
  x?: number;
  y?: number;
}

export default function Shortcut({ id, label, icon, target, x = 20, y = 20 }: ShortcutProps) {
  const { t } = useTranslation();
  const [pos, setPos] = useState({ x, y });
  const [isMobile, setIsMobile] = useState(false);
  const openWindow = useStore((state) => state.openWindow);
  const setFocusedWindow = useStore((state) => state.setFocusedWindow);

  const { windowRef, titlebarRef, onPointerDown } = useDraggable({ id, isMobile });

  useEffect(() => {
    const calculatePosition = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (mobile) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const gapX = 95; 
        const gapY = 130; 

        const mobilePositions: Record<string, { x: number, y: number }> = {
          "win-lab":     { x: centerX - gapX, y: centerY - gapY }, 
          "win-work":    { x: centerX + 5,    y: centerY - gapY },
          "win-links":   { x: centerX - gapX, y: centerY + -29 },
          "win-contact": { x: centerX + 5,    y: centerY + -2 },
        };

        setPos(mobilePositions[id] || { x, y });
      } else {
        setPos({ x, y });
      }
    };

    calculatePosition();
    window.addEventListener("resize", calculatePosition); 
    return () => window.removeEventListener("resize", calculatePosition);
  }, [id, x, y]);

  const handleOpen = () => {
    const targetId = target.replace("#", "");
    openWindow(targetId);
    setFocusedWindow(targetId);
  };

  return (
    <div
      ref={(el) => {
        if (el) {
          windowRef.current = el;
          titlebarRef.current = el;
        }
      }}
      className="shortcut"
      role="button"
      aria-label={t(label)}
      onPointerDown={onPointerDown}
      onClick={isMobile ? handleOpen : undefined}
      onDoubleClick={!isMobile ? handleOpen : undefined}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        position: 'absolute'
      }}
    >
      <img src={icon} alt={t(label)} draggable="false" />
      <span>{t(label)}</span>
    </div>
  );
}
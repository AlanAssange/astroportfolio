import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
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
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState(false);
  const [pos, setPos] = useState({ x, y });  
  const [isMobile, setIsMobile] = useState(false); 
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'en';
    if (i18n.language !== saved) {
      i18n.changeLanguage(saved).then(() => setReady(true));
    } else {
      setReady(true);
    }
  }, [i18n]);

  useEffect(() => {
    const calculatePosition = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (mobile) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const gapX = 95; 
        const gapY = 100; 

        const mobilePositions: Record<string, { x: number, y: number }> = {
          "win-lab":     { x: centerX - gapX, y: centerY - gapY }, 
          "win-work":    { x: centerX + 5,    y: centerY - gapY },
          "win-links":   { x: centerX - gapX, y: centerY + 5 },
          "win-contact": { x: centerX + 5,    y: centerY + 33 },
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

  useEffect(() => {
    if (!ready) return;

    const el = ref.current;
    if (!el) return;

    const openWindow = () => {
      window.dispatchEvent(
        new CustomEvent("open-window", { detail: target.replace("#", "") })
      );
    };

    if (isMobile) {
      el.addEventListener("click", openWindow);

      return () => {
        el.removeEventListener("click", openWindow);
      };
    } 
    else {
      let startX = 0, startY = 0;
      let startLeft = pos.x, startTop = pos.y;

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();

        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement!.getBoundingClientRect();
        startLeft = rect.left - parentRect.left;
        startTop = rect.top - parentRect.top;

        startX = e.clientX;
        startY = e.clientY;

        el.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!el.hasPointerCapture(e.pointerId)) return;

        const newLeft = startLeft + (e.clientX - startX);
        const newTop = startTop + (e.clientY - startY);

        const maxLeft = window.innerWidth - el.offsetWidth;
        const maxTop = window.innerHeight - el.offsetHeight;

        const clampedLeft = Math.min(Math.max(0, newLeft), maxLeft);
        const clampedTop = Math.min(Math.max(0, newTop), maxTop);

        el.style.left = `${clampedLeft}px`;
        el.style.top = `${clampedTop}px`;
      };

      const onPointerUp = (e: PointerEvent) => {
        el.releasePointerCapture(e.pointerId);
      };

      el.addEventListener("pointerdown", onPointerDown);
      el.addEventListener("pointermove", onPointerMove);
      el.addEventListener("pointerup", onPointerUp);
      el.addEventListener("dblclick", openWindow);

      return () => {
        el.removeEventListener("pointerdown", onPointerDown);
        el.removeEventListener("pointermove", onPointerMove);
        el.removeEventListener("pointerup", onPointerUp);
        el.removeEventListener("dblclick", openWindow);
      };
    }
  }, [ready, isMobile, target]);

  if (!ready) return null;

  return (
    <div
      ref={ref}
      className="shortcut"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      role="button"
      aria-label={t(label)}
    >
      <img src={icon} alt={t(label)} draggable="false" />
      <span>{t(label)}</span>
    </div>
  );
}
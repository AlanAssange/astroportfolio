import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import "../styles/shortcuts.css";

interface ShortcutProps {
  label: string;
  icon: string;
  target: string;
  x?: number;
  y?: number;
}

export default function Shortcut({ label, icon, target, x = 20, y = 20 }: ShortcutProps) {
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState(false);
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
    if (!ready) return;

    const el = ref.current;
    if (!el) return;

    let startX = 0, startY = 0;
    let startLeft = x, startTop = y;

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

    const onDoubleClick = () => {
      window.dispatchEvent(
        new CustomEvent("open-window", { detail: target.replace("#", "") })
      );
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("dblclick", onDoubleClick);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("dblclick", onDoubleClick);
    };
  }, [ready, target, x, y]);

  if (!ready) return null;

  return (
    <div
      ref={ref}
      className="shortcut"
      style={{ left: `${x}px`, top: `${y}px` }}
      role="button"
      aria-label={t(label)}
    >
      <img src={icon} alt={t(label)} draggable="false" />
      <span>{t(label)}</span>
    </div>
  );
}
import { useEffect, useRef } from "react";
import "../styles/shortcuts.css";

interface ShortcutProps {
  label: string;
  icon: string;
  target: string;
  x?: number;
  y?: number;
}

export default function Shortcut({ label, icon, target, x = 20, y = 20 }: ShortcutProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let dragging = false;
    let startX = 0,
      startY = 0;
    let startLeft = x,
      startTop = y;

    const updateInitialPos = () => {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();
      startLeft = rect.left - parentRect.left;
      startTop = rect.top - parentRect.top;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      e.preventDefault();
      el.setPointerCapture(e.pointerId);

      updateInitialPos();

      startX = e.clientX;
      startY = e.clientY;
      dragging = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!el.hasPointerCapture(e.pointerId)) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!dragging && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        dragging = true;
      }

      if (dragging) {
        el.style.left = `${startLeft + dx}px`;
        el.style.top = `${startTop + dy}px`;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      el.releasePointerCapture(e.pointerId);
    };

    const onDoubleClick = () => {
      const targetId = target.replace("#", "");
      window.dispatchEvent(new CustomEvent("open-window", { detail: targetId }));
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
  }, [target, x, y]);

  return (
    <div
      ref={ref}
      className="shortcut"
      data-target={target}
      style={{ left: `${x}px`, top: `${y}px` }}
      role="button"
      aria-label={label}
    >
      <img src={icon} alt={label} draggable="false" />
      <span>{label}</span>
    </div>
  );
}

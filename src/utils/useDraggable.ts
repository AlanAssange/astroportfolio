import React, { useRef, useCallback } from "react";
import { useStore } from "../utils/useStore";

interface UseDraggableProps {
  id: string;
  isMobile: boolean;
}

export const useDraggable = ({ id, isMobile }: UseDraggableProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const titlebarRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const setFocusedWindow = useStore((state) => state.setFocusedWindow);

  const onPointerMove = useCallback((e: any) => {
    const win = windowRef.current;
    const titlebar = titlebarRef.current;
    if (!win || !titlebar || !titlebar.hasPointerCapture(e.pointerId)) return;

    const newLeft = e.clientX - dragOffset.current.x;
    const newTop = e.clientY - dragOffset.current.y;

    const maxLeft = window.innerWidth - win.offsetWidth;
    const maxTop = window.innerHeight - win.offsetHeight;

    const clampedLeft = Math.min(Math.max(0, newLeft), maxLeft);
    const clampedTop = Math.min(Math.max(0, newTop), maxTop);

    win.style.left = `${clampedLeft}px`;
    win.style.top = `${clampedTop}px`;
  }, []);

  const onPointerUp = useCallback((e: any) => {
    const titlebar = titlebarRef.current;
    if (titlebar) {
      try {
        titlebar.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if ((e.target as HTMLElement).closest('.controls')) return;

    if (e.button !== 0) return;
    e.preventDefault();

    const win = windowRef.current;
    const titlebar = titlebarRef.current;
    if (!win || !titlebar) return;

    setFocusedWindow(id);

    const rect = win.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    titlebar.setPointerCapture(e.pointerId);
    
    document.addEventListener("pointermove", onPointerMove as any);
    document.addEventListener("pointerup", onPointerUp as any);
  }, [id, isMobile, setFocusedWindow, onPointerMove, onPointerUp]);

  return {
    windowRef,
    titlebarRef,
    onPointerDown,
  };
};
import React, { useRef, useEffect, useState} from "react";
import { getNextZIndex } from "../utils/zIndexManager";
import "../styles/window.css";

type WindowProps = {
  id: string;
  title: string;
  children?: any;
  defaultVisible?: boolean; // WIP - Para que las ventanas arrnanquen abiertas...
};

export default function Window({
  id,
  title,
  children,
  defaultVisible = false,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const titlebarRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(defaultVisible);

  useEffect(() => {
    const openHandler = (e: CustomEvent<string>) => {
      if (e.detail === id) {
        setIsVisible(true);
        setTimeout(() => bringToFront(), 50);
      }
    };

    window.addEventListener("open-window" as any, openHandler as EventListener);

    return () => {
      window.removeEventListener("open-window" as any, openHandler as EventListener);
    };
  }, [id]);

  const bringToFront = () => {
    if (windowRef.current) {
      windowRef.current.style.zIndex = String(getNextZIndex());
    }
  };

  useEffect(() => {
    const titlebar = titlebarRef.current;
    const win = windowRef.current;
    if (!titlebar || !win) return;
    
    const onPointerDown = (e: PointerEvent) => {
      bringToFront();
      const rect = win.getBoundingClientRect();

      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      titlebar.setPointerCapture(e.pointerId);
    };
  
    const onPointerMove = (e: PointerEvent) => {
      if (titlebar.hasPointerCapture(e.pointerId)) {
        const newLeft = e.clientX - dragOffset.current.x;
        const newTop = e.clientY - dragOffset.current.y;
        
        const maxLeft = window.innerWidth - win.offsetWidth;
        const maxTop = window.innerHeight - win.offsetHeight;
        
        const clampedLeft = Math.min(Math.max(0, newLeft), maxLeft);
        const clampedTop = Math.min(Math.max(0, newTop), maxTop);
        
        win.style.left = `${clampedLeft}px`;
        win.style.top = `${clampedTop}px`;
      }
    };
  
    const onPointerUp = (e: PointerEvent) => {
      try {
        titlebar.releasePointerCapture(e.pointerId);
      } catch {}
    };
  
    titlebar.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  
    return () => {
      titlebar.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  const handleWindowClick = () => bringToFront();

  return (
    <div
      ref={windowRef}
      id={id}
      className={`window ${isVisible ? "" : "hidden"}`}
      style={{
        position: "absolute"
      }}
      role="dialog"
      aria-label={title}
      onPointerDown={handleWindowClick}
    >
      <div ref={titlebarRef} className="titlebar" style={{ cursor: "move" }}>
        <span className="title-text">{title}</span>
        <div className="controls">
          {/* <button className="min-btn" aria-label="minimizar"  onClick={() => setIsVisible(false)}>
            –
          </button> */}
          <button className="close-btn" aria-label="cerrar" onClick={() => setIsVisible(false)}>
            [X]
          </button>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
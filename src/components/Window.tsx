import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getNextZIndex } from "../utils/zIndexManager";
import { windowsConfig } from "../configs/windows";
import "../i18n/i18n";
import "../styles/window.css";

type WindowProps = {
  id: string;
  title: string;
  defaultVisible?: boolean;
};

export default function Window({
  id,
  title,
  defaultVisible = false,
}: WindowProps) {
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const titlebarRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(defaultVisible);

  const windowData = windowsConfig.find(win => win.id === id);
  const ContentComponent = windowData?.Component;

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'en';
    if (i18n.language !== saved) {
      i18n.changeLanguage(saved).then(() => setReady(true));
    } else {
      setReady(true);
    }
  }, [i18n]);

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
    if (!ready) return; 

    const titlebar = titlebarRef.current;
    const win = windowRef.current;
    if (!titlebar || !win) return;

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('.controls')) {
        return; 
      }
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
  }, [ready]);

  if (!ready) return null;

  return (
    <div
      ref={windowRef}
      id={id}
      className={`window ${isVisible ? "" : "hidden"}`}
      style={{ position: "absolute" }}
      role="dialog"
      aria-label={t(title)}
      onPointerDown={bringToFront}
    >
      <div ref={titlebarRef} className="titlebar" style={{ cursor: "move" }}>
        <span className="title-text">{t(title)}</span> 
        
        <div className="controls">
          <button 
            className="close-btn" 
            aria-label="cerrar" 
            onClick={() => setIsVisible(false)}
          >
            [X]
          </button>
        </div>
      </div>
      <div className="content">
        {ContentComponent ? <ContentComponent /> : <p>Cargando...</p>}
      </div>
    </div>
  );
}
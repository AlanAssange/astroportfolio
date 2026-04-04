import React, { useRef, useEffect, useState, useCallback } from "react";
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
  const [isVisible, setIsVisible] = useState(defaultVisible);
  const windowRef = useRef<HTMLDivElement>(null);
  const titlebarRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowData = windowsConfig.find(win => win.id === id);
  const ContentComponent = windowData?.Component;

  const bringToFront = useCallback(() => {
    if (windowRef.current) {
      windowRef.current.style.zIndex = String(getNextZIndex());
    }
  }, []);

  const centerWindow = useCallback(() => {
    const win = windowRef.current;
    if (!win) return;

    const left = (window.innerWidth - win.offsetWidth) / 2;
    const top = (window.innerHeight - win.offsetHeight) / 2;

    win.style.left = `${Math.max(0, left)}px`;
    win.style.top = `${Math.max(0, top)}px`;
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'en';
    if (i18n.language !== saved) {
      i18n.changeLanguage(saved).then(() => setReady(true));
    } else {
      setReady(true);
    }
  }, [i18n]);

  useEffect(() => {
    const openHandler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === id) {
        bringToFront();
        requestAnimationFrame(() => {
          centerWindow();
          setIsVisible(true);
        });
      }
    };
  
    window.addEventListener("open-window", openHandler);
    return () => {
      window.removeEventListener("open-window", openHandler);
    };
  }, [id, bringToFront, centerWindow]);

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
  }, [ready, bringToFront]);

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
            aria-label={t("cerrar")}
            onClick={() => setIsVisible(false)}
          >
            [X]
          </button>
        </div>
      </div>
      <div className="content">
        {ContentComponent ? <ContentComponent /> : <p>{t("cargando", "Cargando...")}</p>}
      </div>
    </div>
  );
}
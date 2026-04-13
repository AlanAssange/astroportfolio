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
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768 ? false : defaultVisible;
    }
    return defaultVisible;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const titlebarRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  
  const windowData = windowsConfig.find(win => win.id === id);
  const ContentComponent = windowData?.Component;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    // Ya no hace falta el checkMobile() acá porque lo iniciamos en el useState
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bringToFront = useCallback(() => {
    if (windowRef.current) {
      windowRef.current.style.zIndex = String(getNextZIndex());
    }
  }, []);

  const centerWindow = useCallback(() => {
    const win = windowRef.current;
    if (!win) return;

    if (window.innerWidth <= 768) {
      win.style.left = "";
      win.style.top = "";
      return;
    }

    const left = (window.innerWidth - win.offsetWidth) / 2;
    const top = (window.innerHeight - win.offsetHeight) / 2 - 50; 

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
    if (defaultVisible && ready && !isMobile) {
      const timer = setTimeout(() => {
        centerWindow();
        bringToFront();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [defaultVisible, ready, centerWindow, bringToFront, isMobile]);

  useEffect(() => {
    const openHandler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === id) {
        setIsVisible(true);
        bringToFront();
        requestAnimationFrame(() => {
          centerWindow();
        });
      }
    };
  
    window.addEventListener("open-window", openHandler);
    return () => {
      window.removeEventListener("open-window", openHandler);
    };
  }, [id, bringToFront, centerWindow]);

  useEffect(() => {
    if (!ready || isMobile) return; 

    const titlebar = titlebarRef.current;
    const win = windowRef.current;
    if (!titlebar || !win) return;

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('.controls')) return; 
      
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
  }, [ready, isMobile, bringToFront]);

  if (!ready) return null;

  return (
    <div
      ref={windowRef}
      id={id}
      className={`window ${isVisible ? "" : "hidden"}`}
      role="dialog"
      aria-label={t(title)}
      onPointerDown={bringToFront}
    >
      <div ref={titlebarRef} className="titlebar">
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
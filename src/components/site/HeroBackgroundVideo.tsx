import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero section video/compressed.mp4";

const posterFrame = "/hero-sequence/ezgif-frame-001.jpg";

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const updateVideoEnabled = () => setVideoEnabled(mediaQuery.matches);
    updateVideoEnabled();
    mediaQuery.addEventListener("change", updateVideoEnabled);

    return () => mediaQuery.removeEventListener("change", updateVideoEnabled);
  }, []);

  useEffect(() => {
    if (!videoEnabled) return;
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => setVideoReady(true);

    const startPlayback = () => {
      if (document.visibilityState !== "visible") return;

      const tryPlay = () => {
        void video.play().catch((error: unknown) => {
          console.error("Hero background video could not start playback.", error);
        });
      };

      if (video.readyState >= 2) {
        tryPlay();
        return;
      }

      requestAnimationFrame(tryPlay);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startPlayback();
      } else {
        video.pause();
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", startPlayback);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", startPlayback);
    startPlayback();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", startPlayback);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", startPlayback);
    };
  }, [videoEnabled]);

  return (
    <>
      {videoEnabled && (
        <video
          ref={videoRef}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onError={() => console.error(`Hero background video failed to load: ${heroVideo}`)}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
        />
      )}
      <img
        src={posterFrame}
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ${videoReady ? "opacity-0" : "opacity-100"}`}
      />
    </>
  );
}

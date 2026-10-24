import { useEffect, useRef, useState } from "react";

const posterFrame = "/hero-sequence/ezgif-frame-001.jpg";

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      if (document.visibilityState !== "visible") return;

      void video.play().catch((error: unknown) => {
        console.error("Hero background video could not start playback.", error);
      });
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startPlayback();
      } else {
        video.pause();
      }
    };

    const handleLoadedData = () => setVideoReady(true);

    video.addEventListener("canplay", startPlayback);
    video.addEventListener("loadeddata", handleLoadedData);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", startPlayback);
    startPlayback();

    return () => {
      video.removeEventListener("canplay", startPlayback);
      video.removeEventListener("loadeddata", handleLoadedData);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", startPlayback);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        poster={posterFrame}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlay={() => setVideoReady(true)}
        onError={() => console.error("Hero background video failed to load: /hero-video.mp4")}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
      />
      <img
        src={posterFrame}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
      />
    </>
  );
}

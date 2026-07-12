"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function formatTime(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState(86400000);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const end = new Date();
    end.setHours(end.getHours() + 23, end.getMinutes() + 42, end.getSeconds() + 15);
    const tick = () => {
      const diff = Math.max(0, end.getTime() - Date.now());
      setTimeLeft(diff);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);

    let player: any;
    let progressInterval: NodeJS.Timeout;

    const onReady = () => {
      setVideoReady(true);
      if (coverRef.current) coverRef.current.classList.add("is-hidden");
      progressInterval = setInterval(() => {
        if (player?.getCurrentTime) {
          const cur = player.getCurrentTime();
          const dur = player.getDuration();
          if (dur > 0) {
            setProgress((cur / dur) * 100);
            progressRef.current = (cur / dur) * 100;
          }
        }
      }, 500);
    };

    (window as any).onYouTubeIframeAPIReady = () => {
      const YT = (window as any).YT;
      player = new YT.Player("heroVideoFrame", {
        height: "100%", width: "100%",
        videoId: "nRmNR13u0-g",
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1, controls: 1, autoplay: 0 },
        events: {
          onReady,
          onStateChange: (e: any) => {
            if (e.data === YT.PlayerState.ENDED && coverRef.current) {
              coverRef.current.classList.remove("is-hidden");
              setIsPlaying(false);
            }
            if (e.data === YT.PlayerState.PLAYING) setIsPlaying(true);
          }
        }
      });
      playerRef.current = player;
    };

    return () => {
      if (player?.destroy) player.destroy();
      if (progressInterval) clearInterval(progressInterval);
    };
  }, []);

  const playVideo = () => {
    const p = playerRef.current;
    if (p?.playVideo) {
      p.playVideo();
      if (coverRef.current) coverRef.current.classList.add("is-hidden");
      if (wrapperRef.current) wrapperRef.current.classList.add("is-playing");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1121] via-[#111B33] to-[#0F1A2E]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2563EB]/10 blur-[120px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#F59E0B]/10 blur-[100px] animate-blob" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-[#10B981]/10 blur-[80px] animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="text-center animate-fade-up">
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              ৮৬৬+ Active Learners
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-bold">
              ⏰ {formatTime(timeLeft)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-4">
            <span className="text-white">⏳ শেষবারের মতো অফার:</span>
            <br />
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#F59E0B] bg-clip-text text-transparent">
              ১০ লক্ষ টাকার ২৩০+ কোর্স
            </span>
            <br />
            <span className="text-white">আজ মাত্র </span>
            <span className="text-[#10B981]">৯৯ টাকায়!</span>
          </h1>

          <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto mb-6 leading-relaxed">
            আগামী ২৪ ঘণ্টা পর দাম বেড়ে হবে ১,৪৯৯ টাকা। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।
          </p>

          <Link href="/register"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 animate-pulse"
          >
            🔥 হ্যাঁ, দাম বাড়ার আগে মাত্র ৯৯ টাকায় আজীবন অ্যাক্সেস নিন →
          </Link>

          <p className="text-sm text-white/40 mt-3 font-medium">
            🛡️ ২৪ ঘণ্টা টাকা ফেরত গ্যারান্টি — কোনো ঝুঁকি নেই!
          </p>
        </div>

        <div ref={wrapperRef} className="relative mt-10 max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black/40 border border-white/10">
          <div id="heroVideoFrame" className="w-full aspect-video" />
          <div ref={coverRef} className="absolute inset-0 z-[9] flex items-center justify-center cursor-pointer" onClick={playVideo}
            style={{ background: "linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.12)),url('https://img.youtube.com/vi/nRmNR13u0-g/maxresdefault.jpg') center/cover no-repeat" }}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white text-3xl shadow-xl hover:scale-105 transition-transform">
              ▶
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <span className="block h-full bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#F59E0B] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up">
          {[
            { value: "৮৬৬+", label: "সক্রিয় শিক্ষার্থী" },
            { value: "৪.৯★", label: "ফেসবুক রেটিং" },
            { value: "৮+ বছর", label: "পেশাদার অভিজ্ঞতা" },
            { value: "৳৫০,০০০+", label: "সর্বোচ্চ মাসিক আয়" },
          ].map((s, i) => (
            <div key={i} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xl md:text-2xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-white/50 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
    </section>
  );
}

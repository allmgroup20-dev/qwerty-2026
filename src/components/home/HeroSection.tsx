"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const OFFER_END = new Date();
OFFER_END.setHours(OFFER_END.getHours() + 23);
OFFER_END.setMinutes(OFFER_END.getMinutes() + 42);
OFFER_END.setSeconds(OFFER_END.getSeconds() + 15);

function formatTime(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState(86400000);
  const [videoReady, setVideoReady] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef<{ seekTo: (s: number) => void; getDuration: () => number; getCurrentTime: () => number; addEventListener: (e: string, cb: () => void) => void; destroy: () => void } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
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

    let YT: any;
    let player: any;
    let progressInterval: NodeJS.Timeout;

    const onReady = () => {
      setVideoReady(true);
      if (coverRef.current) coverRef.current.classList.add("is-hidden");
      progressInterval = setInterval(() => {
        if (player && player.getCurrentTime) {
          const cur = player.getCurrentTime();
          const dur = player.getDuration();
          if (dur > 0) {
            const pct = (cur / dur) * 100;
            setProgress(pct);
            progressRef.current = pct;
          }
        }
      }, 500);
    };

    (window as any).onYouTubeIframeAPIReady = () => {
      YT = (window as any).YT;
      player = new YT.Player("videoFrame", {
        height: "100%",
        width: "100%",
        videoId: "nRmNR13u0-g",
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1, controls: 1, autoplay: 0 },
        events: { onReady, onStateChange: (e: any) => {
          if (e.data === YT.PlayerState.ENDED && coverRef.current) {
            coverRef.current.classList.remove("is-hidden");
          }
        }}
      });
      playerRef.current = player;
    };

    return () => {
      if (player && player.destroy) player.destroy();
      if (progressInterval) clearInterval(progressInterval);
    };
  }, []);

  const changeSpeed = useCallback((s: number) => {
    setSpeed(s);
    const p = playerRef.current;
    if (p) (p as any).setPlaybackRate(s);
  }, []);

  const playVideo = useCallback(() => {
    const p = playerRef.current;
    if (p && (p as any).playVideo) {
      (p as any).playVideo();
      if (coverRef.current) coverRef.current.classList.add("is-hidden");
      if (wrapperRef.current) wrapperRef.current.classList.add("is-playing");
    }
  }, []);

  const bn = (en: string, bn: string) => bn;

  return (
    <>
      <div className="max-w-[1120px] mx-auto px-3 pt-4 pb-20 md:px-5 md:pb-24">
        <div className="text-center mb-3">
          <div className="text-[28px] md:text-[38px] font-black leading-[1.15]">
            <span className="text-[#1E3A8A]">Jobayer Group</span>
            <span className="block text-lg md:text-[22px] opacity-70 font-bold">Career</span>
          </div>
        </div>

        <div className="max-w-[980px] mx-auto mt-3 p-4 md:p-7 rounded-[20px] md:rounded-[24px] bg-white border border-[#E2E8F0] shadow-[0_18px_50px_rgba(0,0,0,.08)] text-center">
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(29,78,216,.12)] border border-[rgba(29,78,216,.15)] font-extrabold text-sm text-[#1D4ED8]">
              <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse" />
              <span id="liveCount">৮৬৬+</span> সক্রিয় শিক্ষার্থী
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(29,78,216,.1)] border border-[rgba(29,78,216,.2)] font-extrabold text-sm text-[#1D4ED8]">
              ⏰ শেষ হতে <span className="tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2.5 mb-3.5 rounded-full bg-[rgba(29,78,216,.08)] border border-[rgba(29,78,216,.15)] font-extrabold text-sm md:text-base text-[#1E3A8A]">
            💰 সরাসরি কাজ শিখে প্রথম মাসেই <span className="text-[#FFBF00]">১১,০০০</span> থেকে <span className="text-[#FFBF00]">৯২,০০০</span> টাকা পর্যন্ত উপার্জনের বাস্তবমুখী সুযোগ!
          </div>

          <h1 className="text-[23px] md:text-[36px] font-black leading-[1.35] md:leading-[1.3] text-[#1E3A8A] mx-auto max-w-[820px] mb-2">
            ⏳ শেষবারের মতো অফার: ১০ লক্ষ টাকার ২৩০+ কোর্স আজ মাত্র ৯৯ টাকায়!
          </h1>

          <h3 className="text-[17px] md:text-[22px] font-black text-[#1E3A8A] leading-[1.45] max-w-[820px] mx-auto mb-3 px-2">
            আগামী ২৪ ঘণ্টা পর দাম বেড়ে হবে ১,৪৯৯ টাকা। এই মুহূর্তে যুক্ত হলে পাচ্ছেন দেশের সেরা ১২ জন প্রশিক্ষকের ২৩০টির বেশি কোর্স — আজীবনের জন্য। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।
          </h3>

          <div className="max-w-[820px] mx-auto p-[14px_14px_12px] md:p-[18px_18px_14px] rounded-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(234,88,12,.06),rgba(29,78,216,.04))] border border-[#E2E8F0] text-left">
            <p className="text-center text-sm md:text-base font-bold text-[#64748B] mb-3">
              ▶️ <strong>২ মিনিটের ভিডিও দেখুন</strong> — নতুন ডিজিটাল পেশা শুরু করুন
            </p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                ["🏆", "২৩০+ প্রিমিয়াম কোর্স"],
                ["💰", "লাইভ আয়ের প্রমাণ"],
                ["💳", "বাস্তব পেমেন্ট প্রমাণ"],
                ["🛡️", "২৪ ঘণ্টা টাকা ফেরত"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-1.5 p-[8px_10px] rounded-[10px] bg-white border border-[#E2E8F0] text-xs md:text-sm font-bold text-[#1E293B] leading-[1.3]">
                  {icon} {text}
                </div>
              ))}
            </div>
            <p className="text-center text-xs md:text-sm font-bold text-[#64748B]">
              👇 নিচে দেখুন: কে কত টাকা আয় করছে, পেমেন্টের ছবি, প্রশিক্ষকদের তালিকা, কোর্সের বিবরণ, আর যারা কাজ করছেন তাদের মতামত
            </p>
          </div>

          <div className="text-center max-w-[820px] mx-auto my-3 px-4 py-3 rounded-[12px] bg-[rgba(29,78,216,.08)] border border-[rgba(29,78,216,.2)] text-xs md:text-sm font-bold text-[#1E293B] leading-[1.65]">
            📊 <strong>১০ লক্ষ টাকার কোর্স মাত্র ৯৯ টাকায়!</strong> কোর্স পছন্দ না হলে ২৪ ঘণ্টার মধ্যে টাকা ফেরত — আপনার কোনো ঝুঁকি নেই, শুধু লাভ!
          </div>

          <div ref={wrapperRef} className="relative mt-6 rounded-[18px] overflow-hidden bg-white border border-[#E2E8F0] shadow-[0_18px_50px_rgba(0,0,0,.08)]">
            <div id="videoFrame" className="w-full aspect-video max-h-[430px] md:max-h-[550px]" />

            <div ref={coverRef} className="videoCover absolute inset-0 z-[9] flex items-center justify-center p-5 cursor-pointer" onClick={playVideo} style={{ background: "linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.12)),url('https://img.youtube.com/vi/nRmNR13u0-g/maxresdefault.jpg') center/cover no-repeat" }}>
              <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#FF6B35] text-white text-[32px] font-black flex items-center justify-center cursor-pointer shadow-[0_8px_24px_rgba(29,78,216,.15)] hover:scale-105 transition-transform">
                ▶
              </div>
            </div>

            <div className="speed-controls absolute top-3 right-3 z-[12] flex gap-1 p-1 rounded-lg bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity">
              {[1, 1.5, 2].map((s) => (
                <button key={s} onClick={() => changeSpeed(s)} className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer transition-all ${speed === s ? "bg-[rgba(29,78,216,.75)] text-white" : "bg-transparent text-white/60 hover:bg-white/10"}`}>
                  {s}×
                </button>
              ))}
            </div>

            <div className="absolute left-0 right-0 bottom-0 z-[11] h-[7px] bg-black/10">
              <span className="block h-full bg-gradient-to-r from-[#1D4ED8] to-[#FF6B35] transition-[width_0.25s_ease]" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <Link href="#courses" scroll={false} onClick={(e) => { e.preventDefault(); document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }); }} className="flex justify-center items-center w-full max-w-[500px] min-h-[56px] px-6 py-4 mx-auto mt-5 rounded-[16px] bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white no-underline text-lg font-bold leading-[1.4] cursor-pointer shadow-[0_16px_32px_rgba(234,88,12,.35)] hover:-translate-y-0.5 hover:saturate-[1.08] hover:shadow-[0_20px_40px_rgba(234,88,12,.4)] transition-all text-center tracking-[0.3px] animate-pulse">
            🔥 হ্যাঁ, দাম বাড়ার আগে মাত্র ৯৯ টাকায় আজীবন অ্যাক্সেস নিন →
          </Link>
          <p className="text-center text-xs md:text-sm font-bold text-[#64748B] max-w-[500px] mx-auto mt-3 leading-[1.6]">
            কোর্স ও আয়ের প্রজেক্ট পছন্দ না হলে ৭ দিনের মধ্যে কোনো প্রশ্ন ছাড়াই ৯৯ টাকা ১০০% ফেরত পাবেন।
          </p>
        </div>
      </div>

      <style jsx>{`
        .videoCover.is-hidden { display: none; }
        #videoWrapper:hover .speed-controls,
        #videoWrapper.is-playing .speed-controls { opacity: 1; }
      `}</style>
    </>
  );
}

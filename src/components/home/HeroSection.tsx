"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function toBn(v: number | string) {
  return String(v).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d, 10)]);
}

export default function HeroSection() {
  const [liveCount, setLiveCount] = useState(866);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const playerRef = useRef<any>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);

    let player: any;
    let progressInterval: NodeJS.Timeout;

    const onReady = () => {
      if (coverRef.current) coverRef.current.classList.add("is-hidden");
      progressInterval = setInterval(() => {
        if (player?.getCurrentTime) {
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
            }
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

  useEffect(() => {
    setLiveCount(866);
    const id = setInterval(() => setLiveCount((p) => p + Math.floor(Math.random() * 3) + 1), 15000);
    return () => clearInterval(id);
  }, []);

  const playVideo = () => {
    const p = playerRef.current;
    if (p?.playVideo) {
      p.playVideo();
      if (coverRef.current) coverRef.current.classList.add("is-hidden");
      if (wrapperRef.current) wrapperRef.current.classList.add("is-playing");
    }
  };

  const setSpeed = (speed: number) => {
    setPlaybackRate(speed);
    const p = playerRef.current;
    if (p?.setPlaybackRate) p.setPlaybackRate(speed);
  };

  const speedBtnClass = (speed: number) =>
    `px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer border-none transition-all font-inherit ${playbackRate === speed ? "bg-[rgba(29,78,216,.75)] text-white" : "text-white/60 hover:text-white hover:bg-[rgba(255,255,255,.12)]"}`;

  return (
    <>
      <div className="text-center pt-5 pb-1">
        <div className="text-[28px] md:text-[38px] font-black leading-[1.15]">
          <span className="text-[#1E3A8A]">Jobayer Group</span>
          <span className="block text-lg md:text-[18px] opacity-70 font-bold">Career</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1121] via-[#111B33] to-[#0F1A2E]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2563EB]/10 blur-[120px] animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#F59E0B]/10 blur-[100px] animate-blob" style={{ animationDelay: "-3s" }} />
          <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-[#10B981]/10 blur-[80px] animate-blob" style={{ animationDelay: "-6s" }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16 md:pt-10 md:pb-24">
          <div className="text-center animate-fade-up">
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                {toBn(liveCount)}+ সক্রিয় শিক্ষার্থী
              </span>
            </div>

            <div className="inline-flex gap-2 px-4 py-2.5 mx-auto mb-3.5 rounded-full bg-[rgba(30,58,138,.08)] border border-[rgba(30,58,138,.2)] font-extrabold text-sm text-[#1E3A8A]">
              💰 সরাসরি কাজ শিখে প্রথম মাসেই <span className="text-[#FFBF00] font-black">১১,০০০</span> থেকে <span className="text-[#FFBF00] font-black">৯২,০০০</span> টাকা পর্যন্ত উপার্জনের বাস্তবমুখী সুযোগ!
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-4">
              <span className="text-white">আপনার ক্যারিয়ার শুরু হোক আজই!</span>
              <br />
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#F59E0B] bg-clip-text text-transparent">
                ১০ লক্ষ টাকার ২৩০+ কোর্স
              </span>
              <br />
              <span className="text-white">সবকিছু একসাথে — আপনার জন্য!</span>
            </h1>

            <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto mb-6 leading-relaxed">
              দেশের সেরা ১২ জন প্রশিক্ষকের ২৩০টির বেশি কোর্স — আজীবনের জন্য। পছন্দ না হলে ২৪ ঘণ্টায় টাকা ফেরত।
            </p>

            <div className="max-w-[820px] mx-auto mb-5 p-3.5 rounded-[20px] bg-[linear-gradient(135deg,rgba(29,78,216,.06),rgba(234,88,12,.06),rgba(29,78,216,.04))] border border-[rgba(255,255,255,.1)] text-left">
              <p className="text-center text-white font-extrabold text-sm mb-2.5 m-0">
                ▶️ <strong>২ মিনিটের ভিডিও দেখুন</strong> — নতুন ডিজিটাল পেশা শুরু করুন
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-[10px] bg-white/10 border border-white/15 text-white text-[11px] font-bold leading-[1.3]">
                  <span>🏆</span> ২৩০+ প্রিমিয়াম কোর্স (উপহার)
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-[10px] bg-white/10 border border-white/15 text-white text-[11px] font-bold leading-[1.3]">
                  <span>💰</span> লাইভ আয়ের প্রমাণ
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-[10px] bg-white/10 border border-white/15 text-white text-[11px] font-bold leading-[1.3]">
                  <span>💳</span> বাস্তব পেমেন্ট প্রমাণ
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-[10px] bg-white/10 border border-white/15 text-white text-[11px] font-bold leading-[1.3]">
                  <span>🛡️</span> ২৪ ঘণ্টা টাকা ফেরত গ্যারান্টি
                </div>
              </div>
              <p className="text-center text-white/70 text-xs font-bold mt-2.5 m-0">
                👇 নিচে দেখুন: কে কত টাকা আয় করছে, পেমেন্টের ছবি, প্রশিক্ষকদের তালিকা, কোর্সের বিবরণ, আর যারা কাজ করছেন তাদের মতামত
              </p>
            </div>
          </div>

          <div ref={wrapperRef} className="relative mt-6 max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black/40 border border-white/10">
            <div id="heroVideoFrame" className="w-full aspect-video" />
            <div className="absolute top-3 right-3 z-[12] flex gap-1 p-1 rounded-lg bg-[rgba(0,0,0,.65)]">
              {[1, 1.5, 2].map((s) => (
                <button key={s} onClick={() => setSpeed(s)} className={speedBtnClass(s)} onMouseDown={(e) => e.stopPropagation()}>{s}×</button>
              ))}
            </div>
            <div ref={coverRef} className="absolute inset-0 z-[9] flex items-center justify-center cursor-pointer" onClick={playVideo}
              style={{ background: "linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.12)),url('https://img.youtube.com/vi/nRmNR13u0-g/maxresdefault.jpg') center/cover no-repeat" }}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white text-3xl shadow-xl hover:scale-105 transition-transform">▶</div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <span className="block h-full bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#F59E0B] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <Link href="/register" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85D2C] text-white font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 animate-pulse mt-6">
            🚀 আপনার অ্যাকাউন্ট খুলুন এখনই →
          </Link>

          <p className="text-sm text-white/60 mt-3 font-medium max-w-[500px] mx-auto">
            কোর্স ও আয়ের প্রজেক্ট পছন্দ না হলে ৭ দিনের মধ্যে কোনো প্রশ্ন ছাড়াই ১০০% টাকা ফেরত পাবেন।
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
      </section>
    </>
  );
}

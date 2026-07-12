"use client";

import { useEffect, useRef } from "react";

const bdDistricts = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "সিলেট", "বরিশাল", "রংপুর",
  "ময়মনসিংহ", "কুমিল্লা", "নরসিংদী", "গাজীপুর", "নারায়ণগঞ্জ", "টাঙ্গাইল",
  "ফরিদপুর", "বগুড়া", "দিনাজপুর", "পাবনা", "কুষ্টিয়া", "যশোর", "কক্সবাজার",
];

const names = [
  "সাকিব আহমেদ", "নাজনীন আক্তার", "করিম মিয়া", "সাদিয়া ইসলাম",
  "রাজিব হাসান", "ফারহানা ইয়াসমিন", "মো. সাজিদ হোসেন", "তানিয়া বেগম",
  "রবিউল আলম", "নুসরাত জাহান", "আরিফুল ইসলাম", "তামান্না হাসান",
  "মর্জিনা খাতুন", "শামীমা আক্তার", "ফারিয়া ইসলাম",
];

export default function LiveNotificationBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const queueRef = useRef<string[]>([]);
  const playingRef = useRef(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const showNext = () => {
      if (!queueRef.current.length) { playingRef.current = false; bar.classList.remove("show"); return; }
      playingRef.current = true;
      const msg = queueRef.current.shift()!;
      bar.innerHTML = `<span style="flex-shrink:0;font-size:16px">🎉</span><span style="font-weight:700;font-size:13px;line-height:1.4">${msg}</span>`;
      bar.classList.add("show");
      bar.style.display = "flex";
      setTimeout(() => {
        bar.classList.remove("show");
        setTimeout(() => { if (!queueRef.current.length) bar.style.display = "none"; showNext(); }, 800);
      }, 4000);
    };

    const addNotif = (isLatest = false) => {
      const name = names[Math.floor(Math.random() * names.length)];
      const district = bdDistricts[Math.floor(Math.random() * bdDistricts.length)];
      const msg = `${name}, ${district} থেকে সদ্য যুক্ত হলেন!`;
      if (isLatest) queueRef.current.unshift(msg);
      else queueRef.current.push(msg);
      if (!playingRef.current) showNext();
    };

    addNotif(true);
    const interval = setInterval(() => addNotif(), 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={barRef}
      className="live-notif-bar fixed bottom-[72px] left-1/2 -translate-x-1/2 z-[9999] max-w-[94vw] md:max-w-[560px] px-4 py-3 rounded-[14px] bg-white border border-[#E2E8F0] shadow-[0_16px_40px_rgba(0,0,0,.12)] items-center gap-2.5 opacity-0 translate-y-[120%] transition-all duration-400"
      style={{ display: "none", backdropFilter: "blur(12px)" }}
    />
  );
}

"use client";
import { WandSparklesIcon, UploadCloudIcon, VideoIcon, SparklesIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import { UploadIcon } from "@/components/ui/upload-icon";

import Demosection from "@/components/Demosection";
import PageHeader from "@/components/PageHeader";
import UploadFile from "@/components/UploadFile";
export default function Home() {
  
    
  return (
    
    <div className="min-h-screen flex flex-col">

      <PageHeader />

      {/* Hero */}
      <section className="text-center pt-20 pb-14 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
          <SparklesIcon className="w-3 h-3" />
          AI-powered captions in seconds
        </div>
        <h1
          className="text-5xl font-semibold text-white leading-tight tracking-tight mb-4"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Captions that actually<br />
          <span className="text-emerald-400">sound like you</span>
        </h1>
        <p className="text-white/50 text-lg max-w-md mx-auto  my-0 leading-relaxed">
          Upload any video and get accurate, styled captions burned in automatically — no editing required.
        </p>
      </section>
      <Demosection />
    </div>
  );
}
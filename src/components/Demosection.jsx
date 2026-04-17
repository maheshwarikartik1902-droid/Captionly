import React from 'react'
import { WandSparklesIcon, UploadCloudIcon, VideoIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import { UploadIcon } from "@/components/ui/upload-icon";


const Demosection = () => {
    return (
        < section className = "flex-1 pb-20" >
            <div className="flex items-start justify-center gap-20">

                {/* Upload Panel */}
                <div className="group w-56 shrink-0">
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-3 font-medium">Input</p>
                    <div className="relative rounded-2xl border-2 border-dashed border-white/10 bg-white/3 hover:border-emerald-500/40 hover:bg-emerald-500/3 transition-all duration-300 cursor-pointer overflow-hidden"
                        style={{ aspectRatio: "9/16", maxHeight: "420px" }}>
                        {/* Subtle grid bg */}
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                                backgroundSize: "24px 24px"
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
                                <UploadIcon className="w-6 h-6 text-white/30 group-hover:text-emerald-400 transition-colors duration-300" />
                            </div>
                            <div className="text-center">
                                <p className="text-white/60 text-sm font-medium mb-1">Drop your video here</p>
                                <p className="text-white/25 text-xs">MP4, MOV, WebM · up to 500MB</p>
                            </div>
                            <button className="mt-1 px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-emerald-900/40">
                                <UploadCloudIcon className="w-4 h-4" />
                                Choose file
                            </button>
                        </div>
                    </div>
                </div>

                {/* Arrow / Generate */}
                <div className="flex flex-col items-center justify-center gap-3 pt-10 self-center">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <WandSparklesIcon className="w-4 h-4 text-white/40" />
                    </div>
                    <button
                        disabled
                        className="px-5 py-2.5 rounded-full bg-emerald-700/40 text-emerald-400/60 text-xs font-semibold border border-emerald-500/20 cursor-not-allowed whitespace-nowrap"
                    >
                        Generate
                    </button>
                    <div className="flex items-center gap-1 text-white/15 text-xs">
                        <ChevronRightIcon className="w-3 h-3" />
                    </div>
                </div>

                {/* Output Panel */}
                <div className="w-56 shrink-0">
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-3 font-medium">Output</p>
                    <div className="rounded-2xl border border-white/5 bg-white/3 overflow-hidden relative"
                        style={{ aspectRatio: "9/16", maxHeight: "420px" }}>
                        {/* Placeholder shimmer */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <VideoIcon className="w-8 h-8 text-white/10" />
                            <p className="text-white/20 text-xs">Output preview</p>
                        </div>
                        {/* Caption overlay preview */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                            <div className="px-4 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg border border-white/5">
                                <p className="text-white/20 text-sm font-medium text-center">captions appear here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    {/* Settings Strip }
        <div className="mt-8 p-4 rounded-2xl bg-white/3 border border-white/5 flex flex-wrap items-center gap-4">
          <span className="text-xs text-white/30 uppercase tracking-widest font-medium">Style</span>
          {["Minimal", "Bold", "Outline", "Highlight", "Custom"].map((s, i) => (
            <button key={s}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${i === 0
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                  : "bg-white/5 border border-white/5 text-white/40 hover:border-white/15 hover:text-white/60"
                }`}>
              {s}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3 text-xs text-white/30">
            <span>Language</span>
            <select className="bg-white/5 border border-white/5 rounded-lg px-2.5 py-1.5 text-white/50 text-xs outline-none cursor-pointer hover:border-white/15 transition-colors">
              <option>Auto detect</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>*/}
      </section >
  )
}

export default Demosection
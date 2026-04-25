"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { WandSparklesIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import CaptionEditor from "@/components/TranscriptionItem";
import PageHeader from "@/components/PageHeader";
import ResultVideo from "@/components/ResultVideo";


function GeneratePage() {
    const searchParams = useSearchParams();
    const videoUrl = searchParams.get("url");

    const [captions, setCaptions] = useState([]);
    const [status, setStatus] = useState("idle");

    async function transcribe() {
        if (!videoUrl || status === "loading") return;
        setStatus("loading");
        toast.loading("Transcribing...", { id: "transcribe", position: "top-center" });
        try {
            const res = await fetch("/api/transcribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setCaptions(data.captions);
            setStatus("done");
            toast.success("Captions ready!", { id: "transcribe", position: "top-center" });
        } catch (err) {
            console.error(err);
            setStatus("error");
            toast.error("Transcription failed.", { id: "transcribe", position: "top-center" });
        }
    }

    return (
        <>
            <PageHeader />
            <div className="min-h-screen py-5">

                {/* Two-column layout */}
                <div className="grid grid-cols-2 gap-8 items-start">


                    {/* Right — captions editor */}
                    <div className="flex flex-col gap-3 min-h-125">
                        <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Captions</p>

                        {status === "idle" && (
                            <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 h-64">
                                <p className="text-white/20 text-sm">Hit generate to start</p>
                            </div>
                        )}

                        {status === "loading" && (
                            <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 h-64">
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2Icon className="w-6 h-6 text-emerald-500 animate-spin" />
                                    <p className="text-white/30 text-sm">Transcribing audio...</p>
                                </div>
                            </div>
                        )}

                        {status === "error" && (
                            <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-red-500/20 bg-red-500/5 h-64">
                                <p className="text-red-400 text-sm">Transcription failed — try again</p>
                            </div>
                        )}

                        {status === "done" && (
                            <CaptionEditor captions={captions} onUpdate={setCaptions}/>
                        )}
                    </div>
                    {/* Left — video + button */}
                    <ResultVideo videoUrl={videoUrl} transcribe={transcribe} status={status} captions={captions}/>
                </div>
            </div>
        </>
    );
}

// Suspense required for useSearchParams in App Router
export default function Page() {
    return (
        <Suspense fallback={null}>
            <GeneratePage />
        </Suspense>
    );
}
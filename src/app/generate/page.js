"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { WandSparklesIcon } from "lucide-react";


export default function GeneratePage() {
    const searchParams = useSearchParams();
    const videoUrl = searchParams.get("url");

    const [captions, setCaptions] = useState([]);
    const [status, setStatus] = useState("idle");

    async function transcribe() {
        if (!videoUrl || status === "loading") return;
        setStatus("loading");
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
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    }

    return (
        <div className="p-8 flex flex-row items-center justify-center max-w-2xl mx-auto">
            {/* Video preview */}
            <video
                src={videoUrl ?? ""}
                controls
                className="w-full rounded-2xl mb-6 bg-black"
            />

            {/* Trigger button */}
            <button
                onClick={transcribe}
                disabled={status === "loading"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors"
            >
                <WandSparklesIcon className="w-4 h-4" />
                {status === "loading" ? "Transcribing..." : "Generate Captions"}
            </button>

            {status === "error" && (
                <p className="mt-4 text-red-400 text-sm">
                    Transcription failed — check console for details.
                </p>
            )}

            {/* Caption list */}
            {status === "done" && captions.length > 0 && (
                <ul className="mt-6 space-y-2">
                    {captions.map((c, i) => (
                        <li key={i} className="flex gap-4 text-sm">
                            <span className="text-white/30 w-24 shrink-0 tabular-nums">
                                {c.start.toFixed(1)}s – {c.end.toFixed(1)}s
                            </span>
                            <span className="text-white/70">{c.text}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
 
"use client";
import { useEffect, useRef, useState } from "react";
import { WandSparklesIcon, Loader2Icon, DownloadIcon } from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const ResultVideo = ({ videoUrl, transcribe, status, captions, captionStyle }) => {
    const [loaded, setLoaded] = useState(false);
    const [transcoding, setTranscoding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [outputUrl, setOutputUrl] = useState(null);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);
    const messageRef = useRef(null);
    const searchParams = useSearchParams();
    const videoname = searchParams.get("name")?.split("-")[1] ?? "input.mp4";


    const marginV = captionStyle.position === "top" ? 90 : captionStyle.position === "middle" ? 50 : 20;

    const toFFmpegColor = (hex) => {
        const r = hex.slice(1, 3);
        const g = hex.slice(3, 5);
        const b = hex.slice(5, 7);
        return `&H00${b}${g}${r}`.toUpperCase();
    };

    const forceStyle = [
        `FontName=Roboto`,
        `FontSize=${captionStyle.fontSize}`,
        `Bold=${captionStyle.bold ? 1 : 0}`,
        `PrimaryColour=${toFFmpegColor(captionStyle.primaryColor)}`,
        `OutlineColour=${toFFmpegColor(captionStyle.outlineColor)}`,
        `BorderStyle=${captionStyle.box ? 3 : 1}`,
        `MarginV=${marginV}`,
    ].join(",");

    useEffect(() => {
        if (videoUrl) {
            videoRef.current.src = videoUrl;
            load();
        }
    }, []);

    const load = async () => {
        const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd";
        const ffmpeg = ffmpegRef.current;

        // Single listener registered once here
        ffmpeg.on("log", ({ message }) => {
            if (messageRef.current) messageRef.current.innerHTML = message;
            const match = /time=([0-9:.]+)/.exec(message);
            if (match && videoRef.current?.duration) {
                const [h, m, s] = match[1].split(":");
                const current = parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s); 
                setProgress(current / videoRef.current.duration);
            }
        });

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        });
        setLoaded(true);
    };

    const captionsToSrt = (captions) => {
        let srt = "";
        captions.forEach((caption, index) => {
            srt += `${index + 1}\n`;
            srt += `${new Date(caption.start * 1000).toISOString().substr(11, 12).replace(".", ",")} --> ${new Date(caption.end * 1000).toISOString().substr(11, 12).replace(".", ",")}\n`;
            srt += `${caption.text}\n\n`;
        });
        return srt;
    };

    function getStatusText(progress) {
        if (progress < 0.1) return "Warming things up...";
        if (progress < 0.25) return "Loading magic...";
        if (progress < 0.4) return "Analyzing frames...";
        if (progress < 0.6) return "Cooking pixels...";
        if (progress < 0.8) return "Almost there...";
        if (progress < 0.95) return "Polishing output...";
        return "Finishing touches...";
    }

    const transcode = async () => {
        if (transcoding || !loaded) return; 
        setTranscoding(true);
        setProgress(0);
        try {
            const ffmpeg = ffmpegRef.current;
            await ffmpeg.writeFile(videoname, await fetchFile(videoUrl));

            const processedCaptions = captionStyle.uppercase
                ? captions.map(c => ({ ...c, text: c.text.toUpperCase() }))
                : captions;

            await ffmpeg.writeFile("subtitle.srt", captionsToSrt(processedCaptions));
            await ffmpeg.writeFile("font.ttf", await fetchFile("/fonts/Roboto-Regular.ttf"));

            await ffmpeg.exec([
                "-i", videoname,
                "-vf", `subtitles=subtitle.srt:fontsdir=/:force_style='${forceStyle}'`,
                "-preset", "ultrafast",
                "output.mp4",
            ]);

            setProgress(1); 
            const data = await ffmpeg.readFile("output.mp4");
            videoRef.current.src = URL.createObjectURL(
                new Blob([data.buffer], { type: "video/mp4" })
            );
            setOutputUrl(videoRef.current.src);
        } catch (err) {
            console.error("Transcode failed:", err);
            setProgress(0); 
        } finally {
            setTranscoding(false); 
        }
    };

    return (
        <div className="flex flex-col gap-4 sticky top-10">
            <p ref={messageRef} className="text-white/20 text-xs truncate min-h-4 hidden" />
            <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Preview</p>

           
            <div className="relative">
                {transcoding && progress > 0 && progress < 1 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl z-10">
                        <div className="w-4/5 max-w-md flex flex-col gap-2">
                            <span className="text-white/80 text-sm animate-pulse text-center">
                                {getStatusText(progress)}
                            </span>
                            <Progress value={progress * 100} className="w-full" />
                        </div>
                    </div>
                )}
                <video
                    ref={videoRef}
                    controls
                    className="h-96 w-full rounded-2xl bg-black border border-white/5"
                />
            </div>

            <div className="flex flex-row gap-2">
                {outputUrl && (
                    <a
                        href={outputUrl}
                        download="captioned-video.mp4"
                        className="flex items-center justify-center gap-2 px-2 py-1 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium transition-colors w-full"
                    >
                        <DownloadIcon className="w-4 h-4" />
                        Download
                    </a>
                )}
                <button
                    onClick={transcribe}
                    disabled={status === "loading" || transcoding}
                    className="flex items-center justify-center gap-2 px-2 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors w-full"
                >
                    {status === "loading"
                        ? <><Loader2Icon className="w-4 h-4 animate-spin" /> Transcribing...</>
                        : <><WandSparklesIcon className="w-4 h-4" /> Generate Captions</>
                    }
                </button>

                <button
                    onClick={transcode}
                    disabled={status === "loading" || transcoding || !loaded || captions.length === 0}
                    className="flex items-center justify-center gap-2 px-2 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors w-full"
                >
                    {transcoding
                        ? <><Loader2Icon className="w-4 h-4 animate-spin" /> Applying captions...</>
                        : <><WandSparklesIcon className="w-4 h-4" /> Apply captions</>
                    }
                </button>
            </div>
        </div>
    );
};

export default ResultVideo;
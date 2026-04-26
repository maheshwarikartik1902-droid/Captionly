"use client";
import React, { useEffect } from 'react'
import { WandSparklesIcon, Loader2Icon } from 'lucide-react'
import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { useSearchParams } from "next/navigation";

const ResultVideo = ({ videoUrl, transcribe, status, captions }) => {
    const [loaded, setLoaded] = useState(false);
    const [transcoding, setTranscoding] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);
    const searchParams = useSearchParams();
    const videoname = searchParams.get("name").split('-')[1];
    const messageRef = useRef(null);
    useEffect(() => {
        if (videoUrl) {
            videoRef.current.src = videoUrl;
            load();
        };
    }, []);

    const load = async () => {
        const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd'
        const ffmpeg = ffmpegRef.current;
        ffmpeg.on('log', ({ message }) => {
            messageRef.current.innerHTML = message;
            console.log(message);
        });
        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setLoaded(true);
    }

    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.writeFile(videoname, await fetchFile(videoUrl));
        await ffmpeg.writeFile('subtitle.srt', captionsToSrt(captions));
        await ffmpeg.writeFile("font.ttf", await fetchFile("/fonts/Roboto-Regular.ttf"));


        // The exec should stop after 1 second.
        await ffmpeg.exec([
            "-i", videoname,
            "-vf", "subtitles=subtitle.srt:fontsdir=/:force_style='FontName=Roboto",  // look for fonts in root
            "-preset", "ultrafast",
            "output.mp4"
        ]);
        const data = await ffmpeg.readFile('output.mp4');
        videoRef.current.src =
            URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    }


    const captionsToSrt = (captions) => {
        let srt = "";
        captions.forEach((caption, index) => {
            srt += `${index + 1}\n`;
            //convert time to HH:MM:SS,MMMM
            srt += `${new Date(caption.start * 1000).toISOString().substr(11, 12).replace('.', ',')} --> ${new Date(caption.end * 1000).toISOString().substr(11, 12).replace('.', ',')}\n`;
            srt += `${caption.text}\n\n`;
        });
        return srt;
    }

    console.log(captionsToSrt(captions));
    return (
        <div className="flex flex-col gap-4 sticky top-10">
            <p ref={messageRef} className="text-white/20 text-xs truncate min-h-4" />
            <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Preview</p>
            <video
                ref={videoRef}
                controls
                className="h-96 rounded-2xl bg-black border border-white/5"
            />
            <div className="flex flex-row gap-2">
                <button
                    onClick={transcribe}
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 px-2 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors w-full"
                >
                    {status === "loading"
                        ? <><Loader2Icon className="w-4 h-4 animate-spin" /> Transcribing...</>
                        : <><WandSparklesIcon className="w-4 h-4" /> Generate Captions</>
                    }
                </button>
                <button
                    onClick={transcode}
                    disabled={status === ("loading" || "transcoding")}
                    className="flex items-center justify-center gap-2 px-2 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors w-full"
                >
                    {status === ("loading" || "transcoding")
                        ? <><Loader2Icon className="w-4 h-4 animate-spin" /> Putting captions...</>
                        : <><WandSparklesIcon className="w-4 h-4" /> Apply captions</>
                    }
                </button>
            </div>
        </div>
    )
}

export default ResultVideo
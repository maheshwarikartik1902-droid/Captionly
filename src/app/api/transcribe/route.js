import fs from "fs";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    try {
        const { videoUrl } = await req.json();

        if (!videoUrl) {
            return NextResponse.json({ error: "No video URL provided" }, { status: 400 });
        }

        const transcription = await groq.audio.transcriptions.create({
            url: videoUrl, // Required path to audio file - replace with your audio file!
            model: "whisper-large-v3-turbo", // Required model to use for transcription
            prompt: "Specify context or spelling", // Optional
            response_format: "verbose_json", // Optional
            timestamp_granularities: ["word", "segment"], // Optional (must set response_format to "json" to use and can specify "word", "segment" (default), or both)
            language: "en", // Optional
            temperature: 0.0, // Optional
        });
        const captions = transcription.segments?.map((seg) => ({
            start: seg.start,
            end: seg.end,
            text: seg.text.trim(),
        })) ?? [];

        return NextResponse.json({ staus: 200, captions});

    } catch (error) {

        console.error("Transcription error:", error);
        return NextResponse.json(
            { error: error.message ?? "Transcription failed" },
            { status: 500 }
        );
    }
}
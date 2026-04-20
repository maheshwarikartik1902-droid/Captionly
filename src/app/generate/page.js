"use client";
import { useSearchParams } from 'next/navigation';

export default function GeneratePage() {
    const searchParams = useSearchParams();
    const videoUrl = searchParams.get('url'); // gets the full uploadthing URL

    console.log(videoUrl); // https://uploadthing.com/f/a3f2c1d4-xxxx.mp4

    return (
        <div>
            <video src={videoUrl} controls />
        </div>
    )
}
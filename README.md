# Captionly — AI Video Caption Generator

> Upload a video. Get captions. Download the result. 

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)
![Groq](https://img.shields.io/badge/Groq-Whisper-orange?style=flat-square)
![Uploadthing](https://img.shields.io/badge/Uploadthing-Storage-red?style=flat-square)

---

## 1. What is Captionly?

Captionly is an AI-powered video captioning app built with Next.js. Users upload a video, Groq Whisper transcribes it, they can edit the captions, and the final video is downloaded with captions burned in — entirely in the browser using FFmpeg WebAssembly. No server-side video processing. No hidden costs.

---

## 2. Features

-  **Drag & drop video upload** — supports MP4, MOV, WebM
-  **Instant local preview** — see your video before it uploads
-  **AI transcription** — powered by Groq Whisper (`whisper-large-v3-turbo`)
-  **Editable captions** — tweak any caption line before applying
-  **Client-side caption burning** — FFmpeg WASM runs entirely in the browser
-  **Download ready** — get your captioned video with one click
-  **Privacy-first** — videos processed in your browser, not on a server
-  **Dark mode** — sleek dark UI with emerald accents

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| File Storage | Uploadthing |
| AI Transcription | Groq Whisper API |
| Video Processing | FFmpeg WebAssembly |
| Drag & Drop | React Dropzone v15 |
| Notifications | Sonner |
| Icons | Lucide React |
| Fonts | Inter + Sora (Google Fonts) |
| Theme | next-themes |

---

## 4. How It Works

```
1. User drags or picks a video file
         ↓
2. Local preview shown instantly (no upload yet)
         ↓
3. User clicks "Generate Captions"
         ↓
4. File renamed to UUID → uploaded to Uploadthing CDN
         ↓
5. Redirected to /generate?url=...
         ↓
6. Groq Whisper API transcribes the video
         ↓
7. Captions shown in editable list with timestamps
         ↓
8. User edits captions if needed
         ↓
9. FFmpeg WASM burns captions into video (in-browser)
         ↓
10. Final video shown with download button
```

**Response:**
```json
{
  "status": 200,
  "captions": [
    { "start": 0.0, "end": 2.5, "text": "Hello everyone" },
    { "start": 2.5, "end": 5.0, "text": "Welcome to my video" }
  ]
}
```

---

## 5. Acknowledgements

- [Groq](https://groq.com) for blazing fast Whisper inference
- [Uploadthing](https://uploadthing.com) for dead simple file uploads
- [FFmpeg.wasm](https://ffmpegwasm.netlify.app) for in-browser video processing
- [shadcn/ui](https://ui.shadcn.com) for UI component inspiration

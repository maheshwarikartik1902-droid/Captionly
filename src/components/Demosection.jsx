"use client";
import uniqid from 'uniqid';
import React, { useState } from 'react'
import { WandSparklesIcon, UploadCloudIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";
import { UploadIcon } from "@/components/ui/upload-icon";
import { useUploadThing } from "@/utils/uploadThing";
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const Demosection = () => {

    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);


    const { startUpload } = useUploadThing("videoUploader", {
        onClientUploadComplete: (res) => {
            console.log("Uploaded URL:", res[0].ufsUrl);
        },

        onUploadError: (error) => {
            console.error(error);
        },
    });


    const handleGenerate = async () => {
        if (!file) return;
        try {
            setIsUploading(true);
            toast.loading("Uploading...", { id: "upload", position: "top-center" });

            const newname = uniqid('video-');
            const ext = file.name.split('.').pop();
            const newfile = new File([file], `${newname}.${ext}`, { type: file.type });

            const res = await startUpload([newfile]);
            const videoUrl = res[0].ufsUrl;

            toast.success("Done!", { id: "upload", position: "top-center" });
            router.push(`/generate?url=${encodeURIComponent(videoUrl)}&name=${newname}.${ext}`);

        } catch (error) {
            toast.error("Upload failed", { id: "upload", position: "top-center" });
            console.error(error);

        } finally {
            setIsUploading(false);
        }
    };

    
    const upload = async (e) => {
        e.preventDefault();
        console.log(e);
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            setPreview(URL.createObjectURL(file));
            setFile(file);
        }
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        disabled: isUploading,
        accept: {
            'video/mp4': ['.mp4'],
            'video/quicktime': ['.mov'],
            'video/webm': ['.webm']
        },
        onDrop: async (acceptedFiles) => {
            const files = Array.from(acceptedFiles);
            if (files.length > 0) {
                const file = files[0];
                setPreview(URL.createObjectURL(file));
                setFile(file);
            }
        }
    })

    return (

        <div className='flex flex-col items-center justify-center'>

            <label className={`mt-8 px-5 py-2 w-36 rounded-full bg-emerald-600 hover:bg-emerald-500 hover:scale-95 text-white text-sm font-medium transition-discrete transition-transform flex items-center gap-2 shadow-lg shadow-emerald-900/40 ${(!isUploading)
                                ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500 hover:scale-95 shadow-lg shadow-emerald-900/40"
                                : "bg-white/5 text-white/20 border-white/10 cursor-not-allowed"}`}>
                <UploadCloudIcon className="w-4 h-4" />
                Choose file
                <input
                    type="file"
                    onChange={upload}
                    className="hidden"
                    name="file-input"
                    id="file-input"
                    accept="video/*"
                    disabled={isUploading}
                />
            </label>


            <section className="flex-1 pb-20">



                <div className="flex items-start justify-center gap-20">
                    {(preview && file) ?
                        <div className="w-56 shrink-0">
                            <p className="text-xs text-white/30 uppercase tracking-widest mb-3 font-medium">Input</p>
                            <div className="relative rounded-2xl border-2 border-dashed flex items-center justify-center border-white/10 bg-white/3 hover:border-emerald-500/40 transition-all duration-300 overflow-hidden"
                                style={{ aspectRatio: "9/16", maxHeight: "420px" }}>
                                <video
                                    src={preview}
                                    controls
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>
                        :
                        <div className="group w-56 shrink-0" {...getRootProps()}>
                            <p className="text-xs text-white/30 uppercase tracking-widest mb-3 font-medium">Input</p>
                            <div className="w-56 relative rounded-2xl border-2 border-dashed border-white/10 bg-white/3 hover:border-emerald-500/40 hover:bg-emerald-500/3 transition-all duration-300 cursor-pointer overflow-hidden "
                                style={{ aspectRatio: "9/16", maxHeight: "420px" }}>
                                {/* Subtle grid bg */}
                                <input {...getInputProps()} />
                                <div className="absolute inset-0 opacity-10"
                                    style={{
                                        backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
                                        backgroundSize: "24px 24px"
                                    }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">

                                    <div className="text-center">
                                        {isDragActive ?
                                            <div>
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
                                                    <UploadIcon className="w-6 h-6 text-white/30 group-hover:text-emerald-400 transition-colors duration-300" />
                                                </div>

                                                <p className="text-white/60 text-sm font-medium mb-1">Drop your video here</p>
                                            </div>
                                            :
                                            <div>
                                                <UploadIcon className="w-6 h-6 text-white/30 group-hover:text-emerald-400 transition-colors duration-300" />
                                                <p className="text-white/60 text-sm font-medium mb-1">Click or Drop your video here</p>
                                                <p className="text-white/25 text-xs">MP4, MOV, WebM · up to 50MB</p>
                                            </div>

                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    }



                    {/* Arrow / Generate */}
                    <div className="flex flex-col items-center justify-center gap-4 self-center">
                        <button
                            onClick={handleGenerate}
                            disabled={!(file && !isUploading)}
                            className={`group relative px-8 py-3 rounded-full text-sm font-semibold border transition-all duration-300 flex items-center gap-2 ${(file && !isUploading)
                                ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500 hover:scale-95 shadow-lg shadow-emerald-900/40"
                                : "bg-white/5 text-white/20 border-white/10 cursor-not-allowed"
                                }`}
                        >
                            <WandSparklesIcon className={`w-4 h-4 transition-colors ${(file && !isUploading) ? "text-white" : "text-white/20"}`} />
                            Generate Captions
                            <ChevronRightIcon className={`w-4 h-4 transition-colors ${(file && !isUploading) ? "text-white" : "text-white/20"}`} />
                        </button>
                        {!file && (
                            <p className="text-white/20 text-xs">Upload a video to continue</p>
                        )}
                        {file && (
                            <p className="text-emerald-400/60 text-xs">{file.name}</p>
                        )}
                    </div>



                </div>

            </section >
        </div>
    )
}

export default Demosection
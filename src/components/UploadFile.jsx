"use client";

import React from 'react'
import { UploadCloudIcon } from 'lucide-react';
import axios from 'axios';


const UploadFile = () => {


    const upload = async (e) => {
        e.preventDefault();
        console.log(e);
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            const res = await axios.postForm("/api/upload", {
                file,
            });
            console.log(res.data);
        }
    };

    return (
        <div>

            <label className="mt-8 px-5 py-2 w-36 rounded-full bg-emerald-600 hover:bg-emerald-500 hover:scale-95 text-white text-sm font-medium transition-discrete transition-transform flex items-center gap-2 shadow-lg shadow-emerald-900/40">
                <UploadCloudIcon className="w-4 h-4" />
                Choose file
                <input type="file" onChange={upload} className="hidden" name="" id="" />
            </label>
        </div>
    )
}

export default UploadFile
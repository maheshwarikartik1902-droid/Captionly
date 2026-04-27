"use client";
import { useEffect, useState } from "react";


export default function CaptionEditor({ captions = [],captionStyle, setCaptionStyle, onUpdate }) {


    const handleChange = (e, index, field) => {

        const updatedCaptions = captions.map((item, i) => {
            if (i !== index) return item;
            // spread to avoid mutation
            return {
                ...item,
                [field]: field === "text" ? e.target.value : parseFloat(e.target.value) || 0,
            };
        })
        onUpdate(updatedCaptions);
    };

    if (captions.length === 0) return null;

    return (

        <div className="flex flex-col h-full">
            {/* Style Panel — sits above captions column */}
            <div className="flex flex-col gap-3 p-4 rounded-2xl border border-white/5 bg-white/2">
                <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Style</p>

                <div className="grid grid-cols-2 gap-4">

                    {/* Text color */}
                    <div className="flex items-center justify-between">
                        <span className="text-white/50 text-xs">Text</span>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-5 h-5 rounded-full border border-white/20 cursor-pointer"
                                style={{ background: captionStyle.primaryColor }}
                                onClick={() => document.getElementById("primaryColor").click()}
                            />
                            <input
                                id="primaryColor"
                                type="color"
                                value={captionStyle.primaryColor}
                                onChange={(e) => setCaptionStyle(s => ({ ...s, primaryColor: e.target.value }))}
                                className="sr-only"
                            />
                        </div>
                    </div>

                    {/* Outline color */}
                    <div className="flex items-center justify-between">
                        <span className="text-white/50 text-xs">Outline</span>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-5 h-5 rounded-full border border-white/20 cursor-pointer"
                                style={{ background: captionStyle.outlineColor }}
                                onClick={() => document.getElementById("outlineColor").click()}
                            />
                            <input
                                id="outlineColor"
                                type="color"
                                value={captionStyle.outlineColor}
                                onChange={(e) => setCaptionStyle(s => ({ ...s, outlineColor: e.target.value }))}
                                className="sr-only"
                            />
                        </div>
                    </div>

                    {/* Font size */}
                    <div className="flex items-center justify-between col-span-2">
                        <span className="text-white/50 text-xs">Size</span>
                        <div className="flex gap-1">
                            {[{ label: "S", value: 14 }, { label: "M", value: 18 }, { label: "L", value: 24 }, { label: "XL", value: 32 }].map(({ label, value }) => (
                                <button
                                    key={value}
                                    onClick={() => setCaptionStyle(s => ({ ...s, fontSize: value }))}
                                    className={`w-7 h-7 rounded-md text-xs font-medium transition-all ${captionStyle.fontSize === value
                                            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                                            : "bg-white/5 border border-white/5 text-white/40 hover:text-white/60"
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Position */}
                    <div className="flex items-center justify-between col-span-2">
                        <span className="text-white/50 text-xs">Position</span>
                        <div className="flex gap-1">
                            {["top", "middle", "bottom"].map((pos) => (
                                <button
                                    key={pos}
                                    onClick={() => setCaptionStyle(s => ({ ...s, position: pos }))}
                                    className={`px-3 h-7 rounded-md text-xs capitalize font-medium transition-all ${captionStyle.position === pos
                                            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                                            : "bg-white/5 border border-white/5 text-white/40 hover:text-white/60"
                                        }`}
                                >
                                    {pos}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex gap-2 col-span-2">
                        {[
                            { key: "bold", label: "Bold" },
                            { key: "uppercase", label: "AA" },
                            { key: "box", label: "Box" },
                        ].map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setCaptionStyle(s => ({ ...s, [key]: !s[key] }))}
                                className={`px-3 h-7 rounded-md text-xs font-medium transition-all ${captionStyle[key]
                                        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                                        : "bg-white/5 border border-white/5 text-white/40 hover:text-white/60"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Header */}
            <div className="mt-5 grid grid-cols-[72px_72px_1fr] gap-2 text-xs uppercase tracking-widest text-white/30 border-b border-white/8 pb-2 mb-2 px-2">
                <span>Start</span>
                <span>End</span>
                <span>Text</span>
            </div>

            {/* Scrollable list */}
            <ul className="space-y-1 overflow-y-auto flex-1 pr-1
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-white/10
                [&::-webkit-scrollbar-thumb]:rounded-full">
                {captions.map((c, i) => (
                    <li
                        key={i}
                        className="grid grid-cols-[72px_72px_1fr] gap-2 items-center rounded-lg px-2 py-1.5 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 transition-all"
                    >
                        <input
                            type="number"
                            step="0.1"
                            value={c.start}
                            onChange={(e) => handleChange(e, i, "start")}
                            className="bg-transparent text-white/70 text-xs px-2 py-1 rounded-md border border-white/10 focus:border-emerald-500 focus:text-white outline-none transition-all tabular-nums"
                        />
                        <input
                            type="number"
                            step="0.1"
                            value={c.end}
                            onChange={(e) => handleChange(e, i, "end")}
                            className="bg-transparent text-white/70 text-xs px-2 py-1 rounded-md border border-white/10 focus:border-emerald-500 focus:text-white outline-none transition-all tabular-nums"
                        />
                        <input
                            type="text"
                            value={c.text}
                            onChange={(e) => handleChange(e, i, "text")}
                            className="bg-transparent text-white/80 text-sm w-full px-2 py-1 rounded-md border border-white/10 focus:border-emerald-500 focus:text-white outline-none transition-all"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
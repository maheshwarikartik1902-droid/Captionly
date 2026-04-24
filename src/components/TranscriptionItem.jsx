"use client";
import { useEffect, useState } from "react";


export default function CaptionEditor({ captions = [] }) {
    const [items, setItems] = useState(captions);

    // sync when parent passes new captions
    useEffect(() => {
        setItems(captions);
    }, [captions]);

    const handleChange = (e, index, field) => {
        setItems(prev =>
            prev.map((item, i) => {
                if (i !== index) return item;
                // spread to avoid mutation
                return {
                    ...item,
                    [field]: field === "text" ? e.target.value : parseFloat(e.target.value) || 0,
                };
            })
        );
        console.log(items);
    };

    if (items.length === 0) return null;

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="grid grid-cols-[72px_72px_1fr] gap-2 text-xs uppercase tracking-widest text-white/30 border-b border-white/8 pb-2 mb-2 px-2">
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
                {items.map((c, i) => (
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
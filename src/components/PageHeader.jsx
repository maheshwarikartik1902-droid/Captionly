import React from 'react'
import { SparklesIcon } from "lucide-react";
import Link from "next/link";


const PageHeader = () => {
    return (
        <nav className="flex items-center justify-between py-5 border-b border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 text-white" />
                </div>
                <Link href="/">
                    <span className="font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-sora)" }}>
                        Captionly
                    </span>
                </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/50">
                {/*<Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>*/}
                <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
                <button className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/80 hover:text-white transition-all text-sm">
                    Sign in
                </button>
            </div>
        </nav>
    )
}

export default PageHeader
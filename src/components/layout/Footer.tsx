"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    // Only render the footer on the exact home page
    if (pathname !== "/") return null;

    return (
        <footer className="bg-[#18181b] text-zinc-400 py-8 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold text-white tracking-tight">
                            <span className="text-xl">Magic</span>
                            <span className="text-blue-500 text-2xl">Code</span>
                        </span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed md:max-w-xs">
                        Making programming delightfully simple and engaging for developers worldwide.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Navigation</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                        <li><Link href="/learning-paths" className="hover:text-emerald-400 transition-colors">Learning Paths</Link></li>
                        <li><Link href="/problems" className="hover:text-emerald-400 transition-colors">Practice Problems</Link></li>
                        <li><Link href="/leaderboard" className="hover:text-emerald-400 transition-colors">Leaderboard</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Legal</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Get in Touch</h3>
                    <div className="space-y-4 text-sm">
                        <a href="mailto:work03.souvik@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                            work03.souvik@gmail.com
                        </a>
                        <div className="flex items-center gap-5 pt-2">
                            <a href="https://x.com/itssouvikdev" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="X (Twitter)">
                                <Twitter className="w-5 h-5" />
                                <span className="sr-only">Twitter/X</span>
                            </a>
                            <a href="https://github.com/souvik082003" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="GitHub">
                                <Github className="w-5 h-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/souvik-samanta-660130211/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#0077b5] transition-colors" title="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8 pt-4 border-t border-zinc-800 text-center text-sm font-medium">
                <p>&copy; {new Date().getFullYear()} MagicCode. All rights reserved.</p>
            </div>
        </footer>
    );
}

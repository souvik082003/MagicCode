"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Lock, BookOpen, Code, Lightbulb, PlayCircle, Loader2, X, Terminal, CheckCircle2 } from "lucide-react";

// Mock Data structure based on the learning-paths.json
interface TopicData {
    id: string;
    title: string;
    explanation: string;
    tldr: string;
    syntax?: {
        c?: string;
        cpp?: string;
    };
    example?: {
        c?: string;
        cpp?: string;
    };
}

export default function GamifiedRoadmap() {
    const params = useParams();
    const router = useRouter();
    const pathId = params.pathId as string;

    const [topics, setTopics] = useState<TopicData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
    const [unlockedLevel, setUnlockedLevel] = useState<number>(1);

    // Initial check for local user progress
    useEffect(() => {
        const savedProgress = localStorage.getItem(`magiccode_progress_${pathId}`);
        if (savedProgress) {
            setUnlockedLevel(parseInt(savedProgress));
        }
    }, [pathId]);

    useEffect(() => {
        // Fetch the topics JSON
        fetch("/data/learning-paths.json")
            .then(res => res.json())
            .then(data => {
                const items = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setTopics(items);
                setLoading(false);

                // Automatically select the highest unlocked level initially
                if (items.length > 0) {
                    const savedProgress = localStorage.getItem(`magiccode_progress_${pathId}`);
                    const initialLevel = savedProgress ? parseInt(savedProgress) : 1;
                    const indexToSelect = Math.min(initialLevel - 1, items.length - 1);
                    setSelectedTopic(items[indexToSelect]);
                }
            })
            .catch(err => {
                console.error("Failed to load map data", err);
                setLoading(false);
            });
    }, [pathId]);

    // Hardcoded level positions for the "Winding Map" SVG
    const yOffset = 100;
    const ySpacing = 160;

    const getLevelPosition = (index: number) => {
        const y = yOffset + (index * ySpacing);
        // Sine wave pattern for X coordinate to make it "snake"
        const amplitude = 30; // 30 units swing left/right in a 0-100 coordinate space
        const xCenter = 50; // Middle of screen (50)
        const frequency = Math.PI * 0.4; // Controls the curve

        const x = xCenter + Math.sin(index * frequency) * amplitude;

        return { x, y };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
            </div>
        );
    }

    if (pathId !== 'c' && pathId !== 'cpp') {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-100">
                <Lock className="w-16 h-16 text-zinc-600 mb-4" />
                <h1 className="text-3xl font-bold mb-2">World Locked</h1>
                <p className="text-zinc-500 mb-8">You need to complete the previous worlds to unlock this area.</p>
                <Button asChild variant="outline" className="border-zinc-800 text-zinc-300">
                    <Link href="/learning-paths">Return to Map</Link>
                </Button>
            </div>
        );
    }

    const themeColors = pathId === 'c'
        ? { stroke: 'stroke-blue-500', nodeActive: 'bg-blue-600', textActive: 'text-blue-600', borderActive: 'border-blue-600', ring: 'ring-blue-500/50' }
        : { stroke: 'stroke-purple-500', nodeActive: 'bg-purple-600', textActive: 'text-purple-600', borderActive: 'border-purple-600', ring: 'ring-purple-500/50' };

    // Calculate dynamic SVG height based on number of levels
    const svgHeight = 200 + (topics.length * ySpacing);

    const handleUnlockNext = () => {
        if (!selectedTopic) return;

        const currentIndex = topics.findIndex(t => t.id === selectedTopic.id);
        let nextLevelUnlocked = unlockedLevel;

        if (currentIndex + 1 >= unlockedLevel) {
            nextLevelUnlocked = currentIndex + 2;
            setUnlockedLevel(nextLevelUnlocked);
            localStorage.setItem(`magiccode_progress_${pathId}`, nextLevelUnlocked.toString());
        }

        // Auto-select the next topic if it exists
        if (currentIndex + 1 < topics.length) {
            setSelectedTopic(topics[currentIndex + 1]);

            // Scroll right panel to top
            const rightPanel = document.getElementById('right-content-panel');
            if (rightPanel) {
                rightPanel.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const isCurrentTopicCompleted = () => {
        if (!selectedTopic) return false;
        const index = topics.findIndex(t => t.id === selectedTopic.id);
        return index + 1 < unlockedLevel;
    };

    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden font-sans">

            {/*----------------------------------------------------------------*/}
            {/* LEFT PANEL : Winding Map (Light Theme)                         */}
            {/*----------------------------------------------------------------*/}
            <div className="w-full md:w-[400px] flex-shrink-0 bg-slate-50 border-r border-slate-200 overflow-y-auto relative flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.05)] z-20 hidden md:flex">

                {/* Fixed Header in Map Panel */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between z-30 shadow-sm">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" asChild className="hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-900 border-none">
                            <Link href="/learning-paths">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 tracking-tight">World {pathId === 'c' ? '1' : '2'}</h1>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{pathId === 'c' ? 'C Programming' : 'C++ Fundamentals'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold">{Math.min(unlockedLevel - 1, topics.length)} / {topics.length}</span>
                    </div>
                </div>

                {/* SVG Container */}
                <div className="relative w-full pb-32 flex-1" style={{ height: `${svgHeight}px`, minHeight: 'max-content' }}>

                    {/* The SVG Path connecting the nodes */}
                    <svg className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: svgHeight }} viewBox={`0 0 100 ${svgHeight}`} preserveAspectRatio="none">
                        <path
                            d={`M 50,${yOffset} ${topics.map((t, i) => {
                                const pos = getLevelPosition(i);
                                return `L ${pos.x},${pos.y}`;
                            }).join(' ')}`}
                            fill="none"
                            className={`${themeColors.stroke}`}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        {/* Inner dashed line for style */}
                        <path
                            d={`M 50,${yOffset} ${topics.map((t, i) => {
                                const pos = getLevelPosition(i);
                                return `L ${pos.x},${pos.y}`;
                            }).join(' ')}`}
                            fill="none"
                            stroke="rgba(255,255,255,0.5)"
                            strokeWidth="1.5"
                            strokeDasharray="2 3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* The circular level nodes */}
                    {topics.map((topic, index) => {
                        const pos = getLevelPosition(index);
                        const isUnlocked = index < unlockedLevel;
                        const isSelected = selectedTopic?.id === topic.id;
                        const isCompleted = index + 1 < unlockedLevel;

                        return (
                            <div
                                key={topic.id}
                                className="absolute flex flex-col items-center group cursor-pointer"
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}px`,
                                    transform: 'translate(-50%, -50%)'

                                }}
                                onClick={() => isUnlocked ? setSelectedTopic(topic) : null}
                            >
                                {/* Tooltip on hover */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-slate-800 text-white px-3 py-1.5 rounded-md shadow-lg text-xs font-bold z-20 pointer-events-none">
                                    {topic.title}
                                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                                </div>

                                {/* Node Button */}
                                <motion.button
                                    whileHover={isUnlocked ? { scale: 1.1 } : {}}
                                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center border-[3px] relative z-10 transition-all duration-300 shadow-md ${isSelected
                                        ? `${themeColors.borderActive} ${themeColors.nodeActive} text-white ring-4 ${themeColors.ring} scale-110 shadow-xl`
                                        : isCompleted
                                            ? `${themeColors.borderActive} bg-white ${themeColors.textActive}`
                                            : isUnlocked
                                                ? `${themeColors.borderActive} ${themeColors.nodeActive} text-white`
                                                : 'bg-slate-200 border-slate-300 text-slate-400'
                                        }`}
                                >
                                    {isCompleted && !isSelected ? (
                                        <CheckCircle2 className={`w-6 h-6 ${themeColors.textActive}`} />
                                    ) : isUnlocked ? (
                                        <span className="text-xl font-black">{index + 1}</span>
                                    ) : (
                                        <Lock className="w-5 h-5" />
                                    )}
                                </motion.button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/*----------------------------------------------------------------*/}
            {/* RIGHT PANEL : Topic Data (Dark Theme)                          */}
            {/*----------------------------------------------------------------*/}
            <div id="right-content-panel" className="flex-1 bg-[#0a0a0a] text-zinc-100 flex flex-col relative z-10 w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    {selectedTopic ? (
                        <motion.div
                            key={selectedTopic.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col h-full w-full"
                        >
                            {/* Scrollable Content Area */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-12 pt-8">
                                <div className="max-w-4xl mx-auto space-y-12 pb-8">
                                    {/* Topic Header */}
                                    <div className="mb-10">
                                        <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <BookOpen className="w-4 h-4" />
                                            Level {topics.findIndex(t => t.id === selectedTopic.id) + 1}
                                        </p>
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{selectedTopic.title}</h1>
                                    </div>

                                    {/* TLDR Section */}
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
                                        <div className="flex items-start gap-4 relative z-10">
                                            <div className="p-2 bg-emerald-500/20 rounded-xl shrink-0">
                                                <Lightbulb className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-emerald-400 mb-2 text-xl tracking-tight">TL;DR / Focus</h3>
                                                <p className="text-zinc-300 font-medium leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: selectedTopic.tldr }}></p>
                                            </div>
                                        </div>
                                        <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                                            <Lightbulb className="w-40 h-40" />
                                        </div>
                                    </div>

                                    {/* Deep Dive Explanation */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-2xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                                            The Concept
                                        </h3>
                                        <div className="text-zinc-400 leading-relaxed text-[16px] space-y-4 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selectedTopic.explanation }}>
                                        </div>
                                    </div>

                                    {/* Code Syntax */}
                                    {selectedTopic.syntax && (
                                        <div className="space-y-4">
                                            <h3 className="flex items-center gap-2 text-2xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                                                <Code className="w-6 h-6 text-purple-400" /> Syntax
                                            </h3>
                                            <div className="bg-[#121212] rounded-xl border border-zinc-800 overflow-hidden shadow-xl">
                                                <div className="bg-[#181818] px-4 py-3 text-xs font-mono text-zinc-500 border-b border-zinc-800 flex items-center justify-between">
                                                    <span className="font-bold text-zinc-400">{pathId === 'c' ? 'C Language' : 'C++'}</span>
                                                </div>
                                                <pre className="p-6 overflow-x-auto">
                                                    <code className="text-[15px] font-mono text-emerald-300 leading-relaxed">
                                                        {pathId === 'c' ? selectedTopic.syntax.c : selectedTopic.syntax.cpp}
                                                    </code>
                                                </pre>
                                            </div>
                                        </div>
                                    )}

                                    {/* Code Example */}
                                    {selectedTopic.example && (
                                        <div className="space-y-4">
                                            <h3 className="flex items-center gap-2 text-2xl font-bold text-zinc-100 border-b border-zinc-800 pb-3">
                                                <Terminal className="w-6 h-6 text-orange-400" /> Example
                                            </h3>
                                            <div className="bg-[#121212] rounded-xl border border-zinc-800 overflow-hidden relative shadow-xl">
                                                <div className="absolute top-3 right-3">
                                                    <Button size="sm" variant="secondary" className="h-8 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300">Copy Code</Button>
                                                </div>
                                                <pre className="p-6 pt-14 overflow-x-auto">
                                                    <code className="text-[15px] font-mono text-zinc-300 leading-relaxed">
                                                        {pathId === 'c' ? selectedTopic.example.c : selectedTopic.example.cpp}
                                                    </code>
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Footer locked to the bottom of the right panel */}
                            <div className="bg-[#050505] border-t border-zinc-900 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
                                <div className="p-6 md:px-12 max-w-4xl mx-auto flex items-center justify-between gap-4">
                                    <Button
                                        onClick={handleUnlockNext}
                                        className={`px-8 h-12 text-base font-bold shadow-lg transition-all ${isCurrentTopicCompleted()
                                                ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                                                : `${themeColors.nodeActive} hover:opacity-90 text-white`
                                            }`}
                                    >
                                        {isCurrentTopicCompleted() ? (
                                            <>Move to Next Topic <ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></>
                                        ) : (
                                            <><CheckCircle2 className="w-5 h-5 mr-2" /> Mark as Understood</>
                                        )}
                                    </Button>

                                    <Button variant="outline" asChild className="border-zinc-700 bg-zinc-900 text-zinc-300 h-12 px-6 hover:bg-zinc-800 shrink-0">
                                        <Link href="/playground" title="Try in Playground">
                                            <Terminal className="w-4 h-4 mr-2" /> Try it Out
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8 text-center animate-in fade-in duration-1000">
                            <Star className="w-16 h-16 text-zinc-800 mb-6" />
                            <h2 className="text-2xl font-bold text-zinc-300 mb-2">Select a Level</h2>
                            <p className="max-w-md">Choose a level from the map on the left to start learning. Progress through topics to unlock new challenges!</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile View Disclaimer */}
            <div className="md:hidden fixed inset-0 bg-slate-50 z-50 flex flex-col p-6 items-center justify-center text-center">
                <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
                    <BookOpen className="w-12 h-12 text-blue-500 mb-4" />
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Desktop View Recommended</h2>
                    <p className="text-sm text-slate-500 mb-6">The interactive Level Map is currently designed for larger screens. Please rotate your device or use a desktop to access the gamified map.</p>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href="/learning-paths">Go Back</Link>
                    </Button>
                </div>
            </div>

        </div>
    );
}

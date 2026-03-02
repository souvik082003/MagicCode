"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, BrainCircuit, ArrowRight, PlayCircle, Lock, Star } from "lucide-react";

export default function LearningPathsLanding() {
    return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-hidden relative">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-12 relative z-10 flex flex-col items-center">

                {/* Header Section */}
                <div className="text-center space-y-6 max-w-3xl mb-16 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 mb-4">
                        <Star className="w-4 h-4" />
                        Interactive Learning Experience
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Path</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                        Embark on a gamified journey to master programming. Unlock levels, learn core concepts, and build a rock-solid foundation in computer science.
                    </p>
                </div>

                {/* Path Worlds Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

                    {/* C Language World */}
                    <div className="group relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100 h-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                        <Card className="relative h-full bg-zinc-900/80 border-zinc-800 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2">
                            <div className="h-48 w-full bg-gradient-to-br from-blue-900/40 to-slate-900 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
                                <Code2 className="w-24 h-24 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-3xl font-bold text-white">World 1: Learn C</CardTitle>
                                <CardDescription className="text-zinc-400 text-base">The Mother of all Languages</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center text-zinc-400 pt-4 flex-1">
                                <p>Master memory management, pointers, and the foundational syntax that powers modern computing.</p>
                                <div className="mt-6 flex justify-center gap-2">
                                    <span className="px-2 py-1 text-xs font-bold rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">11 Levels</span>
                                    <span className="px-2 py-1 text-xs font-bold rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">Beginner Friendly</span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8 flex justify-center">
                                <Button asChild size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all">
                                    <Link href="/learning-paths/c">
                                        Enter World <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* C++ Language World */}
                    <div className="group relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 h-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-500"></div>
                        <Card className="relative h-full bg-zinc-900/80 border-zinc-800 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2">
                            <div className="h-48 w-full bg-gradient-to-br from-purple-900/40 to-slate-900 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
                                <Code2 className="w-24 h-24 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10 transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-3xl font-bold text-white">World 2: Learn C++</CardTitle>
                                <CardDescription className="text-zinc-400 text-base">Object-Oriented Powerhouse</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center text-zinc-400 pt-4 flex-1">
                                <p>Unlock Classes, Objects, STL, and take control over hardware with blistering fast performance.</p>
                                <div className="mt-6 flex justify-center gap-2">
                                    <span className="px-2 py-1 text-xs font-bold rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">11 Levels</span>
                                    <span className="px-2 py-1 text-xs font-bold rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">Intermediate</span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8 flex justify-center">
                                <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 shadow-[0_0_20px_rgba(147,51,234,0.4)] group-hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all">
                                    <Link href="/learning-paths/cpp">
                                        Enter World <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* DSA World */}
                    <div className="group relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 h-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl blur opacity-15 transition duration-500"></div>
                        <Card className="relative h-full bg-zinc-950/80 border-dashed border-2 border-zinc-800 backdrop-blur-xl rounded-3xl overflow-hidden flex flex-col transition-all duration-300 opacity-90 grayscale-[50%]">
                            <div className="absolute top-4 right-4 bg-zinc-900 border border-zinc-800 rounded-full p-2 z-20">
                                <Lock className="w-4 h-4 text-zinc-500" />
                            </div>
                            <div className="h-48 w-full bg-gradient-to-br from-green-900/20 to-slate-900 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
                                <BrainCircuit className="w-24 h-24 text-zinc-600 z-10" />
                            </div>
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-3xl font-bold text-zinc-400">World 3: D.S.A</CardTitle>
                                <CardDescription className="text-zinc-600 text-base">The Algorithm Mastery</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center text-zinc-600 pt-4 flex-1">
                                <p>The final frontier. Master Trees, Graphs, Sorting, and Dynamic Programming to ace top interviews.</p>
                                <div className="mt-6 flex justify-center gap-2">
                                    <span className="px-2 py-1 text-xs font-bold rounded-md bg-zinc-900 text-zinc-600 border border-zinc-800">20+ Levels</span>
                                    <span className="px-2 py-1 text-xs font-bold rounded-md bg-zinc-900 text-zinc-600 border border-zinc-800">Advanced</span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 pb-8 flex justify-center">
                                <Button disabled size="lg" variant="outline" className="rounded-full bg-zinc-900/50 border-zinc-800 text-zinc-500 font-bold px-8">
                                    Complete World 2 First
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    );
}

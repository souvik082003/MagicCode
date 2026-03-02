"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ThumbsUp, PenSquare, ArrowLeft, MessageSquare, Code2, User } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Solution {
    _id: string;
    title: string;
    content: string;
    code: string;
    language: string;
    upvoteCount: number;
    authorName: string;
    createdAt: string;
}

interface SolutionsTabProps {
    problemId: string;
    currentCode: string;
    currentLanguage: string;
}

export function SolutionsTab({ problemId, currentCode, currentLanguage }: SolutionsTabProps) {
    const { data: session } = useSession();
    const [view, setView] = useState<"list" | "publish" | "detail">("list");
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

    // Form State
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);

    const fetchSolutions = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/problems/${problemId}/solutions`);
            const data = await res.json();
            if (data.solutions) setSolutions(data.solutions);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSolutions();
    }, [problemId]);

    const handlePublish = async () => {
        if (!session) {
            toast.error("You must be logged in to publish a solution.");
            return;
        }
        if (!title.trim() || !content.trim()) {
            toast.error("Title and explanation are required.");
            return;
        }

        setIsPublishing(true);
        try {
            const res = await fetch(`/api/problems/${problemId}/solutions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    content,
                    code: currentCode,
                    language: currentLanguage
                })
            });

            if (res.ok) {
                toast.success("Solution published!");
                setTitle("");
                setContent("");
                setView("list");
                fetchSolutions();
            } else {
                toast.error("Failed to publish solution");
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setIsPublishing(false);
        }
    };

    const toggleUpvote = async (solutionId: string) => {
        if (!session) {
            toast.error("You must be logged in to vote.");
            return;
        }

        try {
            const res = await fetch(`/api/solutions/${solutionId}/upvote`, { method: "POST" });
            const data = await res.json();

            if (res.ok) {
                // Optimistically update
                setSolutions(prev => prev.map(s => {
                    if (s._id === solutionId) {
                        return { ...s, upvoteCount: data.hasUpvoted ? s.upvoteCount + 1 : s.upvoteCount - 1 };
                    }
                    return s;
                }));
                if (selectedSolution?._id === solutionId) {
                    setSelectedSolution(prev => prev ? { ...prev, upvoteCount: data.hasUpvoted ? prev.upvoteCount + 1 : prev.upvoteCount - 1 } : null);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <div className="p-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-green-500" /></div>;
    }

    if (view === "publish") {
        return (
            <div className="p-6 h-full flex flex-col max-w-3xl mx-auto">
                <Button variant="ghost" className="self-start text-zinc-400 hover:text-zinc-100 mb-6 p-0 hover:bg-transparent" onClick={() => setView("list")}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Solutions
                </Button>

                <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
                    <PenSquare className="w-5 h-5 text-blue-400" /> Publish Your Solution
                </h2>

                <div className="space-y-4 flex-1 overflow-y-auto pr-2 pb-10">
                    <div>
                        <label className="text-xs font-semibold text-zinc-400 mb-1.5 block">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. O(n) Time, O(1) Space - Fast and Clean"
                            className="bg-zinc-900 border-zinc-800 focus-visible:ring-blue-500/50"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-zinc-400 mb-1.5 block">Explanation (Markdown)</label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Explain your approach..."
                            className="bg-zinc-900 border-zinc-800 min-h-[200px] font-mono text-sm focus-visible:ring-blue-500/50"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-zinc-400 mb-1.5 block flex justify-between">
                            <span>Attached Code</span>
                            <span className="text-blue-400">{currentLanguage}</span>
                        </label>
                        <div className="bg-[#1e1e1e] p-4 rounded-lg border border-zinc-800 font-mono text-xs overflow-auto max-h-64 whitespace-pre text-zinc-300">
                            {currentCode}
                        </div>
                    </div>

                    <Button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium"
                    >
                        {isPublishing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        Publish to Community
                    </Button>
                </div>
            </div>
        );
    }

    if (view === "detail" && selectedSolution) {
        return (
            <div className="p-6 h-full flex flex-col max-w-4xl mx-auto">
                <Button variant="ghost" className="self-start text-zinc-400 hover:text-zinc-100 mb-6 p-0 hover:bg-transparent" onClick={() => { setView("list"); setSelectedSolution(null); }}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Solutions
                </Button>

                <div className="flex-1 overflow-y-auto pr-2 pb-10">
                    <h1 className="text-2xl font-bold text-zinc-100 mb-4">{selectedSolution.title}</h1>

                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                                <User className="w-4 h-4 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-200">{selectedSolution.authorName}</p>
                                <p className="text-xs text-zinc-500">{new Date(selectedSolution.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleUpvote(selectedSolution._id)}
                            className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 gap-2"
                        >
                            <ThumbsUp className="w-4 h-4 text-zinc-400" /> {selectedSolution.upvoteCount}
                        </Button>
                    </div>

                    {/* Basic Markdown Rendering (Simplified for now) */}
                    <div className="prose prose-invert prose-p:text-zinc-300 prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-zinc-800 max-w-none mb-10 whitespace-pre-wrap">
                        {selectedSolution.content}
                    </div>

                    <div className="rounded-lg overflow-hidden border border-zinc-800">
                        <div className="bg-[#282828] h-10 px-4 flex items-center justify-between border-b border-zinc-800">
                            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-2"><Code2 className="w-4 h-4" /> Code</span>
                            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{selectedSolution.language}</span>
                        </div>
                        <div className="bg-[#1e1e1e] p-4 overflow-auto">
                            <pre className="font-mono text-sm text-zinc-300">
                                <code>{selectedSolution.code}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                    <h2 className="text-lg font-bold text-zinc-100">Community Solutions</h2>
                </div>
                {session ? (
                    <Button
                        size="sm"
                        onClick={() => setView("publish")}
                        className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 hover:text-blue-300 border border-blue-500/20"
                    >
                        <PenSquare className="w-4 h-4 mr-2" /> Publish
                    </Button>
                ) : (
                    <span className="text-xs text-zinc-500">Log in to publish</span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 pb-10">
                {solutions.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
                        <p className="text-zinc-500 text-sm">No solutions published yet.</p>
                        <p className="text-zinc-600 text-xs mt-1">Be the first to share your approach!</p>
                    </div>
                ) : (
                    solutions.map(solution => (
                        <div
                            key={solution._id}
                            onClick={() => { setSelectedSolution(solution); setView("detail"); }}
                            className="group p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 hover:bg-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 justify-between sm:items-center"
                        >
                            <div className="space-y-2">
                                <h3 className="font-medium text-zinc-200 group-hover:text-blue-400 transition-colors">{solution.title}</h3>
                                <div className="flex items-center gap-3 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {solution.authorName}</span>
                                    <span>•</span>
                                    <span>{new Date(solution.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 self-start sm:self-auto">
                                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                                    {solution.language}
                                </span>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                                    <ThumbsUp className="w-3.5 h-3.5 text-zinc-400" />
                                    <span className="text-xs font-semibold">{solution.upvoteCount}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

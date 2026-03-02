"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2, Plus, Code2, Trash, Settings2, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProblemListItem {
    _id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    category: string;
    companies: string[];
    topics: string[];
    createdAt: string;
    problemId?: string;
}

export default function AdminProblemsPage() {
    const [problems, setProblems] = useState<ProblemListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadProblems = () => {
        fetch("/api/problems")
            .then(res => res.json())
            .then(data => {
                if (data.problems) {
                    setProblems(data.problems);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        loadProblems();
    }, []);

    const handleDeleteProblem = async (dbId: string, problemId: string) => {
        if (!confirm("Are you sure you want to completely delete this problem?")) return;

        try {
            const idToUse = problemId || dbId;
            const res = await fetch(`/api/problems/${idToUse}`, { method: "DELETE" });

            if (res.ok) {
                toast.success("Problem deleted successfully.");
                setProblems(prev => prev.filter(p => p._id !== dbId));
            } else {
                toast.error("Failed to delete problem.");
            }
        } catch (err) {
            toast.error("An error occurred while deleting.");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const content = event.target?.result as string;
                const parsed = JSON.parse(content);

                // Allow single object or array
                const newProblems: any[] = Array.isArray(parsed) ? parsed : [parsed];

                let addedCount = 0;
                for (const prob of newProblems) {
                    // Normalize problemId
                    const normalizedProb = { ...prob, problemId: prob.problemId || prob.id };
                    if (normalizedProb.problemId && normalizedProb.title && normalizedProb.template) {
                        try {
                            const res = await fetch("/api/problems", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(normalizedProb),
                            });
                            if (res.ok) addedCount++;
                        } catch (err) {
                            console.error("Failed to save imported problem:", err);
                        }
                    }
                }

                if (addedCount > 0) {
                    toast.success(`Successfully imported ${addedCount} custom problem(s)!`);
                    loadProblems(); // Reload state
                } else {
                    toast.error("No valid problems imported. Ensure Problem Definition format is correct.");
                }
            } catch (err) {
                toast.error("Failed to parse the JSON file.");
            }
        };
        reader.readAsText(file);

        // Reset input so the same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Problem Sets</h1>
                    <p className="text-zinc-400">Manage curated coding questions, categories, and tags.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors" onClick={() => fileInputRef.current?.click()}>
                        <UploadCloud className="w-4 h-4 mr-2" /> Upload JSON List
                    </Button>
                    <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <Link href="/admin/problems/add">
                        <Button className="bg-green-600 hover:bg-green-500 text-white font-bold transition-colors">
                            <Plus className="w-4 h-4 mr-2" /> Create Problem
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Title</th>
                                <th className="p-4 font-medium">Difficulty</th>
                                <th className="p-4 font-medium">Category / Topics</th>
                                <th className="p-4 font-medium">Companies</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {problems.map((problem) => (
                                <tr key={problem._id} className="hover:bg-zinc-900/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-semibold text-zinc-200 flex items-center gap-2">
                                            <Code2 className="w-4 h-4 text-zinc-500" />
                                            {problem.title}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${problem.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            problem.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                'bg-red-500/10 text-red-500 border-red-500/20'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm font-medium text-zinc-300">{problem.category}</div>
                                        {problem.topics && problem.topics.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                {problem.topics.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full">{t}</span>
                                                ))}
                                                {problem.topics.length > 3 && <span className="text-[10px] px-2 py-0.5 text-zinc-500">+{problem.topics.length - 3}</span>}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {problem.companies && problem.companies.length > 0 ? (
                                            <div className="flex flex-wrap gap-1">
                                                {problem.companies.slice(0, 2).map((c, i) => (
                                                    <span key={i} className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-sm">{c}</span>
                                                ))}
                                                {problem.companies.length > 2 && <span className="text-[10px] px-2 py-0.5 text-zinc-500 border border-zinc-800 rounded-sm">+{problem.companies.length - 2}</span>}
                                            </div>
                                        ) : (
                                            <span className="text-zinc-600 text-xs italic">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/problems/edit/${problem.problemId || problem._id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white" title="Edit Problem">
                                                    <Settings2 className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                title="Delete Problem"
                                                onClick={() => handleDeleteProblem(problem._id, problem.problemId as string)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {problems.length === 0 && (
                        <div className="p-12 text-center text-zinc-500">
                            No problems found. Click "Create Problem" to add one.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

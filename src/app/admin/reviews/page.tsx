"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, User, Clock, Code2 } from "lucide-react";
import { toast } from "sonner";

interface PendingProblem {
    _id: string;
    problemId: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    category: string;
    language: string;
    description: string;
    submittedBy: string;
    createdAt: string;
}

export default function AdminReviewsPage() {
    const [problems, setProblems] = useState<PendingProblem[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const fetchPending = async () => {
        try {
            const res = await fetch("/api/admin/reviews");
            const data = await res.json();
            if (data.problems) setProblems(data.problems);
        } catch (err) {
            console.error("Failed to load reviews:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPending(); }, []);

    const handleAction = async (problemId: string, action: "approve" | "reject") => {
        setActionLoading(problemId);
        try {
            const res = await fetch("/api/admin/reviews", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ problemId, action }),
            });

            if (!res.ok) throw new Error("Failed");

            const label = action === "approve" ? "approved" : "rejected";
            toast.success(`Problem ${label} successfully!`);
            setProblems(prev => prev.filter(p => p.problemId !== problemId));
        } catch {
            toast.error("Failed to update problem status.");
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Review Submissions</h1>
                <p className="text-zinc-400">
                    Review and approve community-submitted coding questions before they go live.
                </p>
            </div>

            {problems.length === 0 ? (
                <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">No pending submissions</h3>
                    <p>All submissions have been reviewed.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {problems.map((prob) => (
                        <Card key={prob._id} className="bg-[#1e1e1e] border-zinc-800 text-zinc-100">
                            <CardHeader>
                                <div className="flex justify-between items-start flex-wrap gap-4">
                                    <div className="space-y-2">
                                        <div className="flex gap-2 flex-wrap">
                                            <Badge variant="outline" className={
                                                prob.difficulty === "Easy" ? "border-green-500/50 text-green-500" :
                                                    prob.difficulty === "Medium" ? "border-yellow-500/50 text-yellow-500" :
                                                        "border-red-500/50 text-red-500"
                                            }>
                                                {prob.difficulty}
                                            </Badge>
                                            <Badge variant="secondary">{prob.category}</Badge>
                                            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                                                <Code2 className="w-3 h-3 mr-1" /> {prob.language}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl">{prob.title}</CardTitle>
                                        <CardDescription className="text-zinc-500 flex items-center gap-2">
                                            <User className="w-3.5 h-3.5" />
                                            Submitted by <span className="text-zinc-300 font-medium">{prob.submittedBy}</span>
                                            <span className="mx-1">•</span>
                                            {new Date(prob.createdAt).toLocaleDateString()}
                                        </CardDescription>
                                    </div>

                                    <div className="flex gap-2 shrink-0">
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-500 text-white"
                                            onClick={() => handleAction(prob.problemId, "approve")}
                                            disabled={actionLoading === prob.problemId}
                                        >
                                            {actionLoading === prob.problemId ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <><CheckCircle2 className="w-4 h-4 mr-1" /> Approve</>
                                            )}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleAction(prob.problemId, "reject")}
                                            disabled={actionLoading === prob.problemId}
                                        >
                                            <XCircle className="w-4 h-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 max-h-40 overflow-y-auto">
                                    <p className="text-sm text-zinc-400 whitespace-pre-wrap">{prob.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

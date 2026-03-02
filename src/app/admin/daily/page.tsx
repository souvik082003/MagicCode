"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Calendar, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProblemRef {
    _id: string;
    problemId: string;
    title: string;
    difficulty: string;
}

interface ChallengeItem {
    _id: string;
    dateId: string;
    problemId: string;
    createdAt: string;
}

export default function AdminDailyChallengePage() {
    const [challenges, setChallenges] = useState<ChallengeItem[]>([]);
    const [problems, setProblems] = useState<ProblemRef[]>([]);
    const [loading, setLoading] = useState(true);

    const [newDate, setNewDate] = useState("");
    const [selectedProblem, setSelectedProblem] = useState("");
    const [saving, setSaving] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetch("/api/admin/daily")
            .then(res => res.json())
            .then(data => {
                if (data.challenges) setChallenges(data.challenges);
                if (data.problems) setProblems(data.problems);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
        // Default date to today
        const todayStr = new Date().toISOString().split('T')[0];
        setNewDate(todayStr);
    }, []);

    const handleSaveChallenge = async () => {
        if (!newDate || !selectedProblem) {
            toast.error("Please provide both Date and exactly one Problem.");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch("/api/admin/daily", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dateId: newDate, problemId: selectedProblem }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message || "Challenge set!");
                fetchData();
            } else {
                toast.error(data.error || "Failed to set challenge.");
            }
        } catch (e) {
            toast.error("Error connecting to server.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (dateId: string) => {
        if (!confirm(`Are you sure you want to remove the specific Daily Challenge for ${dateId}?`)) return;

        try {
            const res = await fetch(`/api/admin/daily?dateId=${dateId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                toast.success("Removed manual challenge fallback.");
                fetchData();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to remove.");
            }
        } catch (e) {
            toast.error("Error connecting to server.");
        }
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
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Daily Challenges</h1>
                <p className="text-zinc-400">Override the platform's deterministic engine and explicitly curate exactly what problem should be deployed each day.</p>
            </div>

            <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Set Manual Daily Override</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-2">
                        <Label className="text-zinc-400">Target Date</Label>
                        <Input
                            type="date"
                            className="bg-zinc-950 border-zinc-800 text-white focus-visible:ring-green-500/50 [color-scheme:dark]"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-zinc-400">Target Problem Collection</Label>
                        <Select value={selectedProblem} onValueChange={setSelectedProblem}>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                                <SelectValue className="text-zinc-400 placeholder:text-zinc-500" placeholder="Select a problem target" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1e1e1e] border-zinc-800">
                                {problems.map(p => (
                                    <SelectItem key={p.problemId} value={p.problemId} className="text-zinc-300 focus:bg-zinc-800 focus:text-white cursor-pointer">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${p.difficulty === 'Easy' ? 'bg-green-500' : p.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                        {p.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold"
                            onClick={handleSaveChallenge}
                            disabled={saving}
                        >
                            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                            Publish Override
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                    <h2 className="text-lg font-bold text-white">Active Manual Configurations</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-900/20 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Assignment Date Target</th>
                                <th className="p-4 font-medium">Configured Problem Identifier</th>
                                <th className="p-4 font-medium">Created On</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {challenges.map((challenge) => (
                                <tr key={challenge._id} className="hover:bg-zinc-900/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-semibold text-zinc-200 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500" />
                                            {challenge.dateId}
                                        </div>
                                    </td>
                                    <td className="p-4 text-zinc-300 font-mono text-sm">
                                        {challenge.problemId}
                                    </td>
                                    <td className="p-4 text-sm text-zinc-500">
                                        {new Date(challenge.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            onClick={() => handleDelete(challenge.dateId)}
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {challenges.length === 0 && (
                        <div className="p-12 text-center text-zinc-500">
                            No manual challenges explicitly defined yet. Currently relying on the PRNG algorithm fallback.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

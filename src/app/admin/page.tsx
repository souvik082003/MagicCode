"use client";

import { useEffect, useState } from "react";
import { Users, Code, Activity, Loader2 } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState<{ users: number, problems: number, submissions: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setStats(data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Platform Overview</h1>
            <p className="text-zinc-400 mb-8">Welcome to the MagicCode Admin Console.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="bg-blue-500/10 p-4 rounded-full text-blue-500 mb-4">
                        <Users className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-1">{stats?.users || 0}</h2>
                    <p className="text-zinc-400 font-medium">Total Users</p>
                </div>

                <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="bg-green-500/10 p-4 rounded-full text-green-500 mb-4">
                        <Code className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-1">{stats?.problems || 0}</h2>
                    <p className="text-zinc-400 font-medium">Active Problems</p>
                </div>

                <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="bg-purple-500/10 p-4 rounded-full text-purple-500 mb-4">
                        <Activity className="w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-1">{stats?.submissions || 0}</h2>
                    <p className="text-zinc-400 font-medium">Total Submissions</p>
                </div>
            </div>
        </div>
    );
}

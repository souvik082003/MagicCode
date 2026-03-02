"use client";

import { useEffect, useState } from "react";
import { Loader2, Trophy, Medal, Crown, TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";

interface LeaderboardUser {
    rank: number;
    name: string;
    xp: number;
    solvedCount: number;
    avatarInitials: string;
}

export default function LeaderboardPage() {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("/api/leaderboard")
            .then(res => res.json())
            .then(data => {
                if (data.leaderboard) setUsers(data.leaderboard);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500/20" />;
        if (rank === 2) return <Medal className="w-6 h-6 text-zinc-300 fill-zinc-300/20" />;
        if (rank === 3) return <Medal className="w-6 h-6 text-amber-600 fill-amber-600/20" />;
        return <span className="font-bold text-zinc-500 w-6 text-center">{rank}</span>;
    };

    const getRowStyle = (rank: number) => {
        if (rank === 1) return "bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-500";
        if (rank === 2) return "bg-gradient-to-r from-zinc-300/10 to-transparent border-l-4 border-zinc-300";
        if (rank === 3) return "bg-gradient-to-r from-amber-600/10 to-transparent border-l-4 border-amber-600";
        return "border-l-4 border-transparent hover:bg-zinc-800/30";
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-950 text-zinc-100 font-sans flex flex-col">
            <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                                Global Leaderboard
                            </h1>
                        </div>
                        <p className="text-zinc-500 max-w-lg mt-2">
                            Rank up by solving problems and publishing community solutions.
                            The top 100 developers are showcased here.
                        </p>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Find a developer..."
                            className="pl-9 bg-zinc-900 border-zinc-800 focus-visible:ring-yellow-500/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="flex-1 bg-zinc-900/40 rounded-xl border border-zinc-800 overflow-hidden flex flex-col">
                    {/* Header Row */}
                    <div className="grid grid-cols-[80px_1fr_120px_120px] gap-4 px-6 py-4 bg-zinc-900/80 border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-widest sticky top-0 z-10">
                        <div className="text-center">Rank</div>
                        <div>Developer</div>
                        <div className="text-right">Solved</div>
                        <div className="text-right">Total XP</div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex-1 flex flex-col items-center justify-center p-20 gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                            <p className="text-zinc-500 animate-pulse">Calculating global standings...</p>
                        </div>
                    )}

                    {/* Results */}
                    {!loading && filteredUsers.length === 0 && (
                        <div className="p-16 text-center text-zinc-500">
                            No developers found matching that name.
                        </div>
                    )}

                    {/* Rows */}
                    {!loading && filteredUsers.length > 0 && (
                        <div className="overflow-y-auto">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.rank}
                                    className={`grid grid-cols-[80px_1fr_120px_120px] gap-4 px-6 py-4 items-center border-b border-zinc-800/50 transition-colors ${getRowStyle(user.rank)}`}
                                >
                                    <div className="flex justify-center">
                                        {getRankIcon(user.rank)}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 flex items-center justify-center border border-zinc-700 font-bold text-zinc-300">
                                            {user.avatarInitials}
                                        </div>
                                        <div>
                                            <p className={`font-semibold text-base ${user.rank <= 3 ? 'text-zinc-100' : 'text-zinc-300'}`}>
                                                {user.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right font-medium text-zinc-400">
                                        {user.solvedCount}
                                    </div>
                                    <div className="text-right flex items-center justify-end gap-1.5 font-bold text-yellow-500">
                                        {user.xp} <TrendingUp className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}

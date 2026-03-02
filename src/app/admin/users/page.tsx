"use client";

import { useEffect, useState } from "react";
import { Loader2, User as UserIcon, Shield, Mail, Award, Clock } from "lucide-react";

interface AdminUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    xp: number;
    solvedProblems: string[];
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/users")
            .then(res => res.json())
            .then(data => {
                if (data.users) {
                    setUsers(data.users);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
            <p className="text-zinc-400 mb-8">View and monitor registered platform users.</p>

            <div className="bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium">Progress</th>
                                <th className="p-4 font-medium">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-zinc-900/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold shrink-0">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-zinc-200 flex items-center gap-2">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-zinc-500 flex items-center gap-1.5 mt-0.5">
                                                    <Mail className="w-3 h-3" /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {user.role === "admin" ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
                                                <Shield className="w-3 h-3" /> Admin
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                                                <UserIcon className="w-3 h-3" /> User
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="space-y-1.5">
                                            <div className="text-sm text-zinc-300 flex items-center gap-1.5">
                                                <Award className="w-4 h-4 text-blue-400" />
                                                <span className="font-semibold text-white">{user.xp}</span> XP
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                {user.solvedProblems?.length || 0} Solved
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-zinc-400 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(user.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && (
                        <div className="p-12 text-center text-zinc-500">
                            No users found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

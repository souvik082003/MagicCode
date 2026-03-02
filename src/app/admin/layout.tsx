import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-950">
                    <ShieldAlert className="w-16 h-16 text-red-500 mb-6" />
                    <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
                    <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                        You do not have permission to access the admin dashboard. Please sign in as an administrator.
                    </p>
                    <Link
                        href="/"
                        className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col">
            <div className="flex-1 flex overflow-hidden">
                {/* Admin Sidebar */}
                <div className="w-64 border-r border-zinc-800 bg-[#121212] flex flex-col">
                    <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
                        <div className="bg-red-500/10 p-2 rounded-lg text-red-500">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h2 className="font-bold text-zinc-100 tracking-tight">Admin Console</h2>
                    </div>
                    <nav className="flex-1 p-4 space-y-1">
                        <Link href="/admin" className="block px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 font-medium text-sm transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/admin/problems" className="block px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 font-medium text-sm transition-colors">
                            Problem Sets
                        </Link>
                        <Link href="/admin/daily" className="block px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 font-medium text-sm transition-colors">
                            Daily Challenge
                        </Link>
                        <Link href="/admin/users" className="block px-4 py-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100 font-medium text-sm transition-colors">
                            Manage Users
                        </Link>
                    </nav>
                </div>
                {/* Admin Content Area */}
                <div className="flex-1 overflow-y-auto bg-zinc-950">
                    {children}
                </div>
            </div>
        </div>
    );
}

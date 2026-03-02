"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DailyChallengeRedirect() {
    const router = useRouter();

    useEffect(() => {
        fetch("/api/problems/daily")
            .then(res => res.json())
            .then(data => {
                if (data.problemId) {
                    router.push(`/problems/${data.problemId}`);
                } else {
                    toast.error("No daily problem found!");
                    router.push("/problems");
                }
            })
            .catch(() => {
                toast.error("Failed to load daily challenge");
                router.push("/problems");
            });
    }, [router]);

    return (
        <div className="min-h-[calc(100vh-3.5rem)] bg-zinc-950 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
            <p className="text-zinc-500 animate-pulse">Loading today's challenge...</p>
        </div>
    );
}

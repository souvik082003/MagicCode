"use client";

import { Workspace } from "@/components/editor/Workspace";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProblemDefinition } from "@/types/problem";
import { fallbackProblems } from "@/data/fallbackProblems";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function ProblemPage() {
    const params = useParams();
    const { data: session, status } = useSession();
    const [prob, setProb] = useState<ProblemDefinition | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = params?.id as string;
        if (!id) return;

        fetch(`/api/problems/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Problem not found");
                }
                return res.json();
            })
            .then(data => {
                if (!data || !data.problem) throw new Error("Problem not found in response");

                const mappedProblem: ProblemDefinition = {
                    ...data.problem,
                    id: data.problem.problemId || data.problem._id
                };
                setProb(mappedProblem);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error loading problem from DB, checking fallbacks...", err);

                // Fallback rendering
                if (fallbackProblems[id]) {
                    setProb(fallbackProblems[id]);
                }
                setLoading(false);
            });
    }, [params?.id]);

    if (loading || status === "loading") return <div className="p-10 text-center animate-pulse min-h-[calc(100vh-3.5rem)] flex items-center justify-center font-medium">Loading computational environment...</div>;

    // Must be logged in
    if (!session) {
        return (
            <div className="w-full h-[calc(100vh-3.5rem)] bg-background flex flex-col items-center justify-center space-y-4">
                <Lock className="w-16 h-16 text-muted-foreground opacity-50 mb-2" />
                <h2 className="text-3xl font-bold tracking-tight">Authentication Required</h2>
                <p className="text-muted-foreground max-w-md text-center">
                    You must be logged in to access the MagicCode problem engine and save your progress to your profile.
                </p>
                <div className="flex gap-4 mt-6">
                    <Button asChild size="lg"><Link href="/login">Login Now</Link></Button>
                    <Button asChild variant="outline" size="lg"><Link href="/signup">Create Account</Link></Button>
                </div>
            </div>
        );
    }

    if (!prob) {
        return notFound();
    }

    return (
        <div className="w-full h-[calc(100vh-3.5rem)] bg-background">
            <Workspace problem={prob} />
        </div>
    );
}

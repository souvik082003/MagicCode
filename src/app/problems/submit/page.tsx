"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash, ArrowLeft, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface TestCase {
    input: string;
    expectedOutput: string;
}

export default function SubmitQuestionPage() {
    const router = useRouter();
    const { data: session, status: authStatus } = useSession();

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
    const [category, setCategory] = useState("Custom");
    const [language, setLanguage] = useState("javascript");
    const [description, setDescription] = useState("");
    const [template, setTemplate] = useState("");
    const [testCases, setTestCases] = useState<TestCase[]>([{ input: "", expectedOutput: "" }]);
    const [submitting, setSubmitting] = useState(false);

    const handleAddTestCase = () => {
        setTestCases([...testCases, { input: "", expectedOutput: "" }]);
    };

    const handleRemoveTestCase = (index: number) => {
        if (testCases.length > 1) {
            setTestCases(testCases.filter((_, i) => i !== index));
        }
    };

    const handleTestCaseChange = (index: number, field: keyof TestCase, value: string) => {
        const newTestCases = [...testCases];
        newTestCases[index] = { ...newTestCases[index], [field]: value };
        setTestCases(newTestCases);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            toast.error("Please fill in the title and description.");
            return;
        }

        const validTestCases = testCases.filter(tc => tc.input.trim() !== "" || tc.expectedOutput.trim() !== "");
        if (validTestCases.length === 0) {
            toast.error("Please provide at least one test case.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/problems/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    difficulty,
                    category,
                    language,
                    description,
                    template,
                    testCases: validTestCases
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to submit");
            }

            toast.success("🎉 Your question has been submitted for admin review!");
            router.push("/problems");
        } catch (error: any) {
            toast.error(error.message || "Failed to submit question.");
        } finally {
            setSubmitting(false);
        }
    };

    if (authStatus === "loading") {
        return (
            <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (authStatus === "unauthenticated") {
        return (
            <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-4 p-8">
                <h2 className="text-2xl font-bold">Sign in Required</h2>
                <p className="text-muted-foreground">You need to be logged in to submit a question.</p>
                <Button asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <Button variant="ghost" asChild className="mb-2">
                <Link href="/problems">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Problems
                </Link>
            </Button>

            <div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Submit a Question</h1>
                <p className="text-muted-foreground">
                    Create a coding challenge for the community. Your question will be reviewed by an admin before it goes live.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Question Details</CardTitle>
                        <CardDescription>Tell us about your coding challenge.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Find the Maximum Subarray"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Difficulty</Label>
                                <Select value={difficulty} onValueChange={(v: "Easy" | "Medium" | "Hard") => setDifficulty(v)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Easy">Easy</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="e.g. Arrays, Trees"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Language</Label>
                                <Select value={language} onValueChange={setLanguage}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="javascript">JavaScript</SelectItem>
                                        <SelectItem value="python">Python</SelectItem>
                                        <SelectItem value="cpp">C++</SelectItem>
                                        <SelectItem value="c">C</SelectItem>
                                        <SelectItem value="java">Java</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the problem clearly. What should the user implement?"
                                className="min-h-[150px]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="template">Starter Code <span className="text-muted-foreground text-xs ml-2">(Optional)</span></Label>
                            <Textarea
                                id="template"
                                value={template}
                                onChange={(e) => setTemplate(e.target.value)}
                                placeholder="Provide boilerplate code for the user to start with..."
                                className="min-h-[120px] font-mono text-sm"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Test Cases</CardTitle>
                        <CardDescription>Define inputs and expected outputs to validate solutions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {testCases.map((tc, idx) => (
                            <div key={idx} className="p-4 rounded-xl border relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => handleRemoveTestCase(idx)}
                                        disabled={testCases.length === 1}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                                <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Test Case #{idx + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs">Input (stdin)</Label>
                                        <Textarea
                                            value={tc.input}
                                            onChange={(e) => handleTestCaseChange(idx, "input", e.target.value)}
                                            className="font-mono text-sm min-h-[100px]"
                                            placeholder="Input values..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs">Expected Output (stdout)</Label>
                                        <Textarea
                                            value={tc.expectedOutput}
                                            onChange={(e) => handleTestCaseChange(idx, "expectedOutput", e.target.value)}
                                            className="font-mono text-sm min-h-[100px]"
                                            placeholder="Expected output..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button type="button" variant="outline" className="w-full border-dashed" onClick={handleAddTestCase}>
                            <Plus className="w-4 h-4 mr-2" /> Add Another Test Case
                        </Button>
                    </CardContent>
                    <CardFooter className="border-t py-4 px-6 flex justify-end">
                        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto font-bold bg-emerald-600 hover:bg-emerald-500 text-white">
                            {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                            Submit for Review
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}

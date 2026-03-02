"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { SupportedLanguage, TestCase } from "@/types/problem";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash, ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminEditProblemPage() {
    const router = useRouter();
    const params = useParams();
    const problemId = params.id as string;
    const { data: session } = useSession();

    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
    const [category, setCategory] = useState("Custom");
    const [language, setLanguage] = useState<SupportedLanguage>("javascript");
    const [description, setDescription] = useState("");
    const [template, setTemplate] = useState("");
    const [driverCode, setDriverCode] = useState("");
    const [companies, setCompanies] = useState("");
    const [topics, setTopics] = useState("");
    const [testCases, setTestCases] = useState<TestCase[]>([{ input: "", expectedOutput: "" }]);

    useEffect(() => {
        if (!problemId) return;

        // Fetch the existing problem
        fetch(`/api/problems/${problemId}`)
            .then(res => res.json())
            .then(data => {
                if (data.problem) {
                    const p = data.problem;
                    setTitle(p.title || "");
                    setDifficulty(p.difficulty || "Easy");
                    setCategory(p.category || "Custom");
                    setLanguage(p.language || "javascript");
                    setDescription(p.description || "");
                    setTemplate(p.template || "");
                    setDriverCode(p.driverCode || "");
                    setCompanies((p.companies || []).join(", "));
                    setTopics((p.topics || []).join(", "));
                    setTestCases(p.testCases && p.testCases.length > 0 ? p.testCases : [{ input: "", expectedOutput: "" }]);
                } else {
                    toast.error("Problem not found.");
                    router.push("/admin/problems");
                }
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load problem metadata.");
                setLoading(false);
            });
    }, [problemId, router]);

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
            toast.error("Please fill in all required fields (Title and Description).");
            return;
        }

        const validTestCases = testCases.filter(tc => tc.input.trim() !== "" || tc.expectedOutput.trim() !== "");
        if (validTestCases.length === 0) {
            toast.error("Please provide at least one valid test case.");
            return;
        }

        const companyArray = companies.split(",").map(c => c.trim()).filter(c => c !== "");
        const topicArray = topics.split(",").map(t => t.trim()).filter(t => t !== "");

        const updatedProblem = {
            title,
            difficulty,
            category,
            language,
            description,
            template,
            driverCode,
            companies: companyArray,
            topics: topicArray,
            testCases: validTestCases
        };

        try {
            const res = await fetch(`/api/problems/${problemId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProblem),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to update problem");
            }

            toast.success("Problem updated successfully!");
            router.push("/admin/problems");
        } catch (error: any) {
            toast.error(error.message || "Failed to update problem.");
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
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <Button variant="ghost" asChild className="mb-2 hover:bg-muted text-zinc-400">
                <Link href="/admin/problems">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Problem Sets
                </Link>
            </Button>

            <div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white">Edit Problem</h1>
                <p className="text-zinc-400">Modify an existing coding challenge and standard input output values.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="bg-[#1e1e1e] border-zinc-800 text-zinc-100">
                    <CardHeader>
                        <CardTitle>Problem Details</CardTitle>
                        <CardDescription className="text-zinc-500">Basic information about your coding challenge.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-zinc-300">Problem Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Detect Cycle in a Graph"
                                className="bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Difficulty</Label>
                                <Select value={difficulty} onValueChange={(v: "Easy" | "Medium" | "Hard") => setDifficulty(v)}>
                                    <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-200">
                                        <SelectValue placeholder="Select Difficulty" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1e1e1e] border-zinc-800 text-zinc-300">
                                        <SelectItem value="Easy" className="text-green-500">Easy</SelectItem>
                                        <SelectItem value="Medium" className="text-yellow-500">Medium</SelectItem>
                                        <SelectItem value="Hard" className="text-red-500">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-zinc-300">Category</Label>
                                <Input
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="e.g. Graph Theory"
                                    className="bg-zinc-950 border-zinc-800"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-zinc-300">Default Language</Label>
                                <Select value={language} onValueChange={(v: SupportedLanguage) => setLanguage(v)}>
                                    <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-200">
                                        <SelectValue placeholder="Language" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1e1e1e] border-zinc-800 text-zinc-300">
                                        <SelectItem value="javascript">JavaScript (Node)</SelectItem>
                                        <SelectItem value="python">Python 3.10</SelectItem>
                                        <SelectItem value="cpp">C++</SelectItem>
                                        <SelectItem value="c">C</SelectItem>
                                        <SelectItem value="java">Java 15</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="companies" className="text-zinc-300">Companies (comma separated)</Label>
                                <Input
                                    id="companies"
                                    value={companies}
                                    onChange={(e) => setCompanies(e.target.value)}
                                    placeholder="e.g. Adobe, Google, Amazon"
                                    className="bg-zinc-950 border-zinc-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="topics" className="text-zinc-300">Topics (comma separated)</Label>
                                <Input
                                    id="topics"
                                    value={topics}
                                    onChange={(e) => setTopics(e.target.value)}
                                    placeholder="e.g. Arrays, Sorting, Binary Search"
                                    className="bg-zinc-950 border-zinc-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-zinc-300">Description (HTML allowed) <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write your problem description here. You can use basic HTML tags like <p>, <code>, <pre>..."
                                className="min-h-[150px] font-mono text-sm bg-zinc-950 border-zinc-800"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="template" className="text-zinc-300">Starter Code Template <span className="text-zinc-500 text-xs ml-2">(Optional)</span></Label>
                            <Textarea
                                id="template"
                                value={template}
                                onChange={(e) => setTemplate(e.target.value)}
                                placeholder="Provide the starting boilerplate code for the user..."
                                className="min-h-[200px] font-mono text-sm bg-zinc-950 text-zinc-300 border-zinc-800 focus:border-zinc-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="driverCode" className="text-zinc-300">Hidden Driver Code (Optional) </Label>
                            <CardDescription className="mb-2 text-zinc-500">
                                Use the <code className="bg-zinc-900 px-1 py-0.5 rounded text-white border border-zinc-800">{"{{USER_CODE}}"}</code> macro to inject the user's submitted solution block into a hidden <code className="bg-zinc-900 px-1 py-0.5 rounded text-white border border-zinc-800">main()</code> function.
                            </CardDescription>
                            <Textarea
                                id="driverCode"
                                value={driverCode}
                                onChange={(e) => setDriverCode(e.target.value)}
                                placeholder={`#include <iostream>\n#include <vector>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    // Hidden testing logic here \n}`}
                                className="min-h-[200px] font-mono text-sm bg-zinc-950/50 border-dashed text-zinc-400 border-zinc-800 focus:border-zinc-700"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#1e1e1e] border-zinc-800 text-zinc-100">
                    <CardHeader>
                        <CardTitle>Test Cases</CardTitle>
                        <CardDescription className="text-zinc-500">Define the exact standard inputs and expected outputs.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {testCases.map((tc, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="h-8 w-8 bg-red-500 hover:bg-red-600"
                                        onClick={() => handleRemoveTestCase(idx)}
                                        disabled={testCases.length === 1}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                                <h4 className="text-sm font-semibold mb-3 text-zinc-500 uppercase tracking-wide">Test Case #{idx + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-zinc-400">Input (stdin)</Label>
                                        <Textarea
                                            value={tc.input}
                                            onChange={(e) => handleTestCaseChange(idx, "input", e.target.value)}
                                            className="font-mono text-sm min-h-[100px] bg-zinc-950 border-zinc-800"
                                            placeholder="Standard Input values..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs text-zinc-400">Expected Output (stdout)</Label>
                                        <Textarea
                                            value={tc.expectedOutput}
                                            onChange={(e) => handleTestCaseChange(idx, "expectedOutput", e.target.value)}
                                            className="font-mono text-sm min-h-[100px] bg-zinc-950 border-zinc-800"
                                            placeholder="Exact expected standard output..."
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button type="button" variant="outline" className="w-full border-dashed border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white" onClick={handleAddTestCase}>
                            <Plus className="w-4 h-4 mr-2" /> Add Another Test Case
                        </Button>
                    </CardContent>
                    <CardFooter className="bg-[#191919] border-t border-zinc-800 py-4 px-6 flex justify-end">
                        <Button type="submit" size="lg" className="w-full sm:w-auto font-bold shadow-lg bg-green-600 hover:bg-green-500 text-white">
                            <Save className="w-4 h-4 mr-2" /> Save Problem
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}

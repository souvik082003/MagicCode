import Link from "next/link";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
            <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Button variant="ghost" asChild className="mb-8 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                </Button>

                <div className="space-y-4 mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4">
                        <BookOpen className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Terms & Conditions</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">Effective Date: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
                    <section className="bg-white dark:bg-[#18181b] p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm leading-relaxed mb-12">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            The Innovator Behind MagicCode
                            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-300">
                            MagicCode is the brainchild and solo innovation of <strong>Souvik Samanta</strong>. Driven by a deep love for technology, algorithms, and continuous improvement, Souvik designed this platform from the ground up to revolutionize coding education. By using MagicCode, you are directly supporting the vision of an indie developer who believes that mastering Computer Science should feel as exciting and engaging as playing a game.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1. Acceptance of Terms</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            By accessing and using MagicCode, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you are prohibited from using the platform and its coding services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">2. Platform Usage and Conduct</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            MagicCode provides interactive learning paths, code compilers, and competitive leaderboards. You agree to use the platform for educational purposes. Any attempt to abuse the compiler engine, submit malicious scripts, or artificially inflate your leaderboard XP is strictly forbidden and will result in an immediate account ban by the platform administrators.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">3. Intellectual Property</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            The core platform architecture, gamified UI concepts, and the name "MagicCode" are the intellectual property of Subvik Samanta. However, the custom code you write, submit, and proudly publish to the platform remains yours.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">4. Disclaimer of Warranties</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            MagicCode is provided on an "as is" and "as available" basis. While Souvik Samanta strives to ensure the algorithmic execution engine runs flawlessly, there are no absolute warranties guaranteeing that the servers will be permanently online or entirely error-free. User discretion is advised.
                        </p>
                    </section>

                    <section className="mt-12 p-6 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-center border border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-500 font-medium">Questions about these terms? Reach out to <a href="mailto:work03.souvik@gmail.com" className="text-emerald-500 hover:underline">work03.souvik@gmail.com</a>.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

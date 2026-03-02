import Link from "next/link";
import { ArrowLeft, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
            <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Button variant="ghost" asChild className="mb-8 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>
                </Button>

                <div className="space-y-4 mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-4">
                        <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">Privacy Policy</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
                    <section className="bg-white dark:bg-[#18181b] p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm leading-relaxed">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            A Message from the Creator
                            <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-300">
                            Welcome to MagicCode. This platform was born out of a profound passion for computer science and a relentless drive for innovation. I am <strong>Souvik Samanta</strong>, the sole architect and creator behind this project. As someone who loves pushing the boundaries of what is possible in educational technology, I built MagicCode to transform the way we learn, code, and grow together. Protecting your privacy is just as important to me as delivering a world-class coding experience.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">1. Information We Collect</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            When you register an account, solve a coding challenge, or interact with our learning paths, we collect minimal necessary data to ensure your progression is saved correctly. This includes your OAuth profile information (name and email) and your submitted code solutions.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">2. How We Use Your Data</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Your data powers the gamified experience. It allows us to calculate your XP, rank you on the global leaderboard, and securely save your coding workspace preferences. We strictly utilize your information to improve the platform's core algorithmic engines and do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">3. Data Security & Storage</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            MagicCode relies on modern, robust database infrastructure to safely store your code submissions and user profiles. We implement industry-standard encryption practices to secure your data at rest and over the wire.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">4. Contact the Developer</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Innovation thrives on feedback. If you have questions about this Privacy Policy, your data, or just want to discuss some cool algorithms, please reach out to me directly at:
                        </p>
                        <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                            <p className="font-medium text-zinc-900 dark:text-zinc-100">Souvik Samanta</p>
                            <a href="mailto:work03.souvik@gmail.com" className="text-emerald-500 hover:text-emerald-400 transition-colors">work03.souvik@gmail.com</a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

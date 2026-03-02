"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Code2, Rocket, BrainCircuit, Trophy, Users, Zap, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl ring-1 ring-primary/20">
              <Terminal className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Master <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500">Core Programming & DSA</span>
          </h1>
          <p className="text-xl text-muted-foreground w-full max-w-3xl mx-auto leading-relaxed mt-6">
            The ultimate ecosystem to learn programming, execute code in real-time, conquer gamified algorithmic challenges, and track your progression on global leaderboards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
              <Link href="/learning-paths">
                Gamified Learning <Rocket className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full" asChild>
              <Link href="/problems">
                Practice Problems <Code2 className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background border-t border-border relative">
        {/* subtle background glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Everything You Need to Excel</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide a comprehensive, modern environment to deeply understand computer science and build robust logic from the ground up.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BrainCircuit className="w-8 h-8 text-blue-500" />,
                title: "Gamified Roadmaps",
                description: "Carefully designed, interactive 'Candy Crush' style learning paths safely guiding you from basic syntax to advanced OOPs concepts.",
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-500" />,
                title: "In-Browser Execution",
                description: "Write, safely compile, and run C, C++, and Java code directly in your browser instantly without any frustrating local IDE setup.",
              },
              {
                icon: <Code2 className="w-8 h-8 text-purple-500" />,
                title: "LeetCode Style Challenges",
                description: "Solve problems, pass strict automated test case evaluations, review memory constraints, and track your algorithmic mastery in real-time.",
              },
              {
                icon: <LayoutList className="w-8 h-8 text-emerald-500" />,
                title: "Company Specific Coding",
                description: "Tackle technical interview questions curated from top tech giants properly organized with community tags and difficulty filters.",
              },
              {
                icon: <Trophy className="w-8 h-8 text-orange-500" />,
                title: "Global Leaderboards",
                description: "Earn XP, unlock progression badges, and race your competitive way to the top of the global rankings by consistently solving daily coding challenges.",
              },
              {
                icon: <Users className="w-8 h-8 text-indigo-500" />,
                title: "Community Solutions",
                description: "Proudly publish your accepted solutions, upvote the brightest approaches, and discuss the best paths to algorithmic success with the community.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card p-8 rounded-3xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-6 p-3 bg-secondary/50 w-fit rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-zinc-50 dark:bg-zinc-900 border-t border-border">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your frictionless pipeline from an absolute beginner to an advanced algorithms expert.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 -z-10" />

            {[
              {
                step: "01",
                title: "Learn The Concepts",
                color: "text-emerald-500 bg-emerald-500/10",
                description: "Follow the gamified roadmaps. Read bite-sized visual explanations of deep memory management and data structures.",
              },
              {
                step: "02",
                title: "Solve Challenges",
                color: "text-blue-500 bg-blue-500/10",
                description: "Jump into the browser IDE. Write your solution and run automated test cases to prove your logic works flawlessly.",
              },
              {
                step: "03",
                title: "Climb the Ranks",
                color: "text-purple-500 bg-purple-500/10",
                description: "Earn XP for each solved problem. Compare your runtime efficiency against the community and climb the global leaderboards.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="flex flex-col items-center text-center space-y-4 relative"
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black ${item.color} shadow-lg ring-4 ring-background z-10`}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mt-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MagicCodeHub Section */}
      <section className="py-24 px-4 bg-zinc-50 dark:bg-zinc-900/20 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-12 text-center text-zinc-800 dark:text-zinc-200">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Why We Built MagicCodeHub</h2>
            <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
              Learning to code is often isolated and overwhelming. Most platforms either drop you into an intimidating blank text editor or bore you with static unstructured articles.
            </p>
            <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
              MagicCode was engineered to bridge that gap. We designed a vibrant sandbox that turns complex low-level programming operations and algorithms into a <span className="font-bold text-emerald-600">gamified, visual, and socially competitive experience</span>.
            </p>
            <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium pt-4">
              We believe that understanding the core mechanics of memory and algorithms is the most powerful magic trick a developer can master.
            </p>
          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-24 px-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 border-t border-border relative overflow-hidden">
        {/* subtle background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Ready to Write Better Code?</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Join the platform that treats computer science like a game. Create an account, pick a learning path, and start conquering algorithms today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto font-bold bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/learning-paths">
                Start Playing <Rocket className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors" asChild>
              <Link href="/signup">
                Create Free Account
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}

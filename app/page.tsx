"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, CheckCircle2, Gamepad2, Shield, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          {/* Project Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full">
              <Gamepad2 className="text-purple-400" size={18} />
              <span className="text-purple-300 text-sm font-semibold">Project Submission</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Game Asset
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A modern Next.js application for managing and exploring game NFT assets with wallet integration and responsive design.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                View Dashboard
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.button>
            </a>
            
          
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Wallet Integration</h3>
              <p className="text-gray-400">Connect your wallet to view and manage your owned assets with highlighted ownership indicators.</p>
            </div>

            <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Responsive Design</h3>
              <p className="text-gray-400">Fully responsive interface built with Tailwind CSS, optimized for all screen sizes and devices.</p>
            </div>

            <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Gamepad2 className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Asset Management</h3>
              <p className="text-gray-400">Browse, filter, and search through game assets with detailed modal views and animations.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Project Requirements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Functional React components with TypeScript",
              "Responsive grid layout for asset display",
              "Mock wallet connection functionality",
              "Asset ownership highlighting",
              "Tailwind CSS styling",
              "Filter system for owned assets",
              "Search by name and owner address",
              "Smooth animations with Framer Motion"
            ].map((requirement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <span className="text-gray-300">{requirement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tech Stack */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Built With</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Next.js", "TypeScript", "React", "Tailwind CSS", "Framer Motion", "Lucide Icons"].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-gray-300 font-semibold"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
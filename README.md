# Web-Based Maze Navigation System Using Depth First Search

**Display Title:** DFS Maze Solver

A complete, production-ready web application built for a university Intelligent Systems Design assignment. This interactive educational tool demonstrates how Depth-First Search (DFS) state-space exploration works in a deterministic navigation environment.

## 🚀 Features

- **Interactive Maze Generation:** Uses Recursive Backtracking to generate guaranteed solvable mazes with adjustable sizes (Small, Medium, Large, Huge).
- **Live Algorithm Visualization:** Watch the AI traverse the maze step-by-step.
- **Three Selectable AI Difficulties:**
  - *Easy*: Randomized/inefficient uninformed search.
  - *Medium*: Fixed directional preference uninformed search.
  - *Hard*: Goal-biased heuristically ordered search (while retaining a strict DFS stack execution).
- **Manual Player Mode:** Navigate the maze using the W, A, S, D or Arrow keys.
- **Comprehensive Statistics Panel:** Track nodes visited, backtracks, path length, and time elapsed in real-time.
- **Academic Explanation Panel:** Explaining the rationale and theoretical behavior of the algorithm.
- **Playback Controls:** Pause, resume, step-forward, and speed adjustment.

## 🧠 Educational Relevance

This project demonstrates several core concepts of Intelligent Systems Design:
- **State-Space Exploration:** Navigating a discrete grid-based environment.
- **Depth-First Search (DFS):** An uninformed search strategy that explores a branch deeply before utilizing its LIFO (Last-In-First-Out) stack to backtrack upon hitting dead-ends.
- **Algorithmic Tradeoffs:** Showing how varying the neighbor prioritization (random vs fixed vs heuristic-based) drastically changes the apparent "intelligence" of the agent, even while the underlying algorithm remains strict DFS.

## 🏗️ Tech Stack

- Next.js (App Router)
- React 18
- TypeScript (Strict Typing)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- Lucide React (Icons)

## 💻 Setup Instructions

To run this project locally, ensure you have Node.js (v18+ recommended) and `npm` installed.

1. **Clone or Download the Project:**
   Navigate to the `dfs-maze-solver` directory in your terminal.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
4. **Open in Browser:**
   Visit `http://localhost:3000` to interact with the application.

## 🚢 Vercel Deployment Instructions

This project is built using Next.js and is inherently designed to deploy seamlessly on Vercel without requiring complex configuration.

1. **Create a GitHub Repository:**
   Initialize Git in your project folder, commit your files, and push them to a new GitHub repository.
   ```bash
   git init
   git add .
   git commit -m "Initial commit - DFS Maze Solver"
   git branch -M main
   git remote add origin https://github.com/YourUsername/YourRepoName.git
   git push -u origin main
   ```
2. **Import to Vercel:**
   - Go to [Vercel](https://vercel.com/) and log in.
   - Click **Add New...** -> **Project**.
   - Connect your GitHub account and import the repository you just created.
3. **Configure & Deploy:**
   - Framework Preset should automatically be detected as **Next.js**.
   - Root Directory should be correct (or set it if you placed `dfs-maze-solver` in a subfolder).
   - Click **Deploy**. Vercel will install dependencies, build the project, and provide you with a live URL.

## 📝 Architecture Overview

- `src/lib/mazeGenerator.ts`: Handles the recursive backtracking generation.
- `src/lib/dfsSolver.ts`: Contains the Generator function for step-by-step DFS execution.
- `src/hooks/useMaze.ts`: The central state management Hook.
- `src/components/`: Modular, decoupled React components for UI rendering.
- `src/app/page.tsx`: The main integration view.

---
*Created as an academic submission for Intelligent Systems Design.*

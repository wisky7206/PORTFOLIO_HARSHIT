"use client"

import { motion, type MotionValue, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"

interface CodeTerminalProps {
  springX: MotionValue<number>
  springY: MotionValue<number>
}

// Code snippets to display
const codeSnippets = [
  {
    language: "python",
    title: "Neural Network",
    code: `class NeuralNetwork:
  def __init__(self, layers):
    self.layers = layers
    self.weights = self._initialize_weights()
    
  def forward(self, x):
    for layer in self.layers:
      x = layer.activate(x)
    return x
    
  def train(self, X, y, epochs=100):
    for epoch in range(epochs):
      predictions = self.forward(X)
      self._backpropagate(y, predictions)`,
  },
  {
    language: "javascript",
    title: "Async Data Fetching",
    code: `async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    
    return data.map(item => ({
      id: item.id,
      value: processValue(item.value),
      timestamp: new Date(item.timestamp)
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}`,
  },
  {
    language: "cpp",
    title: "Graph Algorithm",
    code: `template <typename T>
class Graph {
private:
  vector<vector<T>> adjList;
  
public:
  void addEdge(T u, T v) {
    adjList[u].push_back(v);
  }
  
  vector<T> shortestPath(T start, T end) {
    queue<T> q;
    map<T, T> parent;
    
    q.push(start);
    
    while (!q.empty()) {
      T current = q.front();
      q.pop();
      
      if (current == end) break;
      
      for (T neighbor : adjList[current]) {
        if (!parent.count(neighbor)) {
          parent[neighbor] = current;
          q.push(neighbor);
        }
      }
    }
    
    return reconstructPath(parent, start, end);
  }
};`,
  },
]

export function CodeTerminal({ springX, springY }: CodeTerminalProps) {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)
  const [displayedCode, setDisplayedCode] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [glitchActive, setGlitchActive] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Transform values for terminal movement
  const translateX = useTransform(springX, [0, 1000], [-5, 5])
  const translateY = useTransform(springY, [0, 1000], [-5, 5])
  const rotateX = useTransform(springY, [0, 1000], [2, -2])
  const rotateY = useTransform(springX, [0, 1000], [-2, 2])

  // Typing effect
  useEffect(() => {
    if (!isTyping) return

    const currentSnippet = codeSnippets[currentSnippetIndex].code

    if (cursorPosition < currentSnippet.length) {
      const typingSpeed = Math.random() * 30 + 10 // Random typing speed between 10ms and 40ms

      const timeout = setTimeout(() => {
        setDisplayedCode(currentSnippet.substring(0, cursorPosition + 1))
        setCursorPosition(cursorPosition + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    } else {
      // Finished typing current snippet
      const timeout = setTimeout(() => {
        setIsTyping(false)

        // Schedule next snippet
        setTimeout(() => {
          setCursorPosition(0)
          setDisplayedCode("")
          setCurrentSnippetIndex((currentSnippetIndex + 1) % codeSnippets.length)
          setIsTyping(true)
        }, 5000) // Wait 5 seconds before starting next snippet
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [cursorPosition, currentSnippetIndex, isTyping])

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of glitch
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  // Syntax highlighting (simplified for black and white theme)
  const highlightSyntax = (code: string) => {
    // Replace keywords with styled spans
    const keywords = [
      "class",
      "def",
      "return",
      "for",
      "in",
      "range",
      "if",
      "else",
      "try",
      "catch",
      "async",
      "await",
      "function",
      "const",
      "let",
      "var",
      "import",
      "from",
      "template",
      "private",
      "public",
      "while",
      "break",
      "vector",
      "map",
      "queue",
      "push",
      "pop",
    ]

    let highlightedCode = code

    // Highlight keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g")
      highlightedCode = highlightedCode.replace(regex, `<span class="text-white font-bold">${keyword}</span>`)
    })

    // Highlight strings
    highlightedCode = highlightedCode.replace(/'([^']*)'/g, "<span class=\"text-gray-300\">'$1'</span>")
    highlightedCode = highlightedCode.replace(/"([^"]*)"/g, '<span class="text-gray-300">"$1"</span>')

    // Highlight comments
    highlightedCode = highlightedCode.replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')

    // Highlight numbers
    highlightedCode = highlightedCode.replace(/\b(\d+)\b/g, '<span class="text-gray-200">$1</span>')

    return highlightedCode
  }

  return (
    <motion.div
      className="w-full h-full max-w-[500px] max-h-[500px]"
      style={{
        x: translateX,
        y: translateY,
        rotateX,
        rotateY,
      }}
    >
      <div
        className={`relative w-full h-full border border-white border-opacity-40 bg-black bg-opacity-70 backdrop-blur-sm overflow-hidden
          ${glitchActive ? "animate-[glitch_0.2s_ease-in-out]" : ""}`}
        ref={terminalRef}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white border-opacity-20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-white bg-opacity-50"></div>
            <div className="w-3 h-3 rounded-full bg-white bg-opacity-30"></div>
            <div className="w-3 h-3 rounded-full bg-white bg-opacity-20"></div>
          </div>
          <div className="text-xs font-mono text-white opacity-70">
            {codeSnippets[currentSnippetIndex].title}.{codeSnippets[currentSnippetIndex].language}
          </div>
          <div className="text-xs font-mono text-white opacity-70">{new Date().toLocaleTimeString()}</div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 font-mono text-sm text-white overflow-auto h-[calc(100%-40px)]">
          {/* Line numbers */}
          <div className="flex">
            <div className="text-gray-500 select-none pr-4 text-right w-8">
              {displayedCode.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code with syntax highlighting */}
            <div className="flex-1">
              <div
                dangerouslySetInnerHTML={{
                  __html: highlightSyntax(displayedCode) + (isTyping ? '<span class="animate-pulse">|</span>' : ""),
                }}
                className="whitespace-pre"
              />
            </div>
          </div>
        </div>

        {/* Glitch Effects */}
        {glitchActive && (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-30" />
            <div className="absolute top-1/3 left-0 w-full h-0.5 bg-white opacity-20" />
            <div className="absolute top-2/3 left-0 w-full h-0.5 bg-white opacity-10" />
            <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white opacity-20" />
            <div className="absolute top-0 left-3/4 w-0.5 h-full bg-white opacity-10" />
          </>
        )}

        {/* Terminal Scan Line */}
        <motion.div
          className="absolute left-0 w-full h-[2px] bg-white opacity-5 pointer-events-none"
          animate={{
            top: ["0%", "100%"],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Reflection */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-[0.03] pointer-events-none" />
      </div>

      {/* Terminal Shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-white opacity-5 blur-md" />

      {/* Floating Binary */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[10px] font-mono text-white opacity-20 pointer-events-none"
          initial={{
            x: Math.random() * 500 - 250,
            y: Math.random() * 500 - 250,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </motion.div>
      ))}
    </motion.div>
  )
}

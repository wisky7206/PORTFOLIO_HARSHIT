"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState, useRef } from "react"

interface CodeDisplayProps {
  className?: string
}

// Define the algorithm to visualize - Binary Search Tree operations
const bstOperations = [
  { type: "insert", value: 50, delay: 1000 },
  { type: "insert", value: 30, delay: 1500 },
  { type: "insert", value: 70, delay: 2000 },
  { type: "insert", value: 20, delay: 2500 },
  { type: "insert", value: 40, delay: 3000 },
  { type: "insert", value: 60, delay: 3500 },
  { type: "insert", value: 80, delay: 4000 },
  { type: "search", value: 40, delay: 5000 },
  { type: "search", value: 90, delay: 6500 },
  { type: "delete", value: 30, delay: 8000 },
  { type: "insert", value: 35, delay: 10000 },
]

// Node class for BST
class TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
  x: number
  y: number
  id: string

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
    this.x = 0
    this.y = 0
    this.id = `node-${value}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// BST class
class BinarySearchTree {
  root: TreeNode | null
  nodes: TreeNode[]
  edges: { from: string; to: string; id: string }[]

  constructor() {
    this.root = null
    this.nodes = []
    this.edges = []
  }

  insert(value: number) {
    const newNode = new TreeNode(value)

    if (!this.root) {
      this.root = newNode
      this.nodes.push(newNode)
      return this
    }

    this._insertNode(this.root, newNode)
    this.nodes.push(newNode)
    return this
  }

  _insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
        this.edges.push({
          from: node.id,
          to: newNode.id,
          id: `${node.id}-${newNode.id}`,
        })
      } else {
        this._insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
        this.edges.push({
          from: node.id,
          to: newNode.id,
          id: `${node.id}-${newNode.id}`,
        })
      } else {
        this._insertNode(node.right, newNode)
      }
    }
  }

  search(value: number): TreeNode | null {
    return this._searchNode(this.root, value)
  }

  _searchNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) return null

    if (value === node.value) return node

    if (value < node.value) {
      return this._searchNode(node.left, value)
    } else {
      return this._searchNode(node.right, value)
    }
  }

  delete(value: number) {
    this.root = this._deleteNode(this.root, value)
    // Update nodes and edges
    this._updateNodesAndEdges()
    return this
  }

  _deleteNode(root: TreeNode | null, value: number): TreeNode | null {
    if (root === null) return null

    if (value < root.value) {
      root.left = this._deleteNode(root.left, value)
    } else if (value > root.value) {
      root.right = this._deleteNode(root.right, value)
    } else {
      // Node with only one child or no child
      if (root.left === null) {
        return root.right
      } else if (root.right === null) {
        return root.left
      }

      // Node with two children
      root.value = this._minValue(root.right)
      root.right = this._deleteNode(root.right, root.value)
    }

    return root
  }

  _minValue(node: TreeNode): number {
    let minValue = node.value
    while (node.left !== null) {
      minValue = node.left.value
      node = node.left
    }
    return minValue
  }

  _updateNodesAndEdges() {
    this.nodes = []
    this.edges = []
    this._traverseAndCollect(this.root)
  }

  _traverseAndCollect(node: TreeNode | null) {
    if (node === null) return

    this.nodes.push(node)

    if (node.left) {
      this.edges.push({
        from: node.id,
        to: node.left.id,
        id: `${node.id}-${node.left.id}`,
      })
      this._traverseAndCollect(node.left)
    }

    if (node.right) {
      this.edges.push({
        from: node.id,
        to: node.right.id,
        id: `${node.id}-${node.right.id}`,
      })
      this._traverseAndCollect(node.right)
    }
  }

  calculatePositions(width: number, height: number) {
    if (!this.root) return

    const levelWidth: { [key: number]: number } = {}
    const nodePositions: { [key: string]: { level: number; position: number } } = {}

    // First pass: determine the level and horizontal position of each node
    const traverse = (node: TreeNode | null, level: number, position: number) => {
      if (!node) return

      if (!levelWidth[level]) levelWidth[level] = 0
      levelWidth[level]++

      nodePositions[node.id] = { level, position }

      traverse(node.left, level + 1, position * 2)
      traverse(node.right, level + 1, position * 2 + 1)
    }

    traverse(this.root, 0, 0)

    // Calculate max level
    const maxLevel = Math.max(...Object.keys(levelWidth).map(Number))

    // Second pass: calculate x, y coordinates
    this.nodes.forEach((node) => {
      const pos = nodePositions[node.id]
      if (pos) {
        const levelNodes = levelWidth[pos.level]
        const verticalSpacing = height / (maxLevel + 2)

        // Calculate x position based on the node's position within its level
        const horizontalSpacing = width / Math.pow(2, pos.level)
        node.x = horizontalSpacing * (pos.position + 0.5)

        // Calculate y position based on level
        node.y = verticalSpacing * (pos.level + 1)
      }
    })
  }
}

export function CodeDisplay({ className = "" }: CodeDisplayProps) {
  const [bst] = useState(new BinarySearchTree())
  const [currentOperation, setCurrentOperation] = useState<number>(0)
  const [searchPath, setSearchPath] = useState<string[]>([])
  const [searchResult, setSearchResult] = useState<"found" | "not-found" | null>(null)
  const [deleteSteps, setDeleteSteps] = useState<string[]>([])
  const [codeLines, setCodeLines] = useState<string[]>([])
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")
  const svgRef = useRef<SVGSVGElement>(null)
  const controls = useAnimation()

  // Set up the visualization dimensions
  const width = 500
  const height = 300

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const formattedHours = hours % 12 || 12
      const formattedMinutes = minutes.toString().padStart(2, '0')
      const formattedSeconds = seconds.toString().padStart(2, '0')
      setCurrentTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`)
    }

    updateTime() // Initial update
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Function to update the code display based on the current operation
  const updateCodeDisplay = (operation: (typeof bstOperations)[0], index: number) => {
    let newCodeLines: string[] = []
    let highlightIndex = 0

    if (operation.type === "insert") {
      newCodeLines = [
        `function insert(value) {`,
        `  const newNode = new TreeNode(${operation.value})`,
        `  if (!this.root) {`,
        `    this.root = newNode`,
        `    return this`,
        `  }`,
        `  let current = this.root`,
        `  while (true) {`,
        `    if (value < current.value) {`,
        `      if (current.left === null) {`,
        `        current.left = newNode`,
        `        return this`,
        `      }`,
        `      current = current.left`,
        `    } else {`,
        `      if (current.right === null) {`,
        `        current.right = newNode`,
        `        return this`,
        `      }`,
        `      current = current.right`,
        `    }`,
        `  }`,
        `}`,
      ]

      // Determine which line to highlight based on the BST state
      if (!bst.root) {
        highlightIndex = 3 // Highlight "this.root = newNode"
      } else {
        const path = findInsertPath(bst.root, operation.value)
        const lastNode = path[path.length - 1]

        if (operation.value < lastNode.value) {
          if (lastNode.left === null) {
            highlightIndex = 10 // Highlight "current.left = newNode"
          } else {
            highlightIndex = 12 // Highlight "current = current.left"
          }
        } else {
          if (lastNode.right === null) {
            highlightIndex = 15 // Highlight "current.right = newNode"
          } else {
            highlightIndex = 17 // Highlight "current = current.right"
          }
        }
      }
    } else if (operation.type === "search") {
      newCodeLines = [
        `function search(value) {`,
        `  let current = this.root`,
        `  while (current !== null) {`,
        `    if (value === current.value) {`,
        `      return current // Found`,
        `    }`,
        `    if (value < current.value) {`,
        `      current = current.left`,
        `    } else {`,
        `      current = current.right`,
        `    }`,
        `  }`,
        `  return null // Not found`,
        `}`,
      ]

      // Calculate search path and highlight appropriate line
      const path: string[] = []
      let result: "found" | "not-found" | null = null
      let current = bst.root

      while (current !== null) {
        path.push(current.id)

        if (operation.value === current.value) {
          result = "found"
          highlightIndex = 4 // Highlight "return current // Found"
          break
        }

        if (operation.value < current.value) {
          highlightIndex = 7 // Highlight "current = current.left"
          current = current.left
        } else {
          highlightIndex = 9 // Highlight "current = current.right"
          current = current.right
        }
      }

      if (result !== "found") {
        result = "not-found"
        highlightIndex = 11 // Highlight "return null // Not found"
      }

      setSearchPath(path)
      setSearchResult(result)
    } else if (operation.type === "delete") {
      newCodeLines = [
        `function delete(value) {`,
        `  this.root = this._deleteNode(this.root, value)`,
        `  return this`,
        `}`,
        ``,
        `function _deleteNode(root, value) {`,
        `  if (root === null) return null`,
        `  `,
        `  if (value < root.value) {`,
        `    root.left = this._deleteNode(root.left, value)`,
        `  } else if (value > root.value) {`,
        `    root.right = this._deleteNode(root.right, value)`,
        `  } else {`,
        `    // Node with only one child or no child`,
        `    if (root.left === null) {`,
        `      return root.right`,
        `    } else if (root.right === null) {`,
        `      return root.left`,
        `    }`,
        `    `,
        `    // Node with two children`,
        `    root.value = this._minValue(root.right)`,
        `    root.right = this._deleteNode(root.right, root.value)`,
        `  }`,
        `  `,
        `  return root`,
        `}`,
      ]

      // Calculate delete steps and highlight appropriate line
      const steps: string[] = []
      const nodeToDelete = bst.search(operation.value)

      if (nodeToDelete) {
        steps.push(nodeToDelete.id)

        if (!nodeToDelete.left) {
          highlightIndex = 15 // Highlight "return root.right"
        } else if (!nodeToDelete.right) {
          highlightIndex = 17 // Highlight "return root.left"
        } else {
          highlightIndex = 21 // Highlight "root.value = this._minValue(root.right)"

          // Find the successor (min value in right subtree)
          let successor = nodeToDelete.right
          while (successor.left !== null) {
            successor = successor.left
          }
          steps.push(successor.id)
        }
      } else {
        highlightIndex = 6 // Highlight "if (root === null) return null"
      }

      setDeleteSteps(steps)
    }

    setCodeLines(newCodeLines)
    setHighlightedLine(highlightIndex)
  }

  // Helper function to find the path for insertion
  const findInsertPath = (root: TreeNode, value: number): TreeNode[] => {
    const path: TreeNode[] = [root]
    let current = root

    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          return path
        }
        current = current.left
        path.push(current)
      } else {
        if (current.right === null) {
          return path
        }
        current = current.right
        path.push(current)
      }
    }
  }

  // Process operations sequentially
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const processNextOperation = () => {
      if (currentOperation < bstOperations.length) {
        const operation = bstOperations[currentOperation]

        // Update the code display
        updateCodeDisplay(operation, currentOperation)

        // Perform the operation
        if (operation.type === "insert") {
          bst.insert(operation.value)
        } else if (operation.type === "search") {
          bst.search(operation.value)
        } else if (operation.type === "delete") {
          bst.delete(operation.value)
        }

        // Calculate node positions
        if (svgRef.current) {
          const { width, height } = svgRef.current.getBoundingClientRect()
          bst.calculatePositions(width, height)
        } else {
          bst.calculatePositions(width, height)
        }

        // Animate the changes
        controls.start({ opacity: 1, scale: 1, transition: { duration: 0.5 } })

        // Schedule the next operation
        timeout = setTimeout(() => {
          setCurrentOperation(currentOperation + 1)
          // Reset search and delete states
          setSearchPath([])
          setSearchResult(null)
          setDeleteSteps([])
        }, operation.delay)
      } else {
        // Restart the animation after all operations
        timeout = setTimeout(() => {
          setCurrentOperation(0)
          bst.root = null
          bst.nodes = []
          bst.edges = []
        }, 3000)
      }
    }

    processNextOperation()

    return () => clearTimeout(timeout)
  }, [currentOperation, bst, controls])

  // Update positions when the SVG size changes
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        bst.calculatePositions(width, height)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [bst])

  return (
    <div className={`code-display ${className}`}>
      {/* Computer screen border */}
      <div className="relative h-full rounded-md overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        {/* Screen bezel */}
        <div className="absolute inset-0 border border-white/20 rounded-md pointer-events-none z-10"></div>

        {/* Screen inner frame */}
        <div className="h-full bg-black bg-opacity-80 backdrop-blur-sm flex flex-col">
          {/* Screen top bar with buttons */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/50"></div>
              <div className="w-3 h-3 rounded-full bg-white/30"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
            </div>
            <div className="text-xs font-mono text-white/70">Binary Search Tree Visualization</div>
            <div className="text-xs font-mono text-white/70">{currentTime}</div>
          </div>

          {/* Screen content */}
          <div className="flex-1 p-4 overflow-hidden flex flex-col">
            {/* Code section */}
            <div className="font-mono text-xs md:text-sm text-white/80 mb-4 overflow-hidden">
              {codeLines.map((line, index) => (
                <div key={index} className={`py-0.5 ${highlightedLine === index ? "bg-white/10 text-white" : ""}`}>
                  <span className="text-white/40 mr-4">{index + 1}</span>
                  {line}
                </div>
              ))}
            </div>

            {/* Visualization section */}
            <div className="flex-1 relative">
              <svg ref={svgRef} className="w-full h-full absolute inset-0" viewBox={`0 0 ${width} ${height}`}>
                {/* Edges */}
                {bst.edges.map((edge) => {
                  const fromNode = bst.nodes.find((n) => n.id === edge.from)
                  const toNode = bst.nodes.find((n) => n.id === edge.to)

                  if (!fromNode || !toNode) return null

                  const isSearchPath = searchPath.includes(fromNode.id) && searchPath.includes(toNode.id)
                  const isDeletePath = deleteSteps.includes(fromNode.id) && deleteSteps.includes(toNode.id)

                  return (
                    <motion.line
                      key={edge.id}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isSearchPath ? "#ffffff" : isDeletePath ? "#ff4040" : "#ffffff"}
                      strokeWidth={isSearchPath || isDeletePath ? 2 : 1}
                      strokeOpacity={isSearchPath || isDeletePath ? 0.8 : 0.3}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )
                })}

                {/* Nodes */}
                {bst.nodes.map((node) => {
                  const isSearchTarget = searchResult === "found" && searchPath[searchPath.length - 1] === node.id
                  const isSearchPath = searchPath.includes(node.id)
                  const isDeleteTarget = deleteSteps.includes(node.id)

                  return (
                    <motion.g key={node.id} initial={{ opacity: 0, scale: 0 }} animate={controls}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={20}
                        fill="transparent"
                        stroke={
                          isSearchTarget ? "#ffffff" : isDeleteTarget ? "#ff4040" : isSearchPath ? "#a0a0ff" : "#ffffff"
                        }
                        strokeWidth={isSearchTarget || isDeleteTarget ? 2 : 1}
                        strokeOpacity={isSearchTarget || isDeleteTarget ? 1 : isSearchPath ? 0.8 : 0.5}
                      />
                      <text
                        x={node.x}
                        y={node.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={
                          isSearchTarget ? "#ffffff" : isDeleteTarget ? "#ff4040" : isSearchPath ? "#a0a0ff" : "#ffffff"
                        }
                        fillOpacity={isSearchTarget || isDeleteTarget ? 1 : isSearchPath ? 0.8 : 0.7}
                        fontSize={12}
                      >
                        {node.value}
                      </text>
                    </motion.g>
                  )
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Screen effects */}
        <motion.div
          className="absolute left-0 w-full h-[1px] bg-white opacity-5 pointer-events-none"
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

        {/* Screen reflection */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-[0.02] pointer-events-none" />

        {/* Screen glow */}
        <div className="absolute inset-0 rounded-md box-content border border-white/5 pointer-events-none"></div>
      </div>

      {/* Screen shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-white opacity-5 blur-md" />
    </div>
  )
}

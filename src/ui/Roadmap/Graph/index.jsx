import React, { useCallback, useState, useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"; // shadcn sheet
import { Share2, X, PlayCircle, FileText, ListChecks, HelpCircle, CheckCircle2 } from "lucide-react";

import { getRoadmapNodes, getRoadmapEdges } from "@/utils/roadmapHelper";

import { useDispatch } from "react-redux";
import { setSelectedNodeGraph } from "@/store/slices/roadmapSlice";
import { useNavigate } from "react-router-dom"

const nodeWidth = 200;
const nodeHeight = 100;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    const isLeaf = node?.data?.isLeaf;
    const width = isLeaf ? nodeHeight : nodeWidth;
    const height = nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    console.log('nodeWithPosition', nodeWithPosition);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

const Graph = ({ roadmap }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const generatedNodes = getRoadmapNodes(roadmap);
  const generatedEdges = getRoadmapEdges(roadmap);


  // const [nodes, setNodes] = useState([
  //   { id: "1", data: { label: "SQL", description: "Main Topic", status: "completed" }, position: { x: 0, y: 0 } },
  //   { id: "2", data: { label: "Joins", description: "Different types of joins" }, position: { x: 0, y: 0 } },
  //   { id: "3", data: { label: "Indexes", description: "Improving query performance" }, position: { x: 0, y: 0 } },
  //   { id: "4", data: { label: "Subqueries", description: "Using subqueries", status: "in_progress" }, position: { x: 0, y: 0 } },
  //   { id: "5", data: { label: "Window Functions", description: "Using window functions" }, position: { x: 0, y: 0 } },
  //   { id: "6", data: { label: "CTEs", description: "Using CTEs" }, position: { x: 0, y: 0 } },
  //   { id: "7", data: { label: "Common Table Expressions", description: "Using Common Table Expressions" }, position: { x: 0, y: 0 } },
  //   { id: "8", data: { label: "Subqueries", description: "Using subqueries" }, position: { x: 0, y: 0 } },
  //   { id: "9", data: { label: "Window Functions", description: "Using window functions" }, position: { x: 0, y: 0 } },
  //   { id: "10", data: { label: "CTEs", description: "Using CTEs" }, position: { x: 0, y: 0 } },
  //   { id: "11", data: { label: "Window Functions", description: "Using window functions" }, position: { x: 0, y: 0 } },
  //   { id: "12", data: { label: "CTEs", description: "Using CTEs" }, position: { x: 0, y: 0 } },
  // ]);

  // const [edges, setEdges] = useState([
  //   { id: "e1-2", source: "1", target: "2" },
  //   { id: "e1-3", source: "1", target: "3" },
  //   { id: "e1-4", source: "3", target: "4" },
  //   { id: "e1-5", source: "3", target: "5" },
  //   { id: "e1-6", source: "3", target: "6" },
  //   { id: "e1-7", source: "3", target: "7" },
  //   { id: "e1-8", source: "4", target: "8" },
  //   { id: "e1-9", source: "4", target: "9" },
  //   { id: "e1-10", source: "4", target: "10" },
  //   { id: "e1-11", source: "4", target: "11" },
  //   { id: "e1-12", source: "4", target: "12" },
  // ]);


  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements([...generatedNodes], [...generatedEdges]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [highlightTargetId, setHighlightTargetId] = useState(null);


  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
    setHighlightTargetId(node.id);
    dispatch(setSelectedNodeGraph(node));
  }, [dispatch]);

  // Build incoming edges map and compute the unique path from a root to the target
  const highlightedEdgeIds = useMemo(() => {
    if (!highlightTargetId) return new Set();
    const incomingByTarget = new Map();
    layoutedEdges.forEach((e) => {
      const list = incomingByTarget.get(e.target) || [];
      list.push(e);
      incomingByTarget.set(e.target, list);
    });

    const ids = new Set();
    let current = highlightTargetId;
    const visited = new Set();

    while (true) {
      const incoming = incomingByTarget.get(current) || [];
      if (incoming.length === 0) break; // reached a root (no parents)
      const edge = incoming[0]; // pick the first parent if multiple
      ids.add(edge.id);
      current = edge.source;
      if (visited.has(current)) break; // safety for unexpected cycles
      visited.add(current);
    }

    return ids;
  }, [layoutedEdges, highlightTargetId]);

  const displayEdges = useMemo(() => {
    if (!layoutedEdges || layoutedEdges.length === 0) return layoutedEdges;
    return layoutedEdges.map((e) => {
      if (highlightedEdgeIds.has(e.id)) {
        return {
          ...e,
          style: { stroke: "#ef4444", strokeWidth: 2 },
        };
      }
      // keep any existing style for non-highlighted edges
      return { ...e, style: e.style };
    });
  }, [layoutedEdges, highlightedEdgeIds]);

  // Style nodes based on their status and round leaf nodes
  const displayNodes = useMemo(() => {
    if (!layoutedNodes || layoutedNodes.length === 0) return layoutedNodes;

    return layoutedNodes.map((n) => {
      const status = n?.data?.status;
      const isLeaf = n?.data?.isLeaf;
      let style = { ...n.style };

      if (isLeaf) {
        style = {
          ...style,
          width: nodeHeight,
          height: nodeHeight,
          borderRadius: nodeHeight / 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 0,
          border: "2px solid #1a8452",
        };
      } else {
        style = {
          ...style,
          border: "2px solid #000",
        };
      }

      if (status === "completed") {
        style = { ...style, border: "2px solid #22c55e" };
      } else if (status === "in_progress") {
        style = { ...style, border: "2px solid #eab308" };
      }

      return { ...n, style };
    });
  }, [layoutedNodes]);

  return (
    <div className="flex w-full h-full">
      {/* Graph */}
      <div className="flex-1">
        <ReactFlowProvider>
          <ReactFlow
            nodes={displayNodes}
            edges={displayEdges}
            onNodeClick={onNodeClick}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* Persistent Drawer */}
      {selectedNode && (
        <Sheet open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
          <SheetContent className="w-[420px] h-screen fixed right-0 z-50 border-l bg-background shadow-lg p-0">
            <div className="flex h-full flex-col">
              {/* Header with actions */}
              <div className="flex items-start justify-between p-8 border-b">
                <div>
                  <h2 className="text-xl font-semibold leading-tight">{selectedNode.data.label}</h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-[28rem]">
                    {selectedNode.data.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-accent"
                    onClick={() => navigator.clipboard.writeText(selectedNode.data.label)}
                    aria-label="Share"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-sm text-muted-foreground">
                  Learn more from the following resources:
                </p>

                <div className="mt-4">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Resources</div>
                  <div className="mt-3 space-y-3">
                    {/* Video Lecture */}
                    {
                      selectedNode.data.video_url && (
                        <div className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/40" onClick={() => navigate(selectedNode.data.video_url)}>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                              <PlayCircle className="h-5 w-5" />
                            </div>
                            <div className="font-medium">Video Lecture</div>
                          </div>
                        </div>
                      )
                    }

                    {/* Notes */}
                    {
                      selectedNode.data.lectures && (
                        <div className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/40" onClick={() => navigate(`/roadmap/${roadmap.id}/notes`)}>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-100 text-amber-600">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="font-medium">Documented Notes</div>
                          </div>
                        </div>
                      )
                    }

                    {/* Assessment */}
                    {
                      selectedNode.data.problems && selectedNode.data.problems.length > 0 && (
                        <div className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/40" onClick={() => navigate(`/roadmap/${roadmap.id}/assignments`)}>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                              <ListChecks className="h-5 w-5" />
                            </div>
                            <div className="font-medium">Assessment</div>
                          </div>
                        </div>
                      )
                    }

                    {/* Quiz */}
                    {
                      selectedNode.data.quizzes && selectedNode.data.quizzes.length > 0 && (
                        <div className="flex items-center justify-between rounded-md border p-3 hover:bg-muted/40" onClick={() => navigate(`/roadmap/${roadmap.id}/quizzes`)}>
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-fuchsia-100 text-fuchsia-600">
                              <HelpCircle className="h-5 w-5" />
                            </div>
                            <div className="font-medium">Quiz</div>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-6 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                  onClick={() => alert(`Module Completed: ${selectedNode.data.label}`)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Module Completed
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default Graph;

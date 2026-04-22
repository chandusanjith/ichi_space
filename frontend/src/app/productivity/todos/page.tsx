"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Check, Circle, ListTodo, Filter } from "lucide-react";

interface LocalTodo {
  id: string;
  title: string;
  description: string;
  is_completed: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string | null;
  created_at: string;
}

const STORAGE_KEY = "ichi_todos";

const PRIORITY_CONFIG = {
  low: { label: "Low", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20", dot: "bg-blue-500" },
  medium: { label: "Medium", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20", dot: "bg-yellow-500" },
  high: { label: "High", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20", dot: "bg-orange-500" },
  urgent: { label: "Urgent", color: "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20", dot: "bg-red-500" },
};

export default function TodosPage() {
  const [todos, setTodos] = useState<LocalTodo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium" as LocalTodo["priority"],
    due_date: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  const saveTodos = (updated: LocalTodo[]) => {
    setTodos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addTodo = () => {
    if (!newTodo.title.trim()) return;
    const todo: LocalTodo = {
      id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      is_completed: false,
      priority: newTodo.priority,
      due_date: newTodo.due_date || null,
      created_at: new Date().toISOString(),
    };
    saveTodos([todo, ...todos]);
    setNewTodo({ title: "", description: "", priority: "medium", due_date: "" });
    setCreateOpen(false);
  };

  const toggleTodo = (id: string) => {
    saveTodos(
      todos.map((t) => (t.id === id ? { ...t, is_completed: !t.is_completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    saveTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    saveTodos(todos.filter((t) => !t.is_completed));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.is_completed;
    if (filter === "completed") return t.is_completed;
    return true;
  });

  // Sort: urgent first, completed last
  const sorted = [...filtered].sort((a, b) => {
    if (a.is_completed !== b.is_completed) return a.is_completed ? 1 : -1;
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const completedCount = todos.filter((t) => t.is_completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <ToolLayout
      title="Todo List"
      description="Manage tasks with priorities and due dates"
      categoryName="Productivity"
      categoryPath="/productivity"
    >
      <div className="space-y-6">
        {/* Stats & actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {(["all", "active", "completed"] as const).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className="capitalize"
                >
                  {f}
                  {f === "all" && <span className="ml-1 text-xs opacity-70">({todos.length})</span>}
                  {f === "active" && <span className="ml-1 text-xs opacity-70">({activeCount})</span>}
                  {f === "completed" && <span className="ml-1 text-xs opacity-70">({completedCount})</span>}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {completedCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCompleted} className="text-destructive hover:text-destructive">
                <Trash2 className="mr-1 h-3 w-3" /> Clear completed
              </Button>
            )}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger render={<Button />}>
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Task</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      placeholder="What needs to be done?"
                      value={newTodo.title}
                      onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description (optional)</Label>
                    <Input
                      placeholder="Add details..."
                      value={newTodo.description}
                      onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <select
                        value={newTodo.priority}
                        onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as LocalTodo["priority"] })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        value={newTodo.due_date}
                        onChange={(e) => setNewTodo({ ...newTodo, due_date: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={addTodo} className="w-full">Add Task</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          {sorted.map((todo) => {
            const config = PRIORITY_CONFIG[todo.priority];
            const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.is_completed;
            return (
              <Card key={todo.id} className={`group transition-all ${todo.is_completed ? "opacity-60" : ""}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="shrink-0"
                  >
                    {todo.is_completed ? (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${todo.is_completed ? "line-through text-muted-foreground" : ""}`}>
                      {todo.title}
                    </p>
                    {todo.description && (
                      <p className="text-xs text-muted-foreground truncate">{todo.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className={`text-[10px] ${config.color}`}>
                      {config.label}
                    </Badge>
                    {todo.due_date && (
                      <span className={`text-[10px] ${isOverdue ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
                        {isOverdue ? "Overdue: " : ""}{new Date(todo.due_date).toLocaleDateString()}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <ListTodo className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-lg">{filter !== "all" ? `No ${filter} tasks` : "No tasks yet"}</p>
            <p className="text-sm">Click &quot;Add Task&quot; to create one</p>
          </div>
        )}

        {/* Progress */}
        {todos.length > 0 && (
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{completedCount}/{todos.length} completed</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / todos.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}

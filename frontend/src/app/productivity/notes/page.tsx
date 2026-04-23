"use client";

import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pin, PinOff, Trash2, Search, StickyNote, Edit2 } from "lucide-react";

interface LocalNote {
  id: string;
  title: string;
  content: string;
  color: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

const COLORS = [
  { name: "Default", value: "bg-card" },
  { name: "Yellow", value: "bg-yellow-50 dark:bg-yellow-950/30" },
  { name: "Green", value: "bg-emerald-50 dark:bg-emerald-950/30" },
  { name: "Blue", value: "bg-blue-50 dark:bg-blue-950/30" },
  { name: "Purple", value: "bg-violet-50 dark:bg-violet-950/30" },
  { name: "Pink", value: "bg-pink-50 dark:bg-pink-950/30" },
];

const STORAGE_KEY = "ichi_notes";

export default function NotesPage() {
  const [notes, setNotes] = useState<LocalNote[]>([]);
  const [search, setSearch] = useState("");
  const [editNote, setEditNote] = useState<LocalNote | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", color: "bg-card" });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  const saveNotes = (updated: LocalNote[]) => {
    setNotes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const createNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return;
    const note: LocalNote = {
      id: Date.now().toString(),
      title: newNote.title || "Untitled",
      content: newNote.content,
      color: newNote.color,
      is_pinned: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    saveNotes([note, ...notes]);
    setNewNote({ title: "", content: "", color: "bg-card" });
    setCreateOpen(false);
  };

  const updateNote = () => {
    if (!editNote) return;
    const updated = notes.map((n) =>
      n.id === editNote.id ? { ...editNote, updated_at: new Date().toISOString() } : n
    );
    saveNotes(updated);
    setEditNote(null);
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter((n) => n.id !== id));
  };

  const togglePin = (id: string) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, is_pinned: !n.is_pinned } : n
    );
    saveNotes(updated);
  };

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  const pinned = filtered.filter((n) => n.is_pinned);
  const unpinned = filtered.filter((n) => !n.is_pinned);

  return (
    <ToolLayout
      title="Notes"
      description="Create and manage personal notes"
      categoryName="Productivity"
      categoryPath="/productivity"
      slug="notes"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" /> New Note
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Note title..."
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Write your note..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className="min-h-[150px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setNewNote({ ...newNote, color: c.value })}
                        className={`w-8 h-8 rounded-full border-2 ${c.value} ${
                          newNote.color === c.value ? "border-primary ring-2 ring-primary/20" : "border-border"
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
                <Button onClick={createNote} className="w-full">Create Note</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pinned notes */}
        {pinned.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1">
              <Pin className="h-3 w-3" /> Pinned
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pinned.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={deleteNote} onTogglePin={togglePin} onEdit={setEditNote} />
              ))}
            </div>
          </div>
        )}

        {/* Other notes */}
        {unpinned.length > 0 && (
          <div>
            {pinned.length > 0 && (
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Other Notes</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {unpinned.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={deleteNote} onTogglePin={togglePin} onEdit={setEditNote} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <StickyNote className="h-16 w-16 mb-4 opacity-20" />
            <p className="text-lg">{search ? "No notes match your search" : "No notes yet"}</p>
            <p className="text-sm">Click &quot;New Note&quot; to create one</p>
          </div>
        )}

        {/* Edit dialog */}
        <Dialog open={!!editNote} onOpenChange={(open) => !open && setEditNote(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            {editNote && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={editNote.title}
                    onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={editNote.content}
                    onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                    className="min-h-[150px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setEditNote({ ...editNote, color: c.value })}
                        className={`w-8 h-8 rounded-full border-2 ${c.value} ${
                          editNote.color === c.value ? "border-primary ring-2 ring-primary/20" : "border-border"
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
                <Button onClick={updateNote} className="w-full">Save Changes</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ToolLayout>
  );
}

function NoteCard({
  note,
  onDelete,
  onTogglePin,
  onEdit,
}: {
  note: LocalNote;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onEdit: (note: LocalNote) => void;
}) {
  return (
    <Card className={`group ${note.color} hover:shadow-md transition-all`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-sm truncate flex-1">{note.title}</h4>
          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onTogglePin(note.id)}>
              {note.is_pinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onEdit(note)}>
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => onDelete(note.id)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-wrap">{note.content}</p>
        <p className="text-[10px] text-muted-foreground mt-3">
          {new Date(note.updated_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

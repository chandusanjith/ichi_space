"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Files, Upload, FileText, X, Download, Loader2 } from "lucide-react";

interface PDFFile {
  name: string;
  size: number;
  file: File;
}

export default function PDFToolsPage() {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf"
    );
    setFiles((prev) => [
      ...prev,
      ...droppedFiles.map((f) => ({ name: f.name, size: f.size, file: f })),
    ]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).filter(
      (f) => f.type === "application/pdf"
    );
    setFiles((prev) => [
      ...prev,
      ...selectedFiles.map((f) => ({ name: f.name, size: f.size, file: f })),
    ]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    // Simulated merge - in production you'd use pdf-lib
    setTimeout(() => {
      setProcessing(false);
      alert("PDF merge would use pdf-lib in production. Add 'pdf-lib' package for full functionality.");
    }, 1500);
  };

  return (
    <ToolLayout
      title="PDF Merge & Split"
      description="Merge multiple PDFs or split pages"
      categoryName="File Tools"
      categoryPath="/file-tools"
    >
      <div className="space-y-8">
        {/* Upload area */}
        <Card>
          <CardContent className="p-6">
            <div
              className="border-2 border-dashed rounded-xl p-12 text-center transition-colors hover:border-primary/50 hover:bg-muted/30 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("pdf-input")?.click()}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-1">Drop PDFs here or click to browse</p>
              <p className="text-sm text-muted-foreground">
                Upload multiple PDF files to merge them
              </p>
              <input
                id="pdf-input"
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* File list */}
        {files.length > 0 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label>{files.length} file{files.length !== 1 ? 's' : ''} selected</Label>
                <Button variant="ghost" size="sm" onClick={() => setFiles([])}>
                  Clear All
                </Button>
              </div>
              <div className="space-y-2">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg border"
                  >
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeFile(i)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleMerge} disabled={files.length < 2 || processing} className="flex-1">
                  {processing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Files className="mr-2 h-4 w-4" />
                  )}
                  Merge PDFs
                </Button>
                <Button variant="outline" disabled className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Split PDF
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Install <code className="bg-muted px-1 py-0.5 rounded">pdf-lib</code> package for full PDF processing
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}

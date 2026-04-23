"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/shared/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, X, Loader2, Image as ImageIcon } from "lucide-react";

interface CompressedImage {
  name: string;
  originalSize: number;
  compressedSize: number;
  url: string;
}

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(80);
  const [results, setResults] = useState<CompressedImage[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const images = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...images]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const images = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...images]);
  }, []);

  const compress = async () => {
    setProcessing(true);
    const compressed: CompressedImage[] = [];

    for (const file of files) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();

      await new Promise<void>((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                compressed.push({
                  name: file.name,
                  originalSize: file.size,
                  compressedSize: blob.size,
                  url: URL.createObjectURL(blob),
                });
              }
              resolve();
            },
            "image/jpeg",
            quality / 100
          );
        };
        img.src = URL.createObjectURL(file);
      });
    }

    setResults(compressed);
    setProcessing(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const totalOriginal = results.reduce((a, r) => a + r.originalSize, 0);
  const totalCompressed = results.reduce((a, r) => a + r.compressedSize, 0);
  const totalSaving = totalOriginal > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0;

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress images while maintaining quality"
      categoryName="File Tools"
      categoryPath="/file-tools"
      slug="image-compressor"
    >
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <div
              className="border-2 border-dashed rounded-xl p-12 text-center transition-colors hover:border-primary/50 hover:bg-muted/30 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("image-input")?.click()}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-1">Drop images here or click to browse</p>
              <p className="text-sm text-muted-foreground">
                Supports JPEG, PNG, WebP
              </p>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {files.length > 0 && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <Label>{files.length} image{files.length !== 1 ? 's' : ''} selected</Label>
                <Button variant="ghost" size="sm" onClick={() => { setFiles([]); setResults([]); }}>
                  Clear All
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label className="text-sm text-muted-foreground">Quality</Label>
                  <span className="text-sm font-semibold">{quality}%</span>
                </div>
                <Slider min={10} max={100} step={5} value={[quality]} onValueChange={(v) => setQuality((v as number[])[0])} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Smaller file</span>
                  <span>Higher quality</span>
                </div>
              </div>

              <div className="space-y-2">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg border">
                    <ImageIcon className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setFiles(f => f.filter((_, idx) => idx !== i))}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button onClick={compress} className="w-full" size="lg" disabled={processing}>
                {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ImageIcon className="mr-2 h-4 w-4" />
                )}
                Compress Images
              </Button>
            </CardContent>
          </Card>
        )}

        {results.length > 0 && (
          <Card className="bg-muted/30">
            <CardContent className="p-6 space-y-4">
              <div className="bg-background rounded-xl p-4 border grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Original</p>
                  <p className="font-bold">{formatSize(totalOriginal)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Compressed</p>
                  <p className="font-bold text-primary">{formatSize(totalCompressed)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Saved</p>
                  <p className="font-bold text-emerald-500">{totalSaving}%</p>
                </div>
              </div>

              <div className="space-y-2">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 bg-background p-3 rounded-lg border">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatSize(r.originalSize)} → {formatSize(r.compressedSize)}{" "}
                        <span className="text-emerald-500">
                          ({Math.round((1 - r.compressedSize / r.originalSize) * 100)}% saved)
                        </span>
                      </p>
                    </div>
                    <a href={r.url} download={`compressed-${r.name}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}

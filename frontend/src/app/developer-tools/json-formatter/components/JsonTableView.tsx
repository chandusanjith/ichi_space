"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Files, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface JsonTableViewProps {
  data: any;
  searchQuery?: string;
}

export const JsonTableView = ({ data, searchQuery }: JsonTableViewProps) => {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: "asc" | "desc" } | null>(null);
  
  const isArrayOfObjects = Array.isArray(data) && data.length > 0 && typeof data[0] === "object" && data[0] !== null;

  const { columns, rows } = useMemo(() => {
    if (!isArrayOfObjects) return { columns: [], rows: [] };

    const colSet = new Set<string>();
    data.forEach((item: any) => {
      Object.keys(item).forEach(key => colSet.add(key));
    });

    const cols = Array.from(colSet);
    let processedRows = [...data];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      processedRows = processedRows.filter((row: any) => 
        Object.values(row).some(val => 
          String(val).toLowerCase().includes(query)
        )
      );
    }

    // Sort
    if (sortConfig) {
      processedRows.sort((a: any, b: any) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        
        const comparison = aVal < bVal ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return { columns: cols, rows: processedRows };
  }, [data, isArrayOfObjects, searchQuery, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === "asc") return { key, direction: "desc" };
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  if (!isArrayOfObjects) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-2xl border border-dashed border-muted-foreground/20 my-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-muted-foreground opacity-50" />
        </div>
        <h4 className="text-lg font-semibold mb-1">Not a valid array</h4>
        <p className="text-sm text-muted-foreground max-w-[300px]">
          Table mode is only available for an array of objects. Please ensure your JSON structure starts with [{"{"}...{"}"}].
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/50 overflow-hidden bg-background shadow-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border/50">
              <th className="w-12 px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-r border-border/20">#</th>
              {columns.map(col => (
                <th 
                  key={col} 
                  className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground min-w-[120px] cursor-pointer hover:bg-muted transition-colors relative group"
                  onClick={() => handleSort(col)}
                >
                  <div className="flex items-center gap-2">
                    {col}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {sortConfig?.key === col ? (
                         sortConfig.direction === "asc" ? <ArrowUp size={12} className="text-primary" /> : <ArrowDown size={12} className="text-primary" />
                      ) : (
                        <ArrowUpDown size={12} className="text-muted-foreground/50" />
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {rows.map((row: any, i: number) => (
              <tr key={i} className="group hover:bg-primary/[0.02] transition-colors">
                <td className="px-4 py-3 text-center text-xs text-muted-foreground border-r border-border/20 bg-muted/5 font-mono">
                  {i + 1}
                </td>
                {columns.map(col => {
                  const val = row[col];
                  const isObject = typeof val === "object" && val !== null;
                  return (
                    <td key={col} className={cn(
                      "px-4 py-3 text-xs max-w-[300px] truncate",
                      sortConfig?.key === col && "bg-primary/[0.01]"
                    )}>
                      {isObject ? (
                        <div className="flex items-center gap-1.5 text-muted-foreground/70 italic text-[10px] bg-muted/30 px-1.5 py-0.5 rounded w-fit">
                          {Array.isArray(val) ? `Array(${val.length})` : "Object"}
                        </div>
                      ) : (
                        <span className={cn(
                          "font-medium",
                          typeof val === "number" ? "text-emerald-600 dark:text-emerald-400" :
                          typeof val === "boolean" ? "text-blue-600 dark:text-blue-400" :
                          val === null ? "text-muted-foreground italic" : "text-foreground"
                        )}>
                          {val === null ? "null" : String(val)}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {rows.length === 0 && (
        <div className="p-12 text-center flex flex-col items-center justify-center">
          <Search className="w-10 h-10 text-muted-foreground/20 mb-3" />
          <p className="text-sm text-muted-foreground">No results matching your search.</p>
        </div>
      )}

      <div className="px-4 py-2 border-t border-border/50 bg-muted/10 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Files className="w-3.5 h-3.5" />
          {rows.length} Rows
        </div>
        <div className="flex items-center gap-2">
          {sortConfig && <span className="text-primary italic normal-case mr-4 font-mono tracking-tighter">Sorted by {sortConfig.key}</span>}
          {columns.length} Fields
        </div>
      </div>
    </div>
  );
};

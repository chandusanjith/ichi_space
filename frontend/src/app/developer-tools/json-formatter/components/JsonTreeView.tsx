"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  FileCode, 
  Hash, 
  Type, 
  CheckCircle2, 
  XCircle,
  Copy,
  Trash2,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JsonTreeNodeProps {
  data: any;
  label?: string | number;
  isLast?: boolean;
  depth?: number;
  onUpdate?: (path: string[], value: any) => void;
  onDelete?: (path: string[]) => void;
  onAdd?: (path: string[]) => void;
  path?: string[];
  searchQuery?: string;
  key?: string | number;
}

const JsonTreeNode = ({
  data,
  label,
  isLast = true,
  depth = 0,
  onUpdate,
  onDelete,
  onAdd,
  path = [],
  searchQuery = ""
}: JsonTreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(data));

  const isObject = typeof data === "object" && data !== null;
  const isArray = Array.isArray(data);
  const type = isArray ? "array" : typeof data;

  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleUpdate = () => {
    let newValue: any = editValue;
    if (type === "number") newValue = Number(editValue);
    if (type === "boolean") newValue = editValue.toLowerCase() === "true";
    if (data === null) newValue = null;
    
    onUpdate?.(path, newValue);
    setIsEditing(false);
  };

  const matchesSearch = searchQuery && (
    (label?.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (!isObject && data?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getTypeIcon = () => {
    if (isArray) return <FileCode className="w-3 h-3 text-blue-400" />;
    if (isObject) return <BracketsIcon className="w-3 h-3 text-purple-400" />;
    if (type === "number") return <Hash className="w-3 h-3 text-emerald-400" />;
    if (type === "string") return <Type className="w-3 h-3 text-orange-400" />;
    if (type === "boolean") return data ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-red-400" />;
    return null;
  };

  return (
    <div className={cn("font-mono text-sm leading-6", matchesSearch && "bg-primary/10 rounded-sm")}>
      <div className="group flex items-center gap-1 hover:bg-muted/50 rounded px-1 -ml-1 transition-colors">
        {isObject ? (
          <button 
            onClick={handleToggle}
            className="p-0.5 hover:bg-muted rounded text-muted-foreground transition-transform"
            style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
          >
            <ChevronDown size={14} />
          </button>
        ) : (
          <div className="w-4.5" />
        )}

        {label !== undefined && (
          <span className="text-purple-600 dark:text-purple-400 font-medium">
            "{label}":
          </span>
        )}

        {isObject ? (
          <span className="text-muted-foreground">
            {isArray ? "[" : "{"}
            {!isExpanded && (
              <span className="text-xs italic mx-1 opacity-60">
                {isArray ? `${data.length} items` : `${Object.keys(data).length} props`}
              </span>
            )}
            {!isExpanded && (isArray ? "]" : "}")}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                autoFocus
                className="bg-background border rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary w-24"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleUpdate}
                onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              />
            ) : (
              <span 
                className={cn(
                  "cursor-pointer hover:underline decoration-dotted",
                  type === "string" ? "text-orange-600 dark:text-orange-400" :
                  type === "number" ? "text-emerald-600 dark:text-emerald-400" :
                  "text-blue-600 dark:text-blue-400"
                )}
                onClick={() => setIsEditing(true)}
              >
                {type === "string" ? `"${data}"` : String(data)}
              </span>
            )}
            {getTypeIcon()}
          </div>
        )}

        <div className="ml-auto opacity-0 group-hover:opacity-100 flex items-center gap-1">
          <button 
            onClick={() => navigator.clipboard.writeText(JSON.stringify(data))}
            className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors"
            title="Copy path"
          >
            <Copy size={12} />
          </button>
          <button 
            onClick={() => onDelete?.(path)}
            className="p-1 hover:bg-destructive/10 hover:text-destructive rounded text-muted-foreground transition-colors"
            title="Delete node"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {isObject && isExpanded && (
        <div className="pl-6 border-l border-border/50 ml-2 mt-0.5">
          {isArray ? (
            data.map((item: any, i: number) => (
              <JsonTreeNode
                key={i}
                data={item}
                label={i}
                isLast={i === data.length - 1}
                depth={depth + 1}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAdd={onAdd}
                path={[...path, String(i)]}
                searchQuery={searchQuery}
              />
            ))
          ) : (
            Object.entries(data).map(([key, value], i, arr) => (
              <JsonTreeNode
                key={key}
                data={value}
                label={key}
                isLast={i === arr.length - 1}
                depth={depth + 1}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onAdd={onAdd}
                path={[...path, key]}
                searchQuery={searchQuery}
              />
            ))
          )}
          <button 
            onClick={() => onAdd?.(path)}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors mt-1"
          >
            <Plus size={10} /> Add item
          </button>
        </div>
      )}

      {isObject && isExpanded && (
        <div className="text-muted-foreground">
          {isArray ? "]" : "}"}
          {!isLast && ","}
        </div>
      )}
    </div>
  );
};

const BracketsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 3h3v18h-3" /><path d="M8 21H5V3h3" />
  </svg>
);

export const JsonTreeView = ({ 
  data, 
  onDataChange,
  searchQuery
}: { 
  data: any, 
  onDataChange?: (newData: any) => void,
  searchQuery?: string
}) => {
  const handleUpdate = (path: string[], value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    onDataChange?.(newData);
  };

  const handleDelete = (path: string[]) => {
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    const last = path[path.length - 1];
    if (Array.isArray(current)) {
      current.splice(Number(last), 1);
    } else {
      delete current[last];
    }
    onDataChange?.(newData);
  };

  const handleAdd = (path: string[]) => {
    const newData = JSON.parse(JSON.stringify(data));
    let current = newData;
    if (path.length > 0) {
      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
      }
    }
    
    if (Array.isArray(current)) {
      current.push("new value");
    } else {
      current["new_key"] = "new value";
    }
    onDataChange?.(newData);
  };

  return (
    <div className="py-2 px-1 overflow-auto max-h-[600px] custom-scrollbar">
      <JsonTreeNode 
        data={data} 
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onAdd={handleAdd}
        searchQuery={searchQuery}
      />
    </div>
  );
};

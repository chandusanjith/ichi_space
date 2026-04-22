export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  path: string;
  keywords: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export type ToolCategory =
  | "calculators"
  | "time-date"
  | "text-tools"
  | "developer-tools"
  | "file-tools"
  | "security"
  | "finance"
  | "productivity";

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  color: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  avatar: string | null;
  bio: string;
  created_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
  user: User;
}

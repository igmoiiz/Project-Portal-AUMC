// Project idea type
export interface ProjectIdea {
  id: string;
  supervisor: string;
  interested_area: string;
  project_idea: string;
  department: string;
}

// Department type
// Department type
export type Department = 'CS' | 'SE' | 'IT' | 'EE' | 'BBA' | 'CYS' | 'AI' | 'DS' | 'General';

// API response types
export interface ProjectsResponse {
  success: boolean;
  data: ProjectIdea[];
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  count?: number;
}

export interface ErrorResponse {
  success: boolean;
  error: string;
}

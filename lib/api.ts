import { ProjectIdea, ProjectsResponse, UploadResponse, ErrorResponse, Department } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/faculty';

/**
 * Fetch projects by department
 */
export async function fetchProjectsByDepartment(department: Department): Promise<ProjectIdea[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/projects?department=${encodeURIComponent(department)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ProjectsResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch projects');
    }
    
    return data.data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

/**
 * Login faculty
 */
export async function loginFaculty(email: string, password: string): Promise<{ success: boolean; token?: string; user?: any; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Network error" };
  }
}
export async function uploadProjectsFile(
  file: File,
  token: string
): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: UploadResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Generate ideacatalyst.app URL with project details
 */
export function generateIdeaCatalystUrl(
  projectIdea: string,
  interestedArea: string,
  supervisor: string
): string {
  const params = new URLSearchParams({
    title: projectIdea,
    area: interestedArea,
    supervisor: supervisor,
  });
  
  return `https://idea-catalyst.netlify.app/?${params.toString()}`;
}

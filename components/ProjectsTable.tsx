'use client';

import { ProjectIdea } from '@/lib/types';
import { ProjectRow } from './ProjectRow';
import { AlertCircle } from 'lucide-react';

interface ProjectsTableProps {
  projects: ProjectIdea[];
  isLoading: boolean;
  error: string | null;
}

export function ProjectsTable({ projects, isLoading, error }: ProjectsTableProps) {
  if (isLoading) {
    return (
      <div className="overflow-hidden">
        <div className="p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="inline-block animate-spin">
              <div className="h-10 w-10 border-4 border-amber-200 border-t-amber-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-amber-700 font-medium">Loading projects...</p>
          <p className="text-sm text-amber-600 mt-2">Please wait while we fetch the project ideas</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 flex gap-4">
        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 text-lg">Error Loading Projects</h3>
          <p className="text-sm text-red-700 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="inline-block p-3 bg-amber-100 rounded-full mb-4">
          <AlertCircle className="w-6 h-6 text-amber-700" />
        </div>
        <p className="text-amber-700 font-medium">No projects available</p>
        <p className="text-sm text-amber-600 mt-2">There are currently no project ideas for this department.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-amber-100 to-amber-50 border-b-2 border-amber-300 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-amber-950 tracking-wide">
                Supervisor
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-amber-950 tracking-wide">
                Research Area
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-amber-950 tracking-wide">
                Project Idea
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-amber-950 tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-100">
            {projects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Summary Footer */}
      <div className="bg-amber-50 border-t-2 border-amber-200 px-6 py-4 flex justify-between items-center">
        <p className="text-sm font-medium text-amber-700">
          Showing <span className="font-bold text-amber-950">{projects.length}</span> project{projects.length !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-amber-600">
          Click the buttons to copy or validate project ideas
        </p>
      </div>
    </div>
  );
}

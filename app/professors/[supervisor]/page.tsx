'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { ProfessorProjectRow } from '@/components/ProfessorProjectRow';
import { ProjectDetailsDialog } from '@/components/ProjectDetailsDialog';
import { Department, ProjectIdea } from '@/lib/types';
import { fetchProjectsByProfessor } from '@/lib/api';

const VALID_DEPARTMENTS: Department[] = ['CS', 'SE', 'IT', 'EE', 'BBA', 'CYS', 'AI', 'DS', 'General'];

export default function ProfessorProjectsPage({
  params,
}: {
  params: Promise<{ supervisor: string }>;
}) {
  const { supervisor: encodedSupervisor } = use(params);
  const supervisor = decodeURIComponent(encodedSupervisor || '');
  const searchParams = useSearchParams();
  const departmentParam = searchParams?.get('department') || '';

  const [department, setDepartment] = useState<Department | ''>('');
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailsProject, setDetailsProject] = useState<ProjectIdea | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const dept = (VALID_DEPARTMENTS.includes(departmentParam as Department) ? departmentParam : 'General') as Department;
    setDepartment(dept);
  }, [departmentParam]);

  useEffect(() => {
    if (!department || !supervisor) {
      setIsLoading(false);
      return;
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProjectsByProfessor(department, supervisor);
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [department, supervisor]);

  const handleViewDetails = (project: ProjectIdea) => {
    setDetailsProject(project);
    setDetailsOpen(true);
  };

  if (!supervisor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-amber-700">Invalid professor. Please use the Visit button from the project list.</p>
          <Link href="/" className="mt-4 inline-flex items-center text-amber-600 hover:text-amber-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Link>
        </div>

        <div className="bg-white rounded-xl border-2 border-amber-200 overflow-hidden shadow-md">
          <div className="p-6 border-b border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100">
            <h1 className="text-2xl font-serif font-bold text-amber-950">
              Projects by {supervisor}
            </h1>
            <p className="text-sm text-amber-700 mt-1">
              {department} Department · {projects.length} project{projects.length !== 1 ? 's' : ''}
            </p>
          </div>

          {isLoading && (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin">
                <div className="h-10 w-10 border-4 border-amber-200 border-t-amber-600 rounded-full" />
              </div>
              <p className="text-amber-700 font-medium mt-4">Loading projects...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Error Loading Projects</h3>
                <p className="text-sm text-red-700 mt-2">{error}</p>
              </div>
            </div>
          )}

          {!isLoading && !error && projects.length === 0 && (
            <div className="p-12 text-center">
              <div className="inline-block p-3 bg-amber-100 rounded-full mb-4">
                <AlertCircle className="w-6 h-6 text-amber-700" />
              </div>
              <p className="text-amber-700 font-medium">No projects found</p>
              <p className="text-sm text-amber-600 mt-2">
                No projects found for this professor in this department.
              </p>
            </div>
          )}

          {!isLoading && !error && projects.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-100 to-amber-50 border-b-2 border-amber-300">
                  <tr>
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
                    <ProfessorProjectRow
                      key={project.id}
                      project={project}
                      index={index}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && projects.length > 0 && (
            <div className="bg-amber-50 border-t-2 border-amber-200 px-6 py-4">
              <p className="text-sm font-medium text-amber-700">
                Showing <span className="font-bold text-amber-950">{projects.length}</span> project
                {projects.length !== 1 ? 's' : ''} · Click &quot;View Details&quot; for AI-generated descriptions
              </p>
            </div>
          )}
        </div>
      </main>

      <ProjectDetailsDialog
        project={detailsProject}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}

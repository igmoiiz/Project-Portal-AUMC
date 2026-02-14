'use client';

import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Header } from '@/components/Header';
import { DepartmentSelector } from '@/components/DepartmentSelector';
import { ProjectsTable } from '@/components/ProjectsTable';
import { Department, ProjectIdea } from '@/lib/types';
import { fetchProjectsByDepartment } from '@/lib/api';

export default function Home() {
  const [department, setDepartment] = useState<Department | ''>('');
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!department) {
      setProjects([]);
      setError(null);
      return;
    }

    const loadProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProjectsByDepartment(department);
        setProjects(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load projects'
        );
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [department]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {/* Department Selector Card */}
          <div className="bg-white rounded-xl border-2 border-amber-200 p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-serif font-bold text-amber-950 mb-2">
                Filter by Department
              </h2>
              <p className="text-sm text-amber-700">
                Select a department to explore available project ideas
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1 sm:flex-auto">
                <DepartmentSelector
                  value={department}
                  onDepartmentChange={setDepartment}
                />
              </div>
              {department && (
                <div className="text-sm text-amber-600 font-medium px-4 py-2 bg-amber-50 rounded-lg border border-amber-200">
                  Department: <span className="font-semibold">{department}</span>
                </div>
              )}
            </div>
          </div>

          {/* Projects Section */}
          {department && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold text-amber-950">
                  {department} Department Projects
                </h2>
                <p className="text-amber-700">
                  Explore {projects.length} available project{projects.length !== 1 ? 's' : ''} from this department
                </p>
              </div>

              {/* Validation Note */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <span className="font-bold">Important:</span> You must research the idea and propose a proper solution first. 
                      Then, validate your working at{' '}
                      <a href="https://idea-catalyst.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-blue-600 transition-colors">
                        Idea Catalyst
                      </a>{' '}
                      before actual implementation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border-2 border-amber-200 overflow-hidden shadow-md">
                <ProjectsTable
                  projects={projects}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
            </div>
          )}

          {!department && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center max-w-md">
                <div className="inline-block p-4 bg-amber-100 rounded-full mb-6">
                  <BookOpen className="w-8 h-8 text-amber-950" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-amber-950 mb-3">
                  Get Started
                </h3>
                <p className="text-amber-700 leading-relaxed mb-6">
                  Select a department from above to discover innovative project ideas, connect with faculty supervisors, and explore exciting academic opportunities.
                </p>
                <p className="text-sm text-amber-600 italic">
                  Choose your department to begin exploring
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

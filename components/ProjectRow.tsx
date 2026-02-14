'use client';

import { ProjectIdea } from '@/lib/types';
import { CopyButton } from './CopyButton';
import { ValidateButton } from './ValidateButton';

interface ProjectRowProps {
  project: ProjectIdea;
  index: number;
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  return (
    <tr className={`hover:bg-amber-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-amber-25'}`}>
      <td className="px-6 py-4 text-sm font-medium text-amber-950">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-amber-900">👨‍🏫</span>
          </div>
          <div>
            <p className="font-semibold text-amber-950">{project.supervisor}</p>
            <p className="text-xs text-amber-600 mt-0.5">Faculty Supervisor</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-amber-900">
        <span className="inline-block bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-medium border border-amber-300">
          {project.interested_area}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="max-w-md">
          <p className="text-sm text-amber-950 line-clamp-2 font-medium leading-relaxed">
            {project.project_idea}
          </p>
          <p className="text-xs text-amber-600 mt-2">
            {project.project_idea.length} characters
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2 justify-center">
          <CopyButton text={project.project_idea} />
          <ValidateButton
            projectIdea={project.project_idea}
            interestedArea={project.interested_area}
            supervisor={project.supervisor}
          />
        </div>
      </td>
    </tr>
  );
}

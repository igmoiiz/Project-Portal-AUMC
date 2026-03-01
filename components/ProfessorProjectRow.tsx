'use client';

import { ProjectIdea } from '@/lib/types';
import { CopyButton } from './CopyButton';
import { ValidateButton } from './ValidateButton';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface ProfessorProjectRowProps {
  project: ProjectIdea;
  index: number;
  onViewDetails: (project: ProjectIdea) => void;
}

export function ProfessorProjectRow({
  project,
  index,
  onViewDetails,
}: ProfessorProjectRowProps) {
  return (
    <tr
      className={`hover:bg-amber-50 transition-colors duration-150 ${
        index % 2 === 0 ? 'bg-white' : 'bg-amber-25'
      }`}
    >
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
        <div className="flex gap-2 justify-center flex-wrap">
          <CopyButton text={project.project_idea} />
          <ValidateButton
            projectIdea={project.project_idea}
            interestedArea={project.interested_area}
            supervisor={project.supervisor}
          />
          <Button
            onClick={() => onViewDetails(project)}
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white border-0 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            title="View project details"
          >
            <FileText className="w-4 h-4 mr-1.5" />
            View Details
          </Button>
        </div>
      </td>
    </tr>
  );
}

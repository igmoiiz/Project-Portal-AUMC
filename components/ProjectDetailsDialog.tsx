'use client';

import { ProjectIdea } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProjectDetailsDialogProps {
  project: ProjectIdea | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailsDialog({
  project,
  open,
  onOpenChange,
}: ProjectDetailsDialogProps) {
  if (!project) return null;

  const detailsText = project.details?.trim() || "Detailed description not available; please consult your supervisor for more information.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-amber-200 bg-white">
        <DialogHeader>
          <DialogTitle className="text-amber-950 font-serif">
            Project Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-amber-900">
          <div>
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">
              Project Idea
            </p>
            <p className="text-sm font-medium leading-relaxed">
              {project.project_idea}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">
              Research Area
            </p>
            <span className="inline-block bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-medium border border-amber-300">
              {project.interested_area}
            </span>
          </div>
          <div>
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">
              Supervisor
            </p>
            <p className="text-sm font-medium">{project.supervisor}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">
              Detailed Description
            </p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {detailsText}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

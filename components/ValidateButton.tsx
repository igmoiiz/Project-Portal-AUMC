'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { generateIdeaCatalystUrl } from '@/lib/api';

interface ValidateButtonProps {
  projectIdea: string;
  interestedArea: string;
  supervisor: string;
  className?: string;
}

export function ValidateButton({
  projectIdea,
  interestedArea,
  supervisor,
  className,
}: ValidateButtonProps) {
  const handleValidate = () => {
    const url = generateIdeaCatalystUrl(projectIdea, interestedArea, supervisor);
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleValidate}
      size="sm"
      className={`${className} bg-amber-600 hover:bg-amber-700 text-white border-0 font-medium transition-all duration-200 shadow-sm hover:shadow-md`}
      title="Validate idea on ideacatalyst.app"
    >
      <ExternalLink className="w-4 h-4 mr-1.5" />
      Validate
    </Button>
  );
}

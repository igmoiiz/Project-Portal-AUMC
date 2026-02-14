'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      size="sm"
      variant={copied ? 'default' : 'outline'}
      className={`${className} ${
        copied
          ? 'bg-green-600 hover:bg-green-700 border-green-600 text-white'
          : 'border-amber-300 text-amber-950 hover:bg-amber-50 hover:border-amber-400'
      } transition-all duration-200 font-medium`}
      title={copied ? 'Copied to clipboard!' : 'Copy project idea'}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-1.5" />
          Copy
        </>
      )}
    </Button>
  );
}

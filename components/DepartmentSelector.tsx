'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Department } from '@/lib/types';

interface DepartmentSelectorProps {
  value: Department | '';
  onDepartmentChange: (department: Department) => void;
}

const DEPARTMENTS: { value: Department; label: string }[] = [
  { value: 'CS', label: 'Computer Science' },
  { value: 'SE', label: 'Software Engineering' },
  { value: 'CYS', label: 'Cyber Security' },
  { value: 'General', label: 'General / Interdisciplinary' },
];

export function DepartmentSelector({
  value,
  onDepartmentChange,
}: DepartmentSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-bold text-amber-950 mb-3 tracking-wide">
          📚 Select Your Department
        </label>
        <p className="text-xs text-amber-600 mb-3">
          Choose a department to explore available project ideas and connect with supervisors
        </p>
      </div>
      <Select value={value} onValueChange={(val) => onDepartmentChange(val as Department)}>
        <SelectTrigger className="bg-white border-2 border-amber-300 hover:border-amber-400 transition-colors h-12 text-base font-medium">
          <SelectValue placeholder="🔍 Choose a department..." />
        </SelectTrigger>
        <SelectContent className="border-2 border-amber-300">
          {DEPARTMENTS.map((dept) => (
            <SelectItem key={dept.value} value={dept.value} className="py-2">
              <span className="font-medium">{dept.label}</span>
              <span className="text-amber-600 ml-2">({dept.value})</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

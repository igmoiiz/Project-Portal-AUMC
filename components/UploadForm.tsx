'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { uploadProjectsFile } from '@/lib/api';

interface UploadFormProps {
  department?: string;
  onSuccess?: (message: string) => void;
  onError?: (error: string) => void;
}

export function UploadForm({ department: propDepartment = 'General', onSuccess, onError }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [department, setDepartment] = useState(propDepartment);

  // Load department from user profile
  useEffect(() => {
    try {
      const userStr = localStorage.getItem('faculty_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.department) {
          setDepartment(user.department);
        }
      }
    } catch (e) {
      console.error('Failed to load user department', e);
    }
  }, []);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.csv')) {
        setErrorMessage('Please select an Excel (.xlsx) or CSV (.csv) file');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setErrorMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev < 90) return prev + Math.random() * 30;
          return prev;
        });
      }, 500);

      // Get token
      const token = localStorage.getItem('faculty_token');

      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const response = await uploadProjectsFile(file, token);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.success) {
        const message = `Successfully uploaded projects!`;
        setSuccessMessage(message);
        onSuccess?.(message);
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        const error = response.message || 'Upload failed';
        setErrorMessage(error);
        onError?.(error);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to upload file';
      setErrorMessage(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Department Info */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-50 rounded-lg border-2 border-amber-300 p-5 flex items-center gap-3">
        <span className="text-2xl">🏢</span>
        <div>
          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">Department</p>
          <p className="text-lg font-bold text-amber-950">{department}</p>
        </div>
      </div>

      {/* File Input Section */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-amber-950 tracking-wide">
          📁 Select Excel (.xlsx) or CSV (.csv) File
        </label>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileChange}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="px-4 py-3 border-2 border-dashed border-amber-300 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors text-center font-medium text-amber-900 disabled:opacity-50">
            {file ? (
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">✓</span>
                <span>{file.name}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">📎</span>
                <span>Click to select or drag your file</span>
              </div>
            )}
          </div>
        </div>
        {file && (
          <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
            <span>✓</span>
            <span>File: <strong>{file.name}</strong> • Size: {(file.size / 1024).toFixed(2)} KB</span>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {isUploading && uploadProgress > 0 && (
        <div className="space-y-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-blue-900">🔄 Uploading your projects...</span>
            <span className="font-bold text-blue-600">{Math.round(uploadProgress)}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex gap-3 animate-pulse">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-red-900">Upload Error</h3>
            <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex gap-3 animate-pulse">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-green-900">✅ Upload Successful</h3>
            <p className="text-sm text-green-700 mt-1">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <Button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 h-auto rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
      >
        <Upload className="w-5 h-5 mr-2" />
        {isUploading ? 'Uploading...' : 'Upload Projects'}
      </Button>

      {!file && (
        <p className="text-xs text-amber-600 text-center italic">
          Required: Excel or CSV file with supervisor, interested_area, and project_idea columns
        </p>
      )}
    </div>
  );
}

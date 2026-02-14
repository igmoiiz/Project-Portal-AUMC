'use client';

import { Header } from '@/components/Header';
import { UploadForm } from '@/components/UploadForm';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FacultyPage() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('faculty_token');
    if (!token) {
      router.push('/faculty/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('faculty_token');
    localStorage.removeItem('faculty_user');
    router.push('/faculty/login');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-amber-50">Loading...</div>;
  }

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage(null);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
    setSuccessMessage(null);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-10">
          {/* Page Header */}
          <div className="space-y-2 border-b-2 border-amber-200 pb-8">
            <h1 className="text-4xl font-serif font-bold text-amber-950">
              📤 Faculty Project Upload
            </h1>
            <p className="text-lg text-amber-700">
              Share your project ideas with students by uploading an Excel spreadsheet
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upload Form Card */}
              <div className="bg-white rounded-xl border-2 border-amber-200 p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <h2 className="text-2xl font-serif font-bold text-amber-950 mb-2">
                    Upload Excel File
                  </h2>
                  <p className="text-amber-700 text-sm">
                    Select and upload an .xlsx file with your project ideas
                  </p>
                </div>
                <UploadForm
                  onSuccess={handleSuccess}
                  onError={handleError}
                />
              </div>

              {/* Status Messages */}
              {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 flex gap-4 animate-slide-in">
                  <div className="text-2xl">✅</div>
                  <div>
                    <h3 className="font-bold text-green-900">{successMessage}</h3>
                    <p className="text-sm text-green-700 mt-1">Your project ideas have been successfully added to the portal.</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 flex gap-4 animate-slide-in">
                  <div className="text-2xl">❌</div>
                  <div>
                    <h3 className="font-bold text-red-900">Upload Failed</h3>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Instructions & Example */}
            <div className="space-y-6">
              {/* Instructions Box */}
              <div className="bg-amber-50 rounded-xl border-2 border-amber-300 p-6">
                <h3 className="text-lg font-serif font-bold text-amber-950 mb-4 flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  Instructions
                </h3>
                <ol className="space-y-3 text-sm">
                  {[
                    'Prepare an Excel file (.xlsx)',
                    'Include columns: supervisor, interested_area, project_idea',
                    'Select your file using the browser',
                    'Click "Upload Projects" to submit',
                    'View confirmation message'
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 text-amber-950 font-bold text-xs flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-amber-900 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips Box */}
              <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                <h3 className="text-lg font-serif font-bold text-blue-950 mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  Tips
                </h3>
                <ul className="space-y-2 text-xs text-blue-900">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Use clear, descriptive project titles</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Ensure supervisor names are consistent</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Include 20-50 character descriptions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* File Format Example Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <h2 className="text-2xl font-serif font-bold text-amber-950">
                Excel File Format Example
              </h2>
            </div>
            <div className="bg-white rounded-xl border-2 border-amber-200 overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-amber-100 to-amber-50 border-b-2 border-amber-300">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-amber-950 text-sm uppercase tracking-wide">Supervisor</th>
                      <th className="px-6 py-4 text-left font-bold text-amber-950 text-sm uppercase tracking-wide">Interested Area</th>
                      <th className="px-6 py-4 text-left font-bold text-amber-950 text-sm uppercase tracking-wide">Project Idea</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-200">
                    {[
                      { supervisor: 'Dr. Ahmed Khan', area: 'Web Development', idea: 'Smart Campus Portal with Real-time Updates' },
                      { supervisor: 'Dr. Fatima Ali', area: 'AI/ML', idea: 'Student Performance Prediction System' },
                      { supervisor: 'Dr. Muhammad Hassan', area: 'Cybersecurity', idea: 'Campus Network Security Audit Tool' }
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white hover:bg-amber-25' : 'bg-amber-50 hover:bg-amber-100'}>
                        <td className="px-6 py-4 text-amber-950 font-medium">{row.supervisor}</td>
                        <td className="px-6 py-4 text-amber-900">{row.area}</td>
                        <td className="px-6 py-4 text-amber-900">{row.idea}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

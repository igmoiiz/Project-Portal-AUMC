'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { loginFaculty } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await loginFaculty(email, password);

    if (result.success && result.token) {
      // Store token
      localStorage.setItem('faculty_token', result.token);
      localStorage.setItem('faculty_user', JSON.stringify(result.user));
      // Redirect to dashboard
      router.push('/faculty');
    } else {
      setError(result.message || 'Login failed');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      <Header />
      
      <main className="flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-md border-2 border-amber-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif font-bold text-amber-950 text-center">Faculty Login</CardTitle>
            <CardDescription className="text-center text-amber-700">
              Enter your credentials to access the portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@university.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-amber-200 focus:ring-amber-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-amber-200 focus:ring-amber-500"
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-amber-100 pt-6">
            <p className="text-sm text-amber-600">
              Protected area for faculty members only.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

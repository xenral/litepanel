'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Form, 
  FormInput, 
  FormCheckbox, 
  FormSubmit, 
  FormSuccess,
  ValidationSchemas 
} from '@/components/ui/form';

// Login form schema
const loginSchema = z.object({
  email: ValidationSchemas.email,
  password: ValidationSchemas.password,
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);

  const handleLogin = async (data: LoginFormData) => {
    try {
      // In development, simulate login
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess('Login successful! Redirecting to dashboard...');
        
        // Store auth token (in real app, would come from API)
        localStorage.setItem('auth_token', 'demo_token_' + Date.now());
        localStorage.setItem('user_email', data.email);
        
        setTimeout(() => {
          router.replace('/dashboard');
        }, 1000);
        return;
      }

      // Real API call would go here
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const result = await response.json();
      localStorage.setItem('auth_token', result.token);
      
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => router.replace('/dashboard'), 1000);
    } catch (error) {
      throw error; // Let form handle the error
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      setSocialLoading(provider);
      
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSuccess(`${provider} login successful! Redirecting...`);
        localStorage.setItem('auth_token', `demo_${provider}_token_` + Date.now());
        setTimeout(() => router.replace('/dashboard'), 1000);
        return;
      }

      // Real OAuth flow would go here
      window.location.href = `/api/auth/${provider}`;
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <Form
        schema={loginSchema}
        onSubmit={handleLogin}
        defaultValues={{ email: '', password: '', rememberMe: false }}
        className="space-y-4"
      >
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          required
        />

        <div className="space-y-2">
          <FormInput
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            required
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-8 h-7 w-7 p-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <FormCheckbox
            name="rememberMe"
            label="Remember me"
          />
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <FormSuccess message={success} show={!!success} />

        <FormSubmit className="w-full">
          Sign In
        </FormSubmit>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          disabled={!!socialLoading}
        >
          {socialLoading === 'google' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('github')}
          disabled={!!socialLoading}
        >
          {socialLoading === 'github' ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
      </div>

      <p className="px-8 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link
          href="/auth/register"
          className="hover:text-brand underline underline-offset-4"
        >
          Sign up
        </Link>
      </p>

      {/* Demo credentials */}
      {process.env.NODE_ENV === 'development' && (
        <Alert>
          <AlertDescription>
            <strong>Demo credentials:</strong><br />
            Email: demo@example.com<br />
            Password: password123
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 
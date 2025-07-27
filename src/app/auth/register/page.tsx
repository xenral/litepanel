'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormInput,
  FormCheckbox,
  FormSubmit,
  FormSuccess,
  ValidationSchemas,
} from '@/components/ui/form';

// Register form schema
const registerSchema = z
  .object({
    name: ValidationSchemas.required.min(
      2,
      'Name must be at least 2 characters'
    ),
    email: ValidationSchemas.email,
    password: ValidationSchemas.password.min(
      8,
      'Password must be at least 8 characters'
    ),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        'You must accept the terms and conditions'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState('');

  const handleRegister = async (data: RegisterFormData) => {
    try {
      // In development, simulate registration
      if (process.env.NODE_ENV === 'development') {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSuccess(
          'Registration successful! Please check your email to verify your account.'
        );

        // In real app, would redirect to email verification page
        setTimeout(() => {
          router.replace(
            '/auth/login?message=Please check your email to verify your account'
          );
        }, 2000);
        return;
      }

      // Real API call would go here
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      setSuccess(
        'Registration successful! Please check your email to verify your account.'
      );
      setTimeout(() => {
        router.replace('/auth/login?message=Registration successful');
      }, 2000);
    } catch (error) {
      throw error; // Let form handle the error
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your details below to create your account
        </p>
      </div>

      <Form
        schema={registerSchema}
        onSubmit={handleRegister}
        defaultValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false,
        }}
        className="space-y-4"
      >
        <FormInput
          name="name"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          required
        />

        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          required
        />

        <div className="relative">
          <FormInput
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
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

        <div className="relative">
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            required
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-8 h-7 w-7 p-0"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        <FormCheckbox
          name="acceptTerms"
          label={
            <span className="text-sm">
              I agree to the{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          }
        />

        <FormSuccess message={success} show={!!success} />

        <FormSubmit className="w-full">Create Account</FormSubmit>
      </Form>

      <p className="text-muted-foreground px-8 text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>

      {/* Password requirements */}
      <Alert>
        <AlertDescription>
          <strong>Password requirements:</strong>
          <ul className="mt-2 space-y-1 text-xs">
            <li>• At least 8 characters long</li>
            <li>• Include both letters and numbers</li>
            <li>• Use a mix of uppercase and lowercase</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}

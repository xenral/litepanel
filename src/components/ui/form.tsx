'use client';

import * as React from 'react';
import { useForm, FieldPath, Control, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Form field component with validation
 */
interface FormFieldProps<T extends Record<string, any>> {
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField<T extends Record<string, any>>({
  name,
  label,
  description,
  required,
  className,
  children,
}: FormFieldProps<T>) {
  const { formState } = useFormContext<T>();
  const error = formState.errors[name];

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && (
        <div className="flex items-center space-x-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          <span>{error.message as string}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Form input component
 */
interface FormInputProps<T extends Record<string, any>> 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
}

export function FormInput<T extends Record<string, any>>({
  name,
  label,
  description,
  required,
  className,
  ...props
}: FormInputProps<T>) {
  const { register, formState } = useFormContext<T>();
  const error = formState.errors[name];

  return (
    <FormField name={name} label={label} description={description} required={required}>
      <Input
        id={name}
        {...register(name)}
        className={cn(error && "border-destructive", className)}
        {...props}
      />
    </FormField>
  );
}

/**
 * Form textarea component
 */
interface FormTextareaProps<T extends Record<string, any>>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
}

export function FormTextarea<T extends Record<string, any>>({
  name,
  label,
  description,
  required,
  className,
  ...props
}: FormTextareaProps<T>) {
  const { register, formState } = useFormContext<T>();
  const error = formState.errors[name];

  return (
    <FormField name={name} label={label} description={description} required={required}>
      <Textarea
        id={name}
        {...register(name)}
        className={cn(error && "border-destructive", className)}
        {...props}
      />
    </FormField>
  );
}

/**
 * Form select component
 */
interface FormSelectProps<T extends Record<string, any>> {
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
  className?: string;
}

export function FormSelect<T extends Record<string, any>>({
  name,
  label,
  description,
  required,
  placeholder,
  options,
  className,
}: FormSelectProps<T>) {
  const { setValue, watch, formState } = useFormContext<T>();
  const value = watch(name);
  const error = formState.errors[name];

  return (
    <FormField name={name} label={label} description={description} required={required}>
      <Select
        value={value}
        onValueChange={(val) => setValue(name, val as any)}
      >
        <SelectTrigger className={cn(error && "border-destructive", className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

/**
 * Form checkbox component
 */
interface FormCheckboxProps<T extends Record<string, any>> {
  name: FieldPath<T>;
  label?: string | React.ReactNode;
  description?: string;
  required?: boolean;
  className?: string;
}

export function FormCheckbox<T extends Record<string, any>>({
  name,
  label,
  description,
  required,
  className,
}: FormCheckboxProps<T>) {
  const { setValue, watch, formState } = useFormContext<T>();
  const value = watch(name);
  const error = formState.errors[name];

  return (
    <FormField name={name} description={description} required={required} className={className}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          checked={value}
          onCheckedChange={(checked) => setValue(name, checked as any)}
          className={cn(error && "border-destructive")}
        />
        {label && (
          <Label htmlFor={name} className="text-sm font-medium cursor-pointer">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
      </div>
    </FormField>
  );
}

/**
 * Form radio group component
 */
interface FormRadioGroupProps<T extends Record<string, any>> {
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  className?: string;
}

export function FormRadioGroup<T extends Record<string, any>>({
  name,
  label,
  description,
  required,
  options,
  className,
}: FormRadioGroupProps<T>) {
  const { setValue, watch, formState } = useFormContext<T>();
  const value = watch(name);
  const error = formState.errors[name];

  return (
    <FormField name={name} label={label} description={description} required={required}>
      <RadioGroup
        value={value}
        onValueChange={(val) => setValue(name, val as any)}
        className={cn("grid grid-cols-1 gap-2", className)}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              className={cn(error && "border-destructive")}
            />
            <Label htmlFor={`${name}-${option.value}`} className="cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </FormField>
  );
}

/**
 * Form submission component
 */
interface FormSubmitProps {
  children: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function FormSubmit({
  children,
  loading,
  loadingText = "Submitting...",
  variant = "default",
  size = "default",
  className,
}: FormSubmitProps) {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={loading || formState.isSubmitting}
      variant={variant}
      size={size}
      className={className}
    >
      {loading || formState.isSubmitting ? loadingText : children}
    </Button>
  );
}

/**
 * Main form component with validation
 */
interface FormProps<T extends Record<string, any>> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void> | void;
  defaultValues?: Partial<T>;
  children: React.ReactNode;
  className?: string;
}

export function Form<T extends Record<string, any>>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
}: FormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const handleSubmit = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-6", className)}>
        {children}
      </form>
    </FormProvider>
  );
}

/**
 * Form success message component
 */
interface FormSuccessProps {
  message: string;
  show: boolean;
}

export function FormSuccess({ message, show }: FormSuccessProps) {
  if (!show) return null;

  return (
    <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
      <CheckCircle2 className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}

/**
 * Common validation schemas
 */
export const ValidationSchemas = {
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  required: z.string().min(1, 'This field is required'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
  url: z.string().url('Please enter a valid URL'),
};

export { FormProvider, useFormContext }; 
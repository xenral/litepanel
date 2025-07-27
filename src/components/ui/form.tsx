'use client';

import * as React from 'react';
import {
  useForm,
  FormProvider,
  useFormContext,
  FieldValues,
  Path,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Common validation schemas
export const ValidationSchemas = {
  required: z.string().min(1, 'This field is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z
    .string()
    .regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number'),
  url: z.string().url('Please enter a valid URL'),
};

// Form context
interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: Path<TFieldValues>;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

// Form field wrapper
export function FormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  children,
}: {
  name: Path<TFieldValues>;
  children: React.ReactNode;
}) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
}

// Form item wrapper
export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-2', className)} {...props} />;
}

// Form label
export function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { name } = React.useContext(FormFieldContext);
  return <Label className={cn(className)} htmlFor={name} {...props} />;
}

// Form control wrapper
export function FormControl({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}

// Form description
export function FormDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...props} />
  );
}

// Form message (for errors)
export function FormMessage({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { name } = React.useContext(FormFieldContext);
  const { formState } = useFormContext();
  const error = formState.errors[name];

  if (!error) return null;

  return (
    <p
      className={cn(
        'text-destructive flex items-center gap-1 text-sm font-medium',
        className
      )}
      {...props}
    >
      <AlertCircle className="h-3 w-3" />
      {error.message as string}
    </p>
  );
}

// Main Form component
interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  schema: z.ZodType<any>;
  onSubmit: (values: any) => void | Promise<void>;
  defaultValues?: any;
  children: React.ReactNode;
}

export function Form({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
  ...props
}: FormProps) {
  const form = useForm({
    resolver: (zodResolver as any)(schema),
    defaultValues,
  });

  const handleSubmit = async (values: any) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn('space-y-6', className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

// Convenient form input component
interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string;
  label?: string;
  description?: string;
}

export function FormInput({
  name,
  label,
  description,
  className,
  ...props
}: FormInputProps) {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <FormField name={name as any}>
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input
            {...register(name)}
            className={cn(error && 'border-destructive', className)}
            {...props}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    </FormField>
  );
}

// Form textarea component
interface FormTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  name: string;
  label?: string;
  description?: string;
}

export function FormTextarea({
  name,
  label,
  description,
  className,
  ...props
}: FormTextareaProps) {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];

  return (
    <FormField name={name as any}>
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Textarea
            {...register(name)}
            className={cn(error && 'border-destructive', className)}
            {...props}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    </FormField>
  );
}

// Form checkbox component
interface FormCheckboxProps {
  name: string;
  label?: string | React.ReactNode;
  description?: string;
}

export function FormCheckbox({ name, label, description }: FormCheckboxProps) {
  const { register, watch } = useFormContext();
  const checked = watch(name);

  return (
    <FormField name={name as any}>
      <FormItem>
        <div className="flex items-center space-x-2">
          <FormControl>
            <Checkbox {...register(name)} checked={checked} />
          </FormControl>
          {label && (
            <FormLabel className="cursor-pointer text-sm font-normal">
              {label}
            </FormLabel>
          )}
        </div>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    </FormField>
  );
}

// Form submit button
interface FormSubmitProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export function FormSubmit({ children, disabled, ...props }: FormSubmitProps) {
  const { formState } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={disabled || formState.isSubmitting}
      {...props}
    >
      {formState.isSubmitting ? 'Loading...' : children}
    </Button>
  );
}

// Success message component
interface FormSuccessProps {
  message?: string;
  show?: boolean;
}

export function FormSuccess({ message, show }: FormSuccessProps) {
  if (!show || !message) return null;

  return (
    <div className="flex items-center gap-2 rounded bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20">
      <CheckCircle2 className="h-4 w-4" />
      {message}
    </div>
  );
}

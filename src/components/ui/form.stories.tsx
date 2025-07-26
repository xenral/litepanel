import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { fn } from '@storybook/test';
import { z } from 'zod';
import { 
  Form, 
  FormInput, 
  FormTextarea, 
  FormSelect, 
  FormCheckbox, 
  FormRadioGroup,
  FormSubmit,
  FormSuccess,
  ValidationSchemas 
} from './form';

const meta = {
  title: 'UI/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive form components with React Hook Form integration and Zod validation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form example
const basicSchema = z.object({
  name: ValidationSchemas.required,
  email: ValidationSchemas.email,
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const BasicForm: Story = {
  args: {},
  render: () => (
    <Form
      schema={basicSchema}
      onSubmit={async (data) => {
        console.log('Form submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }}
      defaultValues={{ name: '', email: '', message: '' }}
      className="max-w-md space-y-4"
    >
      <FormInput
        name="name"
        label="Full Name"
        placeholder="Enter your name"
        required
      />
      
      <FormInput
        name="email"
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        required
      />
      
      <FormTextarea
        name="message"
        label="Message"
        placeholder="Tell us about your project..."
        rows={4}
        required
      />
      
      <FormSubmit>Send Message</FormSubmit>
    </Form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic contact form with validation.',
      },
    },
  },
};

// Advanced form with all components
const advancedSchema = z.object({
  firstName: ValidationSchemas.required,
  lastName: ValidationSchemas.required,
  email: ValidationSchemas.email,
  phone: ValidationSchemas.phone,
  website: ValidationSchemas.url.optional(),
  role: z.enum(['developer', 'designer', 'manager', 'other']),
  experience: z.enum(['junior', 'mid', 'senior']),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  newsletter: z.boolean(),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms'),
});

export const AdvancedForm: Story = {
  render: () => (
    <Form
      schema={advancedSchema}
      onSubmit={async (data) => {
        console.log('Advanced form submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }}
      defaultValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
        role: 'developer',
        experience: 'mid',
        skills: [],
        bio: '',
        newsletter: false,
        terms: false,
      }}
      className="max-w-2xl space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="firstName"
          label="First Name"
          placeholder="John"
          required
        />
        
        <FormInput
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
          required
        />
        
        <FormInput
          name="phone"
          label="Phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>
      
      <FormInput
        name="website"
        label="Website"
        type="url"
        placeholder="https://yourwebsite.com"
        description="Optional: Your personal or company website"
      />
      
      <FormSelect
        name="role"
        label="Primary Role"
        placeholder="Select your role"
        options={[
          { value: 'developer', label: 'Software Developer' },
          { value: 'designer', label: 'UI/UX Designer' },
          { value: 'manager', label: 'Project Manager' },
          { value: 'other', label: 'Other' },
        ]}
        required
      />
      
      <FormRadioGroup
        name="experience"
        label="Experience Level"
        options={[
          { value: 'junior', label: 'Junior (0-2 years)' },
          { value: 'mid', label: 'Mid-level (3-5 years)' },
          { value: 'senior', label: 'Senior (5+ years)' },
        ]}
        required
      />
      
      <FormTextarea
        name="bio"
        label="Professional Bio"
        placeholder="Tell us about your background, skills, and interests..."
        rows={4}
        description="Minimum 50 characters"
        required
      />
      
      <FormCheckbox
        name="newsletter"
        label="Subscribe to our newsletter for updates and tips"
      />
      
      <FormCheckbox
        name="terms"
        label="I agree to the Terms of Service and Privacy Policy"
        required
      />
      
      <FormSubmit>Create Profile</FormSubmit>
    </Form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive form showcasing all form components and validation features.',
      },
    },
  },
};

// Login form example
const loginSchema = z.object({
  email: ValidationSchemas.email,
  password: ValidationSchemas.password,
  rememberMe: z.boolean(),
});

export const LoginForm: Story = {
  render: () => (
    <Form
      schema={loginSchema}
      onSubmit={async (data) => {
        console.log('Login attempt:', data);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }}
      defaultValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      className="max-w-sm space-y-4"
    >
      <FormInput
        name="email"
        label="Email"
        type="email"
        placeholder="your@email.com"
        required
      />
      
      <FormInput
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        required
      />
      
      <FormCheckbox
        name="rememberMe"
        label="Remember me for 30 days"
      />
      
      <FormSubmit>Sign In</FormSubmit>
    </Form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A typical login form with email and password fields.',
      },
    },
  },
};

// Form with success state
export const FormWithSuccess: Story = {
  render: () => {
    const [showSuccess, setShowSuccess] = React.useState(false);
    
    return (
      <Form
        schema={basicSchema}
        onSubmit={async (data) => {
          console.log('Form submitted:', data);
          await new Promise(resolve => setTimeout(resolve, 1000));
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }}
        defaultValues={{ name: '', email: '', message: '' }}
        className="max-w-md space-y-4"
      >
        <FormInput
          name="name"
          label="Name"
          placeholder="Your name"
          required
        />
        
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          required
        />
        
        <FormTextarea
          name="message"
          label="Message"
          placeholder="Your message..."
          required
        />
        
        <FormSuccess 
          message="Message sent successfully!"
          show={showSuccess}
        />
        
        <FormSubmit>Send Message</FormSubmit>
      </Form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with success state demonstration.',
      },
    },
  },
};

// Individual form components
export const FormInputs: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <h3 className="text-lg font-semibold mb-4">Form Input Variations</h3>
      
      <FormInput
        name="text"
        label="Text Input"
        placeholder="Enter text"
      />
      
      <FormInput
        name="email"
        label="Email Input"
        type="email"
        placeholder="email@example.com"
      />
      
      <FormInput
        name="password"
        label="Password Input"
        type="password"
        placeholder="••••••••"
      />
      
      <FormInput
        name="required"
        label="Required Field"
        placeholder="This field is required"
        required
      />
      
      <FormInput
        name="with-description"
        label="With Description"
        placeholder="Input with help text"
        description="This is a helpful description for the field"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different variations of form inputs.',
      },
    },
  },
}; 
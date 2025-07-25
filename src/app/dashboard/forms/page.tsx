import type { Metadata } from 'next';
import { 
  FormInput, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Building,
  Calendar,
  Upload,
  Save,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Form wizard, validation examples, and interactive form components',
};

/**
 * Mock wizard steps
 */
const wizardSteps = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Basic personal information',
    icon: User,
    completed: false
  },
  {
    id: 'contact',
    title: 'Contact Details',
    description: 'Email and phone information',
    icon: Mail,
    completed: false
  },
  {
    id: 'address',
    title: 'Address',
    description: 'Location and address details',
    icon: MapPin,
    completed: false
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Billing and payment info',
    icon: CreditCard,
    completed: false
  }
];

/**
 * Form validation examples
 */
const formExamples = [
  {
    title: 'User Registration',
    description: 'Complete user registration with validation',
    fields: ['Name', 'Email', 'Password', 'Confirm Password'],
    validations: ['Required fields', 'Email format', 'Password strength', 'Password match']
  },
  {
    title: 'Profile Update',
    description: 'Update user profile information',
    fields: ['First Name', 'Last Name', 'Bio', 'Avatar'],
    validations: ['Character limits', 'File upload', 'Image format', 'Optional fields']
  },
  {
    title: 'Contact Form',
    description: 'Customer support contact form',
    fields: ['Name', 'Email', 'Subject', 'Message'],
    validations: ['Required fields', 'Email format', 'Message length', 'Spam protection']
  },
  {
    title: 'Order Form',
    description: 'Product order with shipping details',
    fields: ['Product', 'Quantity', 'Address', 'Payment'],
    validations: ['Product selection', 'Quantity limits', 'Address format', 'Payment validation']
  }
];

/**
 * Forms page component
 */
export default function FormsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Forms</h1>
          <p className="text-muted-foreground mt-2">
            Interactive forms with validation, multi-step wizards, and rich input components.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Form</span>
          </Button>
        </div>
      </div>

      {/* Form Tabs */}
      <Tabs defaultValue="wizard" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-fit">
          <TabsTrigger value="wizard">Form Wizard</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>

        <TabsContent value="wizard" className="space-y-6">
          {/* Multi-step Form Wizard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FormInput className="h-5 w-5" />
                <span>Multi-Step Form Wizard</span>
              </CardTitle>
              <CardDescription>
                Create complex forms with step-by-step guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-between">
                {wizardSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === 0; // Mock active step
                  const isCompleted = step.completed;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`
                          flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors
                          ${isActive 
                            ? 'border-primary bg-primary text-primary-foreground' 
                            : isCompleted 
                              ? 'border-green-500 bg-green-500 text-white'
                              : 'border-muted-foreground bg-background text-muted-foreground'
                          }
                        `}>
                          {isCompleted ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <StepIcon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="text-center">
                          <div className={`text-sm font-medium ${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            {step.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {step.description}
                          </div>
                        </div>
                      </div>
                      {index < wizardSteps.length - 1 && (
                        <div className="mx-4 h-px w-16 bg-border" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Current Step Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>
                    Please provide your basic personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <div className="relative">
                      <Input 
                        id="bio" 
                        placeholder="Tell us about yourself (optional)"
                        className="pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                        0/250
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-between pt-4">
                    <Button variant="outline" disabled>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Step 1 of 4</Badge>
                      <Button>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          {/* Form Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formExamples.map((example) => (
              <Card key={example.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Form Fields:</h4>
                    <div className="flex flex-wrap gap-2">
                      {example.fields.map((field) => (
                        <Badge key={field} variant="outline">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Validations:</h4>
                    <div className="space-y-1">
                      {example.validations.map((validation) => (
                        <div key={validation} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Check className="h-3 w-3 text-green-500" />
                          <span>{validation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    View Example
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-6">
          {/* Form Validation Demo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Form Validation Demo</span>
              </CardTitle>
              <CardDescription>
                Real-time validation with error messages and success states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="border-red-500"
                    />
                    <div className="flex items-center space-x-1 text-sm text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>Please enter a valid email address</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Create a password"
                        className="border-green-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <Check className="h-3 w-3" />
                      <span>Password strength: Strong</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="(555) 123-4567"
                      className="border-green-500"
                    />
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <Check className="h-3 w-3" />
                      <span>Valid phone number format</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Password Requirements:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">At least 8 characters</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">Contains uppercase letter</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">Contains lowercase letter</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <AlertCircle className="h-3 w-3 text-yellow-500" />
                      <span className="text-yellow-600">Contains number</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <AlertCircle className="h-3 w-3 text-red-500" />
                      <span className="text-red-600">Contains special character</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Submit Form
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          {/* Form Components Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Components</CardTitle>
                <CardDescription>
                  Various input types and states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Standard Input</Label>
                  <Input placeholder="Enter text..." />
                </div>
                
                <div className="space-y-2">
                  <Label>With Icon</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Email address" className="pl-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>File Upload</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Components</CardTitle>
                <CardDescription>
                  Rich input components and widgets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Date Picker</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="date" className="pl-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rich Text Editor</Label>
                  <div className="border rounded-lg p-4 min-h-24 bg-muted/20">
                    <p className="text-sm text-muted-foreground">
                      Rich text editor component coming soon...
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Multi-select Tags</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
                    <Badge>React</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Tailwind</Badge>
                    <Input 
                      placeholder="Add tag..." 
                      className="border-0 p-0 h-6 text-sm flex-1 min-w-24"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
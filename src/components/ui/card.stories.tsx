import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible card component for displaying content with headers, descriptions, and actions.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Basic Card</CardTitle>
        <CardDescription>
          This is a simple card with header and description.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Card content goes here. You can add any content inside the card body.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithButton: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>
          This card includes a button in the content area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Click the button below to perform an action.</p>
        <Button>Take Action</Button>
      </CardContent>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        <Users className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1,234</div>
        <div className="text-muted-foreground flex items-center space-x-2 text-xs">
          <TrendingUp className="h-3 w-3 text-green-600" />
          <span className="text-green-600">+12%</span>
          <span>from last month</span>
        </div>
      </CardContent>
    </Card>
  ),
};

export const RevenueCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231</div>
        <div className="text-muted-foreground flex items-center space-x-2 text-xs">
          <TrendingUp className="h-3 w-3 text-green-600" />
          <span className="text-green-600">+20.1%</span>
          <span>from last month</span>
        </div>
      </CardContent>
    </Card>
  ),
};

export const ActivityCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
        <Activity className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">573</div>
        <div className="text-muted-foreground flex items-center space-x-2 text-xs">
          <span>+201 since last hour</span>
        </div>
      </CardContent>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <Badge variant="default" className="mt-2">
            +12%
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231</div>
          <Badge variant="default" className="mt-2">
            +20.1%
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Activity className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">573</div>
          <Badge variant="secondary" className="mt-2">
            Live
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion</CardTitle>
          <TrendingUp className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.24%</div>
          <Badge variant="outline" className="mt-2">
            -0.8%
          </Badge>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of cards arranged in a responsive grid layout.',
      },
    },
  },
};

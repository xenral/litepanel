import type { Metadata } from 'next';
import {
  Table as TableIcon,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const metadata: Metadata = {
  title: 'Data Table',
  description:
    'Advanced data grid with filtering, sorting, and CRUD operations',
};

/**
 * Mock user data for the table
 */
const userData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15 09:30:00',
    joinDate: '2023-08-15',
    projects: 12,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-14 16:45:00',
    joinDate: '2023-09-22',
    projects: 8,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2024-01-10 11:20:00',
    joinDate: '2023-07-03',
    projects: 3,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Editor',
    status: 'pending',
    lastLogin: null,
    joinDate: '2024-01-12',
    projects: 0,
  },
  {
    id: 5,
    name: 'Alex Wilson',
    email: 'alex.wilson@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15 14:15:00',
    joinDate: '2023-06-18',
    projects: 15,
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@example.com',
    role: 'Viewer',
    status: 'active',
    lastLogin: '2024-01-13 10:30:00',
    joinDate: '2023-11-05',
    projects: 2,
  },
  {
    id: 7,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2024-01-08 13:45:00',
    joinDate: '2023-05-12',
    projects: 6,
  },
  {
    id: 8,
    name: 'Jennifer Lee',
    email: 'jennifer.lee@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15 08:20:00',
    joinDate: '2023-10-30',
    projects: 9,
  },
];

/**
 * Get status badge variant and icon
 */
function getStatusInfo(status: string) {
  switch (status) {
    case 'active':
      return {
        variant: 'default' as const,
        icon: CheckCircle,
        label: 'Active',
      };
    case 'inactive':
      return {
        variant: 'secondary' as const,
        icon: XCircle,
        label: 'Inactive',
      };
    case 'pending':
      return {
        variant: 'outline' as const,
        icon: Clock,
        label: 'Pending',
      };
    default:
      return {
        variant: 'secondary' as const,
        icon: XCircle,
        label: 'Unknown',
      };
  }
}

/**
 * Get role badge variant
 */
function getRoleBadgeVariant(role: string) {
  switch (role) {
    case 'Admin':
      return 'destructive' as const;
    case 'Editor':
      return 'default' as const;
    case 'Viewer':
      return 'secondary' as const;
    default:
      return 'outline' as const;
  }
}

/**
 * Format date for display
 */
function formatDate(dateString: string | null) {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format datetime for display
 */
function formatDateTime(dateTimeString: string | null) {
  if (!dateTimeString) return 'Never';
  return new Date(dateTimeString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Data table page component
 */
export default function DataTablePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Table</h1>
          <p className="text-muted-foreground mt-2">
            Manage users with advanced filtering, sorting, and bulk operations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <TableIcon className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>{userData.length} users total</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                <Input placeholder="Search users..." className="w-64 pl-9" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table Header */}
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium"
                      >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                      Email
                    </th>
                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                      Role
                    </th>
                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                      <Button
                        variant="ghost"
                        className="h-auto p-0 font-medium"
                      >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                      Projects
                    </th>
                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                      Last Login
                    </th>
                    <th className="text-muted-foreground h-12 px-4 text-left align-middle font-medium">
                      Join Date
                    </th>
                    <th className="text-muted-foreground h-12 px-4 text-right align-middle font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => {
                    const statusInfo = getStatusInfo(user.status);
                    const StatusIcon = statusInfo.icon;

                    return (
                      <tr
                        key={user.id}
                        className={`hover:bg-muted/50 border-b transition-colors ${
                          index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                        }`}
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                              <span className="text-primary text-sm font-medium">
                                {user.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-muted-foreground text-sm">
                                ID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-sm">{user.email}</div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="h-4 w-4" />
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.label}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="font-medium">{user.projects}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-sm">
                            {formatDateTime(user.lastLogin)}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-sm">
                            {formatDate(user.joinDate)}
                          </div>
                        </td>
                        <td className="p-4 text-right align-middle">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="cursor-pointer">
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit user
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete user
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-muted-foreground text-sm">
              Showing 1 to {userData.length} of {userData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Features Info */}
      <Card>
        <CardHeader>
          <CardTitle>Table Features</CardTitle>
          <CardDescription>
            This table will be enhanced with TanStack Table for advanced
            functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">Sorting & Filtering</h4>
              <p className="text-muted-foreground text-sm">
                Click column headers to sort, use filters to narrow results
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Bulk Operations</h4>
              <p className="text-muted-foreground text-sm">
                Select multiple rows for bulk edit, delete, or export operations
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Virtualization</h4>
              <p className="text-muted-foreground text-sm">
                Handle thousands of rows with smooth scrolling performance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

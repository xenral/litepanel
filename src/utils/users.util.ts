import { User } from 'lucide-react';
import { roleIconMap, statusColorMap, statusIconMap } from '@/data/users.data';

export const formatLastLogin = (dateString: string | null) => {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

export const getRoleIcon = (role: string) => {
  return roleIconMap.get(role) || User;
};

export const getStatusColor = (status: string) => {
  return statusColorMap.get(status) || 'secondary';
};

export const getStatusIcon = (status: string) => {
  return statusIconMap.get(status) || User;
};

export const filterUsers = (
  users: any[],
  searchTerm: string,
  departmentFilter: string,
  roleFilter: string,
  statusFilter: string
) => {
  return users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === 'All Departments' ||
      user.department === departmentFilter;
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    const matchesStatus =
      statusFilter === 'All Status' || user.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });
};

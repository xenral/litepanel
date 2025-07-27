import { User } from 'lucide-react';
import {
  DataUser,
  roleIconMap,
  statusColorMap,
  roleColorMap,
} from '@/data/data-users.data';

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

export const getStatusColor = (
  status: string
): 'default' | 'secondary' | 'outline' => {
  return statusColorMap.get(status) || 'secondary';
};

export const getRoleBadgeVariant = (
  role: string
): 'destructive' | 'default' | 'secondary' => {
  return roleColorMap.get(role) || 'secondary';
};

export const filterUsers = (
  users: DataUser[],
  searchTerm: string,
  statusFilter: string,
  roleFilter: string
) => {
  return users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    const matchesRole =
      roleFilter === 'all' || user.role.toLowerCase() === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });
};

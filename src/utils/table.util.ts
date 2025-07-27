import { XCircle } from 'lucide-react';
import {
  statusInfoMap,
  roleBadgeVariantMap,
  StatusInfo,
} from '@/data/table.data';

export const getStatusInfo = (status: string): StatusInfo => {
  return (
    statusInfoMap.get(status) || {
      variant: 'secondary',
      icon: XCircle,
      label: 'Unknown',
    }
  );
};

export const getRoleBadgeVariant = (
  role: string
): 'destructive' | 'default' | 'secondary' => {
  return roleBadgeVariantMap.get(role) || 'secondary';
};

export const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Never';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (dateTimeString: string | null) => {
  if (!dateTimeString) return 'Never';
  return new Date(dateTimeString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

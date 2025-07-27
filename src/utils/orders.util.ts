import { AlertCircle } from 'lucide-react';
import { Order, statusIconMap, statusColorMap } from '@/data/orders.data';

export const getStatusIcon = (status: string) => {
  return statusIconMap.get(status) || AlertCircle;
};

export const getStatusColor = (
  status: string
): 'outline' | 'secondary' | 'default' | 'destructive' => {
  return statusColorMap.get(status) || 'outline';
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
};

export const filterOrders = (
  orders: Order[],
  searchTerm: string,
  statusFilter: string
) => {
  return orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Status' ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });
};

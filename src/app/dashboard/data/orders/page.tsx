'use client';

import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { OrdersHeader } from '@/components/data/orders-header';
import { OrdersStats } from '@/components/data/orders-stats';
import { ResponsiveContainer } from '@/components/ui/responsive-grid';
import {
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';

// Mock orders data
const ordersData = [
  {
    id: 'ORD-2024-001',
    customer: {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face',
    },
    total: 299.99,
    status: 'Delivered',
    items: 3,
    date: '2024-01-20T10:30:00Z',
    shippingAddress: '123 Main St, San Francisco, CA 94105',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-2024-002',
    customer: {
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    },
    total: 149.5,
    status: 'Shipped',
    items: 2,
    date: '2024-01-19T14:22:00Z',
    shippingAddress: '456 Oak Ave, New York, NY 10001',
    paymentMethod: 'PayPal',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-2024-003',
    customer: {
      name: 'Carol Davis',
      email: 'carol.davis@example.com',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    },
    total: 89.99,
    status: 'Processing',
    items: 1,
    date: '2024-01-18T16:45:00Z',
    shippingAddress: '789 Pine St, Austin, TX 78701',
    paymentMethod: 'Credit Card',
    trackingNumber: null,
  },
  {
    id: 'ORD-2024-004',
    customer: {
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    },
    total: 459.99,
    status: 'Pending',
    items: 5,
    date: '2024-01-17T11:20:00Z',
    shippingAddress: '321 Elm St, Seattle, WA 98101',
    paymentMethod: 'Bank Transfer',
    trackingNumber: null,
  },
  {
    id: 'ORD-2024-005',
    customer: {
      name: 'Eva Brown',
      email: 'eva.brown@example.com',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face',
    },
    total: 199.99,
    status: 'Cancelled',
    items: 2,
    date: '2024-01-16T09:30:00Z',
    shippingAddress: '654 Birch Rd, Los Angeles, CA 90210',
    paymentMethod: 'Credit Card',
    trackingNumber: null,
  },
  {
    id: 'ORD-2024-006',
    customer: {
      name: 'Frank Miller',
      email: 'frank.miller@example.com',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face',
    },
    total: 79.99,
    status: 'Delivered',
    items: 1,
    date: '2024-01-15T13:15:00Z',
    shippingAddress: '987 Cedar Ave, Chicago, IL 60601',
    paymentMethod: 'PayPal',
    trackingNumber: 'TRK456789123',
  },
];

const orderStats = {
  totalOrders: 15420,
  totalRevenue: 2347850,
  averageOrder: 152.34,
  pendingOrders: 89,
  processingOrders: 156,
  shippedOrders: 234,
  deliveredOrders: 13456,
  cancelledOrders: 45,
  refundedOrders: 23,
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Pending':
      return Clock;
    case 'Processing':
      return Package;
    case 'Shipped':
      return Truck;
    case 'Delivered':
      return CheckCircle2;
    case 'Cancelled':
      return XCircle;
    case 'Refunded':
      return RotateCcw;
    default:
      return AlertCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'outline';
    case 'Processing':
      return 'secondary';
    case 'Shipped':
      return 'default';
    case 'Delivered':
      return 'default';
    case 'Cancelled':
      return 'destructive';
    case 'Refunded':
      return 'secondary';
    default:
      return 'outline';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
};

export default function OrdersDataPage() {
  return (
    <ResponsiveContainer>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/data">
              Data Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Orders</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <OrdersHeader
        title="Order Management"
        description="Track and manage customer orders and fulfillment"
      />

      {/* Stats Cards */}
      <OrdersStats stats={orderStats} />

      {/* Simplified Orders Table - For demonstration */}
      <div className="rounded-lg border bg-card p-4 sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <p className="text-muted-foreground text-sm">
            Latest customer orders and their status
          </p>
        </div>
        
        {/* Mobile-friendly order cards */}
        <div className="space-y-4">
          {ordersData.slice(0, 5).map((order) => (
            <div key={order.id} className="rounded-lg border p-4">
              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="space-y-2">
                  <div className="font-mono text-sm font-medium">{order.id}</div>
                  <div className="text-sm">{order.customer.name}</div>
                  <div className="text-muted-foreground text-xs">{formatDate(order.date)}</div>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
                  <div className="font-medium">${order.total}</div>
                  <div className="text-sm text-muted-foreground">{order.items} items</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResponsiveContainer>
  );
}

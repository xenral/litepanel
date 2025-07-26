import {
  Clock,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertCircle,
  ShoppingCart,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export interface OrderCustomer {
  name: string;
  email: string;
  avatar: string;
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  items: number;
  date: string;
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber: string | null;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrder: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  refundedOrders: number;
}

export const statusFilters = [
  'All Status',
  'Pending',
  'Processing', 
  'Shipped',
  'Delivered',
  'Cancelled'
];

export const ordersData: Order[] = [
  {
    id: 'ORD-2024-001',
    customer: {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face',
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
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    },
    total: 149.50,
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
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
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
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
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
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face',
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
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face',
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

export const orderStats: OrderStats = {
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

// Status mappings using Maps for better performance
export const statusIconMap = new Map([
  ['Pending', Clock],
  ['Processing', Package],
  ['Shipped', Truck],
  ['Delivered', CheckCircle2],
  ['Cancelled', XCircle],
  ['Refunded', RotateCcw],
]);

export const statusColorMap = new Map<string, "outline" | "secondary" | "default" | "destructive">([
  ['Pending', 'outline'],
  ['Processing', 'secondary'],
  ['Shipped', 'default'],
  ['Delivered', 'default'],
  ['Cancelled', 'destructive'],
  ['Refunded', 'secondary'],
]);

export const statsIconMap = new Map([
  ['totalOrders', ShoppingCart],
  ['totalRevenue', DollarSign],
  ['averageOrder', TrendingUp],
  ['pendingOrders', Clock],
  ['shippedOrders', Truck],
  ['deliveredOrders', CheckCircle2],
]); 
import { Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out-of-stock';
  createdAt: string;
  description: string;
}

export interface ProductStats {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export const categories = [
  'All',
  'Electronics',
  'Clothing', 
  'Health',
  'Home'
];

export const statusOptions = [
  'All Status',
  'Active',
  'Inactive',
  'Out of Stock'
];

export const sampleProducts: Product[] = [
  {
    id: 'PRD-001',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 79.99,
    stock: 45,
    status: 'active',
    createdAt: '2024-01-15',
    description: 'High-quality wireless headphones with noise cancellation',
  },
  {
    id: 'PRD-002',
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    price: 24.99,
    stock: 0,
    status: 'out-of-stock',
    createdAt: '2024-01-12',
    description: 'Comfortable organic cotton t-shirt in various colors',
  },
  {
    id: 'PRD-003',
    name: 'Smart Water Bottle',
    category: 'Health',
    price: 49.99,
    stock: 23,
    status: 'active',
    createdAt: '2024-01-10',
    description: 'Smart water bottle that tracks your hydration',
  },
  {
    id: 'PRD-004',
    name: 'Vintage Denim Jacket',
    category: 'Clothing',
    price: 89.99,
    stock: 12,
    status: 'inactive',
    createdAt: '2024-01-08',
    description: 'Classic vintage-style denim jacket',
  },
  {
    id: 'PRD-005',
    name: 'Wireless Charging Pad',
    category: 'Electronics',
    price: 34.99,
    stock: 67,
    status: 'active',
    createdAt: '2024-01-05',
    description: 'Fast wireless charging pad for smartphones',
  },
];

// Status badge mappings using Maps for better performance
export const statusBadgeMap = new Map<Product['status'], { variant: string; label: string; className: string }>([
  ['active', { variant: 'default', label: 'Active', className: 'bg-green-100 text-green-800' }],
  ['inactive', { variant: 'secondary', label: 'Inactive', className: '' }],
  ['out-of-stock', { variant: 'destructive', label: 'Out of Stock', className: '' }],
]);

export const statsIconMap = new Map([
  ['total', Package],
  ['value', DollarSign], 
  ['lowStock', TrendingUp],
  ['outOfStock', AlertCircle],
]); 
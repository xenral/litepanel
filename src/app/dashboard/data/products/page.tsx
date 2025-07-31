'use client';

import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ProductsHeader } from '@/components/data/products-header';
import { ProductsStats } from '@/components/data/products-stats';
import { ProductsTable } from '@/components/data/products-table';
import { ResponsiveContainer } from '@/components/ui/responsive-grid';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out-of-stock';
  createdAt: string;
  description: string;
}

const sampleProducts: Product[] = [
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



export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const lowStockCount = products.filter(
    (p) => p.stock < 20 && p.stock > 0
  ).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

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
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <ProductsHeader
        title="Product Management"
        description="Manage your product inventory and details"
      />

      <Separator />

      {/* Stats Cards */}
      <ProductsStats
        totalProducts={products.length}
        totalValue={totalValue}
        lowStockCount={lowStockCount}
        outOfStockCount={outOfStockCount}
      />

      {/* Products Table */}
      <ProductsTable
        products={products}
        onProductsChange={setProducts}
      />
    </ResponsiveContainer>
  );
}

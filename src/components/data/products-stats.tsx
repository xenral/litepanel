'use client';

import { Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';

interface ProductsStatsProps {
  totalProducts: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
}

/**
 * Products Stats Component
 * Displays key product statistics in cards
 */
export function ProductsStats({ 
  totalProducts, 
  totalValue, 
  lowStockCount, 
  outOfStockCount 
}: ProductsStatsProps) {
  const stats = [
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      icon: Package,
      description: '+2 from last month',
    },
    {
      title: 'Total Value',
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      description: 'Inventory value',
    },
    {
      title: 'Low Stock',
      value: lowStockCount.toString(),
      icon: TrendingUp,
      description: 'Products below 20 units',
    },
    {
      title: 'Out of Stock',
      value: outOfStockCount.toString(),
      icon: AlertCircle,
      description: 'Requires restocking',
    },
  ];

  return (
    <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 4 }}>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
            <p className="text-muted-foreground text-xs">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </ResponsiveGrid>
  );
}
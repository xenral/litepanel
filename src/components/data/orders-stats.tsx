'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign, TrendingUp, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';

interface OrdersStatsProps {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    averageOrder: number;
    pendingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
  };
}

/**
 * Orders Stats Component
 * Displays key order statistics in animated cards
 */
export function OrdersStats({ stats }: OrdersStatsProps) {
  const statsData = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'text-muted-foreground',
    },
    {
      title: 'Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Avg. Order',
      value: `$${stats.averageOrder}`,
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      title: 'Pending',
      value: stats.pendingOrders.toString(),
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Shipped',
      value: stats.shippedOrders.toString(),
      icon: Truck,
      color: 'text-blue-600',
    },
    {
      title: 'Delivered',
      value: stats.deliveredOrders.toLocaleString(),
      icon: CheckCircle2,
      color: 'text-green-600',
    },
  ];

  return (
    <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3, xl: 6 }}>
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </ResponsiveGrid>
  );
}
import { Product, statusBadgeMap } from '@/data/products.data';

export const getStatusBadge = (status: Product['status']) => {
  const statusInfo = statusBadgeMap.get(status);
  return statusInfo || statusBadgeMap.get('active')!;
};

export const filterProducts = (
  products: Product[],
  searchTerm: string,
  statusFilter: string,
  categoryFilter: string
) => {
  return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || product.status === statusFilter.toLowerCase().replace(' ', '-');
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
};

export const calculateProductStats = (products: Product[]) => {
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockCount = products.filter(p => p.stock < 20 && p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;
  
  return {
    totalProducts: products.length,
    totalValue,
    lowStockCount,
    outOfStockCount,
  };
}; 
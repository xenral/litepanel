'use client';

import { useState } from 'react';
import { Search, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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

interface ProductsTableProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

const getStatusBadge = (status: Product['status']) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inactive</Badge>;
    case 'out-of-stock':
      return <Badge variant="destructive">Out of Stock</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

/**
 * Products Table Component
 * Displays products in a responsive table with filters and actions
 */
export function ProductsTable({ products, onProductsChange }: ProductsTableProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(new Set(filteredProducts.map((p) => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    const newSelection = new Set(selectedProducts);
    if (checked) {
      newSelection.add(productId);
    } else {
      newSelection.delete(productId);
    }
    setSelectedProducts(newSelection);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle className="text-lg">Products</CardTitle>
            <CardDescription className="text-sm">Manage your product inventory</CardDescription>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
            <div className="relative">
              <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-[200px] pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile view */}
        <div className="block md:hidden space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedProducts.has(product.id)}
                      onCheckedChange={(checked) =>
                        handleSelectProduct(product.id, checked === true)
                      }
                    />
                    <div className="font-medium truncate">{product.name}</div>
                  </div>
                  <div className="text-muted-foreground text-sm">{product.id}</div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>{product.category}</span>
                    <span>${product.price}</span>
                    <span className={product.stock < 20 ? 'text-orange-600' : ''}>
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {getStatusBadge(product.status)}
                    <span className="text-muted-foreground text-xs">{product.createdAt}</span>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40" align="end">
                    <div className="space-y-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-red-600 hover:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop table view */}
        <div className="hidden md:block">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        filteredProducts.length > 0 &&
                        filteredProducts.every((p) => selectedProducts.has(p.id))
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.has(product.id)}
                        onCheckedChange={(checked) =>
                          handleSelectProduct(product.id, checked === true)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-muted-foreground text-sm">{product.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <span className={product.stock < 20 ? 'text-orange-600' : ''}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>{product.createdAt}</TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40" align="end">
                          <div className="space-y-1">
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full justify-start">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-red-600 hover:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {selectedProducts.size > 0 && (
          <div className="flex flex-col space-y-2 pt-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <p className="text-muted-foreground text-sm">
              {selectedProducts.size} of {filteredProducts.length} product(s) selected
            </p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
              <Button variant="outline" size="sm">
                Bulk Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
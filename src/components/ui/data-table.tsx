'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  filterable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  actions?: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = "Search...",
  filterable = true,
  paginated = true,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  actions,
  className,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter data based on search term and filters
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((row) =>
          String(row[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    return filtered;
  }, [data, searchTerm, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, paginated]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const handleSelectRow = (row: T) => {
    const newSelection = selectedRows.includes(row)
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];
    
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectAll = () => {
    const newSelection = selectedRows.length === paginatedData.length ? [] : paginatedData;
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  const isSelected = (row: T) => selectedRows.includes(row);
  const isAllSelected = selectedRows.length === paginatedData.length && paginatedData.length > 0;

  return (
    <div className={className}>
      {/* Search and Filters */}
      {(searchable || filterable) && (
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          )}

          {filterable && (
            <div className="flex items-center space-x-2">
              {columns
                .filter((col) => col.filterable)
                .map((col) => (
                  <Select
                    key={col.key}
                    value={filters[col.key] || ''}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, [col.key]: value }))
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder={col.title} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All {col.title}</SelectItem>
                      {Array.from(new Set(data.map((row) => String(row[col.key])))).map(
                        (value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={column.width ? `w-${column.width}` : ''}
                >
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.key)}
                      className="h-auto p-0 font-medium"
                    >
                      {column.title}
                      {getSortIcon(column.key)}
                    </Button>
                  ) : (
                    column.title
                  )}
                </TableHead>
              ))}
              {actions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                {selectable && (
                  <TableCell>
                    <Checkbox
                      checked={isSelected(row)}
                      onCheckedChange={() => handleSelectRow(row)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(row)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
            {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Selection info */}
      {selectable && selectedRows.length > 0 && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            {selectedRows.length} row{selectedRows.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
} 
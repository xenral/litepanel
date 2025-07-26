'use client';

import * as React from 'react';
import { Check, X, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/calendar';

/**
 * Filter option interface
 */
interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  count?: number;
}

/**
 * Filter category interface
 */
interface FilterCategory {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  options: FilterOption[];
  type: 'checkbox' | 'radio' | 'date' | 'range';
  multiple?: boolean;
}

/**
 * Active filter interface
 */
interface ActiveFilter {
  categoryId: string;
  optionId: string;
  label: string;
  value: string | number | Date;
}

/**
 * Filter popover props
 */
interface FilterPopoverProps {
  /** Filter categories */
  categories: FilterCategory[];
  /** Active filters */
  activeFilters: ActiveFilter[];
  /** Callback when filters change */
  onFiltersChange: (filters: ActiveFilter[]) => void;
  /** Trigger button text */
  triggerText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show filter count on trigger */
  showCount?: boolean;
}

/**
 * Default filter categories for analytics
 */
export const DEFAULT_ANALYTICS_FILTERS: FilterCategory[] = [
  {
    id: 'timeframe',
    label: 'Time Frame',
    icon: Calendar,
    type: 'radio',
    options: [
      { id: 'today', label: 'Today', value: 'today' },
      { id: 'yesterday', label: 'Yesterday', value: 'yesterday' },
      { id: 'last-7-days', label: 'Last 7 days', value: 'last-7-days' },
      { id: 'last-30-days', label: 'Last 30 days', value: 'last-30-days' },
      { id: 'last-90-days', label: 'Last 90 days', value: 'last-90-days' },
      { id: 'this-month', label: 'This month', value: 'this-month' },
      { id: 'last-month', label: 'Last month', value: 'last-month' },
      { id: 'this-year', label: 'This year', value: 'this-year' },
      { id: 'custom', label: 'Custom range', value: 'custom' },
    ],
  },
  {
    id: 'traffic-source',
    label: 'Traffic Source',
    icon: TrendingUp,
    type: 'checkbox',
    multiple: true,
    options: [
      { id: 'direct', label: 'Direct', value: 'direct', count: 45230 },
      { id: 'organic', label: 'Organic Search', value: 'organic-search', count: 32840 },
      { id: 'social', label: 'Social Media', value: 'social-media', count: 28100 },
      { id: 'referral', label: 'Referral', value: 'referral', count: 12450 },
      { id: 'email', label: 'Email', value: 'email', count: 6212 },
      { id: 'paid', label: 'Paid Search', value: 'paid-search', count: 4890 },
    ],
  },
  {
    id: 'user-type',
    label: 'User Type',
    icon: Users,
    type: 'checkbox',
    multiple: true,
    options: [
      { id: 'new', label: 'New Users', value: 'new', count: 78420 },
      { id: 'returning', label: 'Returning Users', value: 'returning', count: 46412 },
      { id: 'premium', label: 'Premium Users', value: 'premium', count: 12890 },
      { id: 'trial', label: 'Trial Users', value: 'trial', count: 5670 },
    ],
  },
  {
    id: 'revenue-range',
    label: 'Revenue Range',
    icon: DollarSign,
    type: 'checkbox',
    multiple: true,
    options: [
      { id: 'under-100', label: 'Under $100', value: 'under-100', count: 2340 },
      { id: '100-500', label: '$100 - $500', value: '100-500', count: 1890 },
      { id: '500-1000', label: '$500 - $1,000', value: '500-1000', count: 980 },
      { id: '1000-5000', label: '$1,000 - $5,000', value: '1000-5000', count: 450 },
      { id: 'over-5000', label: 'Over $5,000', value: 'over-5000', count: 120 },
    ],
  },
];

/**
 * Filter popover component with commonly used analytics filters
 */
export function FilterPopover({
  categories,
  activeFilters,
  onFiltersChange,
  triggerText = 'Filter',
  className,
  showCount = true,
}: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false);
  const [tempFilters, setTempFilters] = React.useState<ActiveFilter[]>(activeFilters);

  // Update temp filters when active filters change
  React.useEffect(() => {
    setTempFilters(activeFilters);
  }, [activeFilters]);

  // Handle filter toggle
  const handleFilterToggle = (categoryId: string, option: FilterOption) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const existingFilterIndex = tempFilters.findIndex(
      f => f.categoryId === categoryId && f.optionId === option.id
    );

    let newFilters = [...tempFilters];

    if (existingFilterIndex >= 0) {
      // Remove existing filter
      newFilters.splice(existingFilterIndex, 1);
    } else {
      // Add new filter
      const newFilter: ActiveFilter = {
        categoryId,
        optionId: option.id,
        label: option.label,
        value: option.value,
      };

      if (category.type === 'radio' || !category.multiple) {
        // Remove other filters from the same category for radio/single select
        newFilters = newFilters.filter(f => f.categoryId !== categoryId);
      }

      newFilters.push(newFilter);
    }

    setTempFilters(newFilters);
  };

  // Apply filters
  const applyFilters = () => {
    onFiltersChange(tempFilters);
    setOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setTempFilters([]);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setTempFilters([]);
    onFiltersChange([]);
    setOpen(false);
  };

  // Remove individual filter
  const removeFilter = (filter: ActiveFilter) => {
    const newFilters = activeFilters.filter(
      f => !(f.categoryId === filter.categoryId && f.optionId === filter.optionId)
    );
    onFiltersChange(newFilters);
  };

  const activeFilterCount = activeFilters.length;

  return (
    <div className={cn('', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            {triggerText}
            {showCount && activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="start">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8 px-2 text-xs"
                >
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={applyFilters}
                  className="h-8 px-3 text-xs"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {categories.map((category, index) => (
              <div key={category.id}>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    {category.icon && (
                      <category.icon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <h5 className="font-medium text-sm">{category.label}</h5>
                  </div>

                  <div className="space-y-2">
                    {category.options.map((option) => {
                      const isSelected = tempFilters.some(
                        f => f.categoryId === category.id && f.optionId === option.id
                      );

                      return (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2 cursor-pointer hover:bg-accent/50 rounded p-2 -m-2"
                          onClick={() => handleFilterToggle(category.id, option)}
                        >
                          <Checkbox checked={isSelected} readOnly />
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-sm">{option.label}</span>
                            {option.count && (
                              <span className="text-xs text-muted-foreground">
                                {option.count.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {index < categories.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Active filters display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {activeFilters.map((filter) => (
            <Badge
              key={`${filter.categoryId}-${filter.optionId}`}
              variant="secondary"
              className="flex items-center gap-1 pr-1"
            >
              <span className="text-xs">{filter.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {activeFilters.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Date range filter component
 */
interface DateRangeFilterProps {
  /** Start date */
  from?: Date;
  /** End date */
  to?: Date;
  /** Callback when range changes */
  onRangeChange: (range: { from?: Date; to?: Date }) => void;
  /** Additional CSS classes */
  className?: string;
}

export function DateRangeFilter({
  from,
  to,
  onRangeChange,
  className,
}: DateRangeFilterProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DatePicker
        selected={from}
        onSelect={(date) => onRangeChange({ from: date, to })}
        placeholder="Start date"
        className="w-40"
      />
      <span className="text-muted-foreground">to</span>
      <DatePicker
        selected={to}
        onSelect={(date) => onRangeChange({ from, to: date })}
        placeholder="End date"
        className="w-40"
      />
    </div>
  );
} 
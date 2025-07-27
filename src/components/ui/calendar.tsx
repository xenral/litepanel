'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * Calendar component props
 */
interface CalendarProps {
  /** Currently selected date */
  selected?: Date;
  /** Callback when date is selected */
  onSelect?: (date: Date) => void;
  /** Disabled dates */
  disabled?: (date: Date) => boolean;
  /** Additional CSS classes */
  className?: string;
  /** Show week numbers */
  showWeekNumbers?: boolean;
  /** Custom date format */
  dateFormat?: string;
  /** Range selection mode */
  mode?: 'single' | 'range';
  /** Selected range (for range mode) */
  selectedRange?: { from?: Date; to?: Date };
  /** Range selection callback */
  onRangeSelect?: (range: { from?: Date; to?: Date }) => void;
}

/**
 * Get days in a month
 */
function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Get first day of month (0 = Sunday, 1 = Monday, etc.)
 */
function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Check if date is in range
 */
function isInRange(date: Date, range: { from?: Date; to?: Date }): boolean {
  if (!range.from || !range.to) return false;
  return date >= range.from && date <= range.to;
}

/**
 * Month names
 */
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Day names
 */
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Calendar component for date selection with theme support
 */
export function Calendar({
  selected,
  onSelect,
  disabled,
  className,
  showWeekNumbers = false,
  mode = 'single',
  selectedRange,
  onRangeSelect,
  ...props
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(selected || new Date());
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToPreviousYear = () => {
    setCurrentDate(new Date(year - 1, month, 1));
  };

  const goToNextYear = () => {
    setCurrentDate(new Date(year + 1, month, 1));
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const daysInPreviousMonth = getDaysInMonth(new Date(year, month - 1, 1));

  const calendarDays: (Date | null)[] = [];

  // Previous month's trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push(new Date(year, month - 1, daysInPreviousMonth - i));
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  // Next month's leading days
  const remainingCells = 42 - calendarDays.length; // 6 rows × 7 days
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push(new Date(year, month + 1, day));
  }

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (disabled?.(date)) return;

    if (mode === 'single') {
      onSelect?.(date);
      setCurrentDate(date);
    } else if (mode === 'range' && onRangeSelect) {
      if (!selectedRange?.from || (selectedRange.from && selectedRange.to)) {
        // Start new range
        onRangeSelect({ from: date, to: undefined });
      } else if (selectedRange.from && !selectedRange.to) {
        // Complete range
        if (date >= selectedRange.from) {
          onRangeSelect({ from: selectedRange.from, to: date });
        } else {
          onRangeSelect({ from: date, to: selectedRange.from });
        }
      }
    }
  };

  return (
    <div
      className={cn('bg-background rounded-lg border p-4', className)}
      {...props}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousYear}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
            <ChevronLeft className="-ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">
            {MONTHS[month]} {year}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextYear}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="-ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {showWeekNumbers && (
          <div className="text-muted-foreground flex h-8 w-8 items-center justify-center text-xs">
            Wk
          </div>
        )}
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-muted-foreground flex h-8 w-8 items-center justify-center text-xs font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from(
          { length: Math.ceil(calendarDays.length / 7) },
          (_, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {showWeekNumbers && (
                <div className="text-muted-foreground flex h-8 w-8 items-center justify-center text-xs">
                  {/* Week number calculation would go here */}
                  {weekIndex + 1}
                </div>
              )}
              {calendarDays
                .slice(weekIndex * 7, (weekIndex + 1) * 7)
                .map((date, dayIndex) => {
                  if (!date) return <div key={dayIndex} className="h-8 w-8" />;

                  const isCurrentMonth = date.getMonth() === month;
                  const isToday = isSameDay(date, today);
                  const isSelected = selected && isSameDay(date, selected);
                  const isDisabled = disabled?.(date);
                  const isInSelectedRange =
                    selectedRange &&
                    isInRange(date, selectedRange as { from: Date; to: Date });
                  const isRangeStart =
                    selectedRange?.from && isSameDay(date, selectedRange.from);
                  const isRangeEnd =
                    selectedRange?.to && isSameDay(date, selectedRange.to);

                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateClick(date)}
                      onMouseEnter={() => setHoveredDate(date)}
                      onMouseLeave={() => setHoveredDate(null)}
                      disabled={isDisabled}
                      className={cn(
                        'relative h-8 w-8 rounded-md text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2',
                        'disabled:pointer-events-none disabled:opacity-50',
                        !isCurrentMonth && 'text-muted-foreground opacity-50',
                        isCurrentMonth && 'text-foreground',
                        isToday &&
                          'bg-accent text-accent-foreground font-medium',
                        isSelected &&
                          'bg-primary text-primary-foreground font-medium',
                        isInSelectedRange && !isSelected && 'bg-primary/20',
                        (isRangeStart || isRangeEnd) &&
                          'bg-primary text-primary-foreground font-medium',
                        isDisabled && 'cursor-not-allowed opacity-30'
                      )}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
            </React.Fragment>
          )
        )}
      </div>

      {/* Today button */}
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const today = new Date();
            setCurrentDate(today);
            if (mode === 'single') {
              onSelect?.(today);
            }
          }}
          className="text-xs"
        >
          Today
        </Button>
      </div>
    </div>
  );
}

/**
 * Calendar date picker with popover
 */
interface DatePickerProps {
  /** Currently selected date */
  selected?: Date;
  /** Callback when date is selected */
  onSelect?: (date: Date | undefined) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled dates */
  disabled?: (date: Date) => boolean;
  /** Additional CSS classes */
  className?: string;
}

export function DatePicker({
  selected,
  onSelect,
  placeholder = 'Pick a date',
  disabled,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        className={cn(
          'w-full justify-start text-left font-normal',
          !selected && 'text-muted-foreground'
        )}
        onClick={() => setOpen(!open)}
      >
        {selected ? selected.toLocaleDateString() : <span>{placeholder}</span>}
      </Button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2">
          <Calendar
            selected={selected}
            onSelect={(date) => {
              onSelect?.(date);
              setOpen(false);
            }}
            disabled={disabled}
            className="shadow-md"
          />
        </div>
      )}
    </div>
  );
}

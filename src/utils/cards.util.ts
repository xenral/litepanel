import { Star } from 'lucide-react';
import React from 'react';
import {
  trendIconMap,
  trendColorMap,
  statusColorMap,
  priorityColorMap,
} from '@/data/cards.data';

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      React.createElement(Star, {
        key: i,
        className: 'h-4 w-4 fill-yellow-400 text-yellow-400',
      })
    );
  }

  if (rating % 1 !== 0) {
    stars.push(
      React.createElement(Star, {
        key: 'half',
        className: 'h-4 w-4 fill-yellow-400/50 text-yellow-400',
      })
    );
  }

  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      React.createElement(Star, {
        key: `empty-${i}`,
        className: 'h-4 w-4 text-gray-300',
      })
    );
  }

  return stars;
};

export const getTrendIcon = (trend: string) => {
  return trendIconMap.get(trend) || trendIconMap.get('stable');
};

export const getTrendColor = (trend: string) => {
  return trendColorMap.get(trend) || trendColorMap.get('stable');
};

export const getStatusColor = (
  status: string
): 'default' | 'destructive' | 'outline' | 'secondary' => {
  return statusColorMap.get(status.toLowerCase()) || 'outline';
};

export const getPriorityColor = (
  priority: string
): 'default' | 'destructive' | 'outline' | 'secondary' => {
  return priorityColorMap.get(priority.toLowerCase()) || 'outline';
};

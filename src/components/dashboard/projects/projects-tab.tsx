'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { recentProjects } from '@/data/dashboard';

/**
 * Projects Tab Component
 * Displays project cards with progress and status
 */
export function ProjectsTab() {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {recentProjects.map((project) => (
        <Card key={project.id} className="transition-all hover:shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="truncate text-lg">{project.name}</CardTitle>
              <Badge
                variant={
                  project.status === 'active'
                    ? 'default'
                    : project.status === 'completed'
                      ? 'secondary'
                      : 'outline'
                }
              >
                {project.status}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
              <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>Team: {project.team.length} members</span>
                <span className="ml-2 truncate">{project.lastActivity}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

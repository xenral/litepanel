import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { RecentProject } from '@/types/dashboard';

interface ProjectsTabProps {
  projects: RecentProject[];
}

export function ProjectsTab({ projects }: ProjectsTabProps) {
  const getStatusVariant = (status: RecentProject['status']) => {
    switch (status) {
      case 'active':
        return 'default' as const;
      case 'completed':
        return 'secondary' as const;
      case 'on-hold':
        return 'outline' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <Badge variant={getStatusVariant(project.status)}>
                {project.status}
              </Badge>
            </div>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Team: {project.team.length} members</span>
                <span>{project.lastActivity}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
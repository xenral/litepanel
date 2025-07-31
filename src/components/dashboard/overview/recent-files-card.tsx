'use client';

import { FileText, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { recentFiles } from '@/data/dashboard';

/**
 * Recent Files Card Component
 * Shows recently accessed files with metadata
 */
export function RecentFilesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Recent Files
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                  <span>{file.type}</span>
                  <span>•</span>
                  <span>{file.size}</span>
                  <span>•</span>
                  <span className="hidden sm:inline">{file.modified}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="ml-2 shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
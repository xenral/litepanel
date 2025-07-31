'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

/**
 * Performance Tabs Component
 * Detailed performance metrics in tabs
 */
export function PerformanceTabs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Performance Analysis</CardTitle>
        <CardDescription>
          In-depth analysis of performance metrics and user experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="loading" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="loading" className="text-xs sm:text-sm">
              Loading
            </TabsTrigger>
            <TabsTrigger value="runtime" className="text-xs sm:text-sm">
              Runtime
            </TabsTrigger>
            <TabsTrigger value="network" className="text-xs sm:text-sm">
              Network
            </TabsTrigger>
            <TabsTrigger value="visual" className="text-xs sm:text-sm">
              Visual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="loading" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Time to First Byte</h4>
                <div className="text-xl md:text-2xl font-bold">120ms</div>
                <Progress value={75} className="h-2" />
                <p className="text-muted-foreground text-xs">
                  Server response time is within acceptable range
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">DOM Content Loaded</h4>
                <div className="text-xl md:text-2xl font-bold">1.1s</div>
                <Progress value={65} className="h-2" />
                <p className="text-muted-foreground text-xs">
                  DOM parsing and loading performance
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="runtime" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">JavaScript Execution</h4>
                <div className="text-xl md:text-2xl font-bold">45ms</div>
                <Progress value={80} className="h-2" />
                <p className="text-muted-foreground text-xs">
                  Time spent executing JavaScript code
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Main Thread Blocking</h4>
                <div className="text-xl md:text-2xl font-bold">23ms</div>
                <Progress value={60} className="h-2" />
                <p className="text-muted-foreground text-xs">
                  Time main thread was blocked
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Total Transfer Size</h4>
                <div className="text-xl md:text-2xl font-bold">2.1MB</div>
                <Progress value={70} className="h-2" />
                <p className="text-muted-foreground text-xs">
                  Total bytes transferred over network
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Resource Load Time</h4>
                <div className="text-xl md:text-2xl font-bold">1.8s</div>
                <Progress value={85} className="h-2" />
                <p className="text-muted-foreground text-xs">
                  Time to load all resources
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Cumulative Layout Shift</h4>
                <div className="text-xl md:text-2xl font-bold">0.05</div>
                <Progress value={90} className="h-2" />
                <p className="text-muted-foreground text-xs">
                  Measures visual stability during page load
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">First Input Delay</h4>
                <div className="text-xl md:text-2xl font-bold">12ms</div>
                <Progress value={95} className="h-2" />
                <p className="text-muted-foreground text-xs">
                  Time from first user interaction to browser response
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
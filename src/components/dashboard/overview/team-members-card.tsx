'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamMemberCard } from '@/components/dashboard/team-member-card';
import { teamMembers } from '@/data/dashboard';

/**
 * Team Members Card Component
 * Displays active team members and their progress
 */
export function TeamMembersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Active team members and their progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
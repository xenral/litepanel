/**
 * Filter roles based on search term
 */
export const filterRoles = (roles: any[], searchTerm: string): any[] => {
  if (!searchTerm.trim()) return roles;

  return roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Toggle permission for a role
 */
export const togglePermission = (
  currentPermissions: string[],
  permissionId: string
): string[] => {
  if (currentPermissions.includes(permissionId)) {
    return currentPermissions.filter((p) => p !== permissionId);
  } else {
    return [...currentPermissions, permissionId];
  }
};

/**
 * Get permissions count by category for a role
 */
export const getPermissionCountByCategory = (
  rolePermissions: string[],
  categoryPermissions: any[]
): number => {
  return categoryPermissions.filter((p) => rolePermissions.includes(p.id))
    .length;
};

/**
 * Check if role can be deleted
 */
export const canDeleteRole = (
  role: any
): { canDelete: boolean; reason?: string } => {
  if (role.isSystem) {
    return { canDelete: false, reason: 'System roles cannot be deleted' };
  }

  if (role.userCount > 0) {
    return { canDelete: false, reason: 'Role has assigned users' };
  }

  return { canDelete: true };
};

/**
 * Validate role data before creation/update
 */
export const validateRoleData = (roleData: {
  name: string;
  description: string;
  permissions: string[];
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!roleData.name.trim()) {
    errors.push('Role name is required');
  }

  if (roleData.name.length > 50) {
    errors.push('Role name must be less than 50 characters');
  }

  if (!roleData.description.trim()) {
    errors.push('Role description is required');
  }

  if (roleData.description.length > 200) {
    errors.push('Role description must be less than 200 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Get role statistics
 */
export const getRoleStats = (roles: any[]) => {
  const totalRoles = roles.length;
  const systemRoles = roles.filter((r) => r.isSystem).length;
  const customRoles = roles.filter((r) => !r.isSystem).length;
  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);

  return {
    totalRoles,
    systemRoles,
    customRoles,
    totalUsers,
  };
};

/**
 * Sort roles by various criteria
 */
export const sortRoles = (
  roles: any[],
  sortBy: 'name' | 'userCount' | 'createdAt',
  ascending = true
): any[] => {
  const sorted = [...roles].sort((a, b) => {
    let valueA: any = a[sortBy];
    let valueB: any = b[sortBy];

    if (sortBy === 'createdAt') {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }

    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) return ascending ? -1 : 1;
    if (valueA > valueB) return ascending ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Get users assigned to a specific role
 */
export const getUsersInRole = (roleId: string, allUsers: any[]): any[] => {
  return allUsers.filter((user) => user.role === roleId);
};

/**
 * Calculate permission coverage for a role
 */
export const calculatePermissionCoverage = (
  rolePermissions: string[],
  allPermissions: any[]
): { percentage: number; covered: number; total: number } => {
  const total = allPermissions.length;
  const covered = rolePermissions.length;
  const percentage = total > 0 ? Math.round((covered / total) * 100) : 0;

  return { percentage, covered, total };
};

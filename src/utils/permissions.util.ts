import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Shield,
  Info,
  Users,
  FileText,
  BarChart3,
  DollarSign,
  Settings,
  Database,
} from 'lucide-react';

/**
 * Get the appropriate color class for permission risk level
 */
export const getRiskColor = (risk: string): string => {
  const riskColorMap = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    riskColorMap[risk as keyof typeof riskColorMap] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  );
};

/**
 * Get the appropriate icon for permission risk level
 */
export const getRiskIcon = (risk: string) => {
  const riskIconMap = {
    low: CheckCircle2,
    medium: AlertTriangle,
    high: XCircle,
    critical: Shield,
  };

  return riskIconMap[risk as keyof typeof riskIconMap] || Info;
};

/**
 * Get the appropriate icon for permission category
 */
export const getCategoryIcon = (category: string) => {
  const categoryIconMap = {
    'User Management': Users,
    'Content Management': FileText,
    'Analytics & Reports': BarChart3,
    'Billing & Finance': DollarSign,
    'Settings & Configuration': Settings,
    'System Administration': Database,
  };

  return categoryIconMap[category as keyof typeof categoryIconMap] || Shield;
};

/**
 * Format timestamp to readable date and time
 */
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
};

/**
 * Filter permissions based on search term, category, and risk level
 */
export const filterPermissions = (
  permissions: any[],
  searchTerm: string,
  categoryFilter: string,
  riskFilter: string
): any[] => {
  return permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All Categories' ||
      permission.category === categoryFilter;
    const matchesRisk =
      riskFilter === 'All Risks' || permission.risk === riskFilter;

    return matchesSearch && matchesCategory && matchesRisk;
  });
};

/**
 * Group permissions by category
 */
export const groupPermissionsByCategory = (
  permissions: any[]
): { [key: string]: any[] } => {
  return permissions.reduce((groups, permission) => {
    const category = permission.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {});
};

/**
 * Get permissions count by risk level
 */
export const getPermissionCountByRisk = (
  permissions: any[]
): { [key: string]: number } => {
  return permissions.reduce((counts, permission) => {
    const risk = permission.risk;
    counts[risk] = (counts[risk] || 0) + 1;
    return counts;
  }, {});
};

/**
 * Check if user has specific permission
 */
export const userHasPermission = (
  userPermissions: string[],
  permissionId: string
): boolean => {
  return userPermissions.includes(permissionId);
};

/**
 * Get permission dependencies that are missing for a user
 */
export const getMissingDependencies = (
  userPermissions: string[],
  permission: any,
  allPermissions: any[]
): any[] => {
  const missing: any[] = [];

  permission.dependencies.forEach((depId: string) => {
    if (!userPermissions.includes(depId)) {
      const depPermission = allPermissions.find((p) => p.id === depId);
      if (depPermission) {
        missing.push(depPermission);
      }
    }
  });

  return missing;
};

/**
 * Validate permission changes for dependencies
 */
export const validatePermissionChange = (
  currentPermissions: string[],
  permissionId: string,
  isGranting: boolean,
  allPermissions: any[]
): { valid: boolean; message?: string } => {
  const permission = allPermissions.find((p) => p.id === permissionId);
  if (!permission) {
    return { valid: false, message: 'Permission not found' };
  }

  if (isGranting) {
    // Check if all dependencies are met
    const missingDeps = getMissingDependencies(
      currentPermissions,
      permission,
      allPermissions
    );
    if (missingDeps.length > 0) {
      return {
        valid: false,
        message: `Missing dependencies: ${missingDeps.map((p) => p.name).join(', ')}`,
      };
    }
  } else {
    // Check if any other permissions depend on this one
    const dependentPermissions = allPermissions.filter(
      (p) =>
        p.dependencies.includes(permissionId) &&
        currentPermissions.includes(p.id)
    );

    if (dependentPermissions.length > 0) {
      return {
        valid: false,
        message: `Cannot revoke: ${dependentPermissions.map((p) => p.name).join(', ')} depend on this permission`,
      };
    }
  }

  return { valid: true };
};

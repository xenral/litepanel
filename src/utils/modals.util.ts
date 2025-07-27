/**
 * Simulate file upload with progress
 */
export const simulateUpload = (
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  setIsUploading(true);
  setProgress(0);

  const interval = setInterval(() => {
    setProgress((prev: number) => {
      if (prev >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        return 100;
      }
      return prev + 10;
    });
  }, 200);
};

/**
 * Handle user selection for multi-select modal
 */
export const toggleUserSelection = (
  selectedUsers: number[],
  userId: number,
  setSelectedUsers: (users: number[]) => void
): void => {
  const newSelection = selectedUsers.includes(userId)
    ? selectedUsers.filter((id) => id !== userId)
    : [...selectedUsers, userId];

  setSelectedUsers(newSelection);
};

/**
 * Generate user initials from name
 */
export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
};

/**
 * Validate form data for user creation
 */
export const validateUserForm = (formData: {
  name: string;
  email: string;
  role: string;
  department: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.name.trim()) {
    errors.push('Name is required');
  }

  if (!formData.email.trim()) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push('Email is invalid');
  }

  if (!formData.role) {
    errors.push('Role is required');
  }

  if (!formData.department) {
    errors.push('Department is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Check if file type is supported
 */
export const isSupportedFileType = (
  fileName: string,
  supportedTypes: string[]
): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return supportedTypes.includes(extension || '');
};

/**
 * Reset form to initial state
 */
export const resetFormData = () => ({
  name: '',
  email: '',
  message: '',
  role: '',
  department: '',
});

/**
 * Generate unique modal ID
 */
export const generateModalId = (): string => {
  return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Handle keyboard shortcuts for modals
 */
export const handleModalKeydown = (
  event: KeyboardEvent,
  onClose: () => void,
  onConfirm?: () => void
): void => {
  if (event.key === 'Escape') {
    onClose();
  } else if (event.key === 'Enter' && onConfirm && !event.shiftKey) {
    event.preventDefault();
    onConfirm();
  }
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
};

/**
 * Filter users by search term
 */
export const filterUsers = (users: any[], searchTerm: string): any[] => {
  if (!searchTerm.trim()) return users;

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

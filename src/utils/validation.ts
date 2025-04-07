export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  if (!/[!@#$%^&*]/.test(password)) return 'Password must contain at least one special character (!@#$%^&*)';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters long';
  if (!/^[a-zA-Z\s]*$/.test(name)) return 'Name can only contain letters and spaces';
  return null;
};

export const validateAmount = (amount: string): string | null => {
  if (!amount) return 'Amount is required';
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) return 'Please enter a valid number';
  if (numAmount <= 0) return 'Amount must be greater than 0';
  if (numAmount > 1000000) return 'Amount must be less than 1,000,000';
  return null;
};

export const validateDate = (date: string): string | null => {
  if (!date) return 'Date is required';
  const selectedDate = new Date(date);
  const today = new Date();
  if (selectedDate > today) return 'Date cannot be in the future';
  return null;
};

export const validateDescription = (description: string): string | null => {
  if (!description) return 'Description is required';
  if (description.length < 3) return 'Description must be at least 3 characters long';
  if (description.length > 500) return 'Description must be less than 500 characters';
  return null;
}; 
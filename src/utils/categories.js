export const TRANSACTION_CATEGORIES = {
  income: [
    { value: 'salary', label: 'Salary', icon: 'briefcase' },
    { value: 'freelance', label: 'Freelance', icon: 'laptop' },
    { value: 'business', label: 'Business', icon: 'building' },
    { value: 'investment', label: 'Investment', icon: 'chart-line' },
    { value: 'gift', label: 'Gift', icon: 'gift' },
    { value: 'other-income', label: 'Other Income', icon: 'plus-circle' }
  ],
  expense: [
    { value: 'food', label: 'Food & Dining', icon: 'utensils' },
    { value: 'transport', label: 'Transportation', icon: 'car' },
    { value: 'housing', label: 'Housing', icon: 'home' },
    { value: 'utilities', label: 'Utilities', icon: 'bolt' },
    { value: 'entertainment', label: 'Entertainment', icon: 'film' },
    { value: 'shopping', label: 'Shopping', icon: 'shopping-bag' },
    { value: 'healthcare', label: 'Healthcare', icon: 'heart' },
    { value: 'education', label: 'Education', icon: 'graduation-cap' },
    { value: 'savings', label: 'Savings', icon: 'piggy-bank' },
    { value: 'other-expense', label: 'Other Expense', icon: 'minus-circle' }
  ]
};

export const getCategoryIcon = (category) => {
  const allCategories = [...TRANSACTION_CATEGORIES.income, ...TRANSACTION_CATEGORIES.expense];
  const categoryObj = allCategories.find(cat => cat.value === category);
  return categoryObj?.icon || 'question-circle';
};

export const getCategoryLabel = (category) => {
  const allCategories = [...TRANSACTION_CATEGORIES.income, ...TRANSACTION_CATEGORIES.expense];
  const categoryObj = allCategories.find(cat => cat.value === category);
  return categoryObj?.label || category;
};

import { useState } from 'react';
import { validateTaskForm, sanitizeInput } from '../utils/validation';

/**
 * Custom hook for form state and validation
 * @param {object} initialState - Initial form state
 * @param {function} onSubmit - Submit handler
 * @returns {object} Form state and handlers
 */
const useForm = (initialState, onSubmit) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input change
   * @param {object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input for text fields
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /**
   * Update form data programmatically
   * @param {object} updates - Updates to apply
   */
  const updateFormData = (updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  /**
   * Handle form submission
   * @param {object} e - Event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateTaskForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      await onSubmit(formData);
      setFormData(initialState); // Reset form on success
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    updateFormData,
    resetForm
  };
};

export default useForm;

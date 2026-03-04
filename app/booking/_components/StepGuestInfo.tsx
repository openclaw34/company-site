'use client';

import { useState } from 'react';
import type { BookingFormData } from '@/types/booking';

interface Props {
  formData: BookingFormData;
  onChange: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepGuestInfo({
  formData,
  onChange,
  onBack,
  onNext,
}: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.ageConfirmed) {
      newErrors.age = 'Age confirmation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Representative Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Full name"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent ${
              errors.name ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent ${
              errors.email ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-400 mb-1.5">
            Used for emergency contact on the day of the tour
          </p>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+81 90-1234-5678"
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent ${
              errors.phone ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="allergies"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Allergies / Dietary Restrictions
          </label>
          <textarea
            id="allergies"
            value={formData.allergies}
            onChange={(e) => onChange({ allergies: e.target.value })}
            placeholder="e.g., Gluten-free, vegetarian, shellfish allergy..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.ageConfirmed}
              onChange={(e) => onChange({ ageConfirmed: e.target.checked })}
              className="mt-0.5 w-5 h-5 rounded border-gray-300 text-forest-600 focus:ring-forest-500"
            />
            <span
              className={`text-sm ${errors.age ? 'text-red-500' : 'text-gray-700'}`}
            >
              I confirm that all participants are 20 years of age or older
              (Japanese legal drinking age)
            </span>
          </label>
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-4 bg-forest-600 text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

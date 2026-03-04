'use client';

import { useState } from 'react';
import BookingProgress from './_components/BookingProgress';
import StepDateGuests from './_components/StepDateGuests';
import StepGuestInfo from './_components/StepGuestInfo';
import StepConfirmPay from './_components/StepConfirmPay';
import type { BookingFormData } from '@/types/booking';

const initialFormData: BookingFormData = {
  tourDateId: '',
  tourDate: '',
  numGuests: 1,
  name: '',
  email: '',
  phone: '',
  allergies: '',
  ageConfirmed: false,
};

export default function BookingPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);

  const updateFormData = (data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <main className="min-h-screen pt-24 pb-32 bg-warm-white">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-serif text-4xl md:text-5xl text-forest-900 mb-2 text-center">
          Book Your Tour
        </h1>
        <p className="text-center text-gray-500 mb-10">
          &yen;15,000 per person &mdash; Sake Brewery Tour, Okutama
        </p>

        <BookingProgress currentStep={step} />

        {step === 1 && (
          <StepDateGuests
            formData={formData}
            onChange={updateFormData}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepGuestInfo
            formData={formData}
            onChange={updateFormData}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <StepConfirmPay formData={formData} onBack={() => setStep(2)} />
        )}
      </div>
    </main>
  );
}

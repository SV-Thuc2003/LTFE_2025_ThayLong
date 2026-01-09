import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center gap-12 mb-5">
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="text-center relative">
            <div
              className={`w-8 h-8 mx-auto mb-2 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${isCompleted ? 'bg-rose-600 border-rose-600 text-white' :
                  isActive ? 'bg-white border-rose-600 text-rose-600' :
                    'bg-white border-gray-300 text-gray-400'}
              `}
            >
              {index + 1}
            </div>
            <div
              className={`text-sm transition-all duration-300
                ${isCompleted || isActive ? 'text-rose-500 font-semibold' : 'text-gray-500'}
              `}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;

import React, { useState } from "react";
import Stepper from "../../../components/common/Stepper";
import StepEmail from "./StepEmail";
import StepOtp from "./StepOtp";
import StepNewPassword from "./StepNewPassword";
import logologin from "../../../assets/logologin.jpg";

const ForgotPassword: React.FC = () => {
    const steps = [
        "Nhập Email",
        "Xác thực OTP",
        "Mật khẩu mới"
    ];

  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="flex min-h-screen bg-white">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-[800px] flex items-center justify-center">
            <img
              src={logologin}
              alt="Hình ảnh minh họa"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-10">
                <Stepper steps={steps} currentStep={currentStep} />
            </div>

            {/* Bước 0: Nhập email để lấy lại mật khẩu */}
            {currentStep === 0 && (
                <StepEmail
                  email={email}
                  setEmail={setEmail}
                  onSuccess={() => {
                    handleNext();
                  }}
                />
            )}

            {/* Bước 1: Xác thực mã OTP */}
            {currentStep === 1 && (
                <StepOtp
                  email={email}
                  otp={otp}
                  setOtp={setOtp}
                  onSuccess={handleNext}
                  onBack={handlePrev}
                />
            )}

            {/* Bước 2: Thiết lập mật khẩu mới */}
            {currentStep === 2 && (
                <StepNewPassword email={email} otp={otp} onBack={handlePrev} />
            )}
          </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
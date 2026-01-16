import React, { useState } from "react";
import Stepper from "../../components/common/Stepper";
import RegistrationForm from "../../features/auth/register/RegistrationForm";
import Illustration from "../../features/auth/register/Illustration";
import OtpVerification from "../../features/auth/register/OtpInput";

const RegisterPage: React.FC = () => {
    // Quản lý bước hiện tại và email để xác thực OTP
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [email, setEmail] = useState<string>("");

    const steps = ["Đăng ký tài khoản", "Xác thực OTP"];

    const handleRegisterSuccess = (registeredEmail: string) => {
        setEmail(registeredEmail);
        setCurrentStep(1);
    };

    const handleOtpSuccess = () => {
        alert("Chúc mừng! Bạn đã đăng ký và xác thực tài khoản thành công.");
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4 bg-gray-50">
            <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-lg mx-auto flex flex-col items-center">
                <div className="w-full max-w-md mb-8">
                    <Stepper steps={steps} currentStep={currentStep} />
                </div>

                {/* Bước 1: Form điền thông tin đăng ký */}
                {currentStep === 0 && (
                    <div className="w-full animate-fadeIn">
                        <RegistrationForm onSuccess={handleRegisterSuccess} />
                    </div>
                )}

                {/* Bước 2: Nhập mã OTP gửi về email */}
                {currentStep === 1 && (
                    <div className="w-full animate-fadeIn">
                        <OtpVerification email={email} onSuccess={handleOtpSuccess} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
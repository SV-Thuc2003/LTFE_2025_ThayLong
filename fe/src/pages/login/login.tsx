import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../features/auth/login/LoginForm.tsx";
import SocialLogin from "../../features/auth/login/SocialLogin.tsx";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-white">

            <div className="w-full p-8 md:p-16 flex items-center justify-center">
                <div className="w-full max-w-[700px]">

                    <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>

                    <LoginForm />

                    <SocialLogin />

                    <div className="mt-10 text-center">
                        <p className="text-lg font-medium">
                            Chưa có tài khoản?{" "}
                            <button
                                className="text-[#3b63f3] hover:underline"
                                onClick={() => navigate("/register")}
                            >
                                Đăng ký ngay
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
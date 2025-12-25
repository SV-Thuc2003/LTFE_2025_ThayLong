import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Checkbox";
import { login } from "../../../Service/authService";
// import { LoginCredentials } from "../../../types/Login"; // Code cũ gây lỗi

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { login: contextLogin } = useAuth() || {}; // Thêm || {} để tránh lỗi nếu context undefined
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        if (!username.trim() || !password.trim()) {
            setErrorMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
            setIsLoading(false);
            return;
        }

        try {
            const response = await login({ username, password });
            if (contextLogin) {
                contextLogin(response.userId, response.username, response.token, response.role);
                navigate("/");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Đăng nhập thất bại");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <InputField
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4"
            />

            <InputField
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3"
            />

            <div className="flex justify-between items-center mb-4">
                <Checkbox
                    label="Ghi nhớ đăng nhập"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                />
                <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Quên mật khẩu?
                </button>
            </div>

            {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
        </form>
    );
};

export default LoginForm;
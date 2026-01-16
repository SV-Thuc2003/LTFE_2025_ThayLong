import React, { useState } from "react";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../Service/authService";

interface Props {
  email: string;
  setEmail: (email: string) => void;
  onSuccess: () => void;
}

const StepEmail: React.FC<Props> = ({ email, setEmail, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      toast.success("Mã OTP đã được gửi đến email của bạn.");
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Không thể gửi mã OTP. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <InputField
          label="Địa chỉ Email"
          placeholder="Nhập email của bạn để lấy lại mật khẩu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Đang gửi..." : "Gửi mã xác nhận"}
      </Button>
    </form>
  );
};

export default StepEmail;
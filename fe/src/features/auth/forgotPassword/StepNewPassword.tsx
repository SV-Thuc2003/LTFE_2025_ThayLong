import React, { useState } from "react";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../Service/authService";

interface Props {
  email: string;
  otp: string;
  onBack: () => void;
}

const StepNewPassword: React.FC<Props> = ({ email, otp, onBack }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirm) {
      toast.warning("Vui lòng điền đầy đủ các trường.");
      return;
    }
    if (password !== confirm) {
      toast.warning("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    try {
      const message = await resetPassword(email, otp, password);
      toast.success(message || "Đặt lại mật khẩu thành công!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Đã xảy ra lỗi khi đặt lại mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleReset} className="space-y-4 w-full">
        <InputField
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới của bạn"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <InputField
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu mới"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
        />
        <div className="flex gap-2">
          <Button type="button" onClick={onBack} variant="secondary" className="flex-1 py-2.5">
            Quay lại
          </Button>
          <Button type="submit" className="flex-1 py-2.5" disabled={loading}>
            {loading ? "Đang đổi..." : "Đặt lại mật khẩu"}
          </Button>
        </div>
      </form>
  );
};

export default StepNewPassword;
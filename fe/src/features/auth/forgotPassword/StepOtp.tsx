import React, { useState } from "react";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import { toast } from "react-toastify";
import { verifyOtpResetPassword } from "../../../Service/authService";

interface Props {
  email: string;
  otp: string;
  setOtp: (otp: string) => void;
  onSuccess: () => void;
  onBack: () => void;
}

const StepOtp: React.FC<Props> = ({ email, otp, setOtp, onSuccess, onBack }) => {
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    try {
      await verifyOtpResetPassword({ email, otpCode: otp });
      toast.success("Xác thực mã OTP thành công!");
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Mã OTP không chính xác hoặc đã hết hạn.");
    } finally {
      setVerifying(false);
    }
  };

  return (
      <form onSubmit={handleVerify} className="space-y-4">
        <InputField
            label="Mã xác thực OTP"
            placeholder="Nhập mã OTP đã gửi đến email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
        />
        <div className="flex gap-2">
          <Button type="button" onClick={onBack} variant="secondary" className="flex-1">
            Quay lại
          </Button>
          <Button type="submit" className="flex-1" disabled={verifying}>
            {verifying ? "Đang xác thực..." : "Xác nhận"}
          </Button>
        </div>
      </form>
  );
};

export default StepOtp;
import React, { useState } from "react";
import type { UserProfile } from "../../types/Profile";
import Button from "../../components/common/Button";
import InputField from "../../components/common/InputField";
import { CgProfile } from "react-icons/cg";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

interface ProfileFormProps {
  userId: number;
  initialProfile: UserProfile;
  onSuccess: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
                                                   userId,
                                                   initialProfile,
                                                   onSuccess,
                                                 }) => {
  const { updateProfile, loading } = useUpdateProfile();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [errors, setErrors] = useState<
      Partial<Record<keyof UserProfile, string>>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof UserProfile]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserProfile, string>> = {};

    if (!profile.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!profile.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!profile.address?.trim()) newErrors.address = "Vui lòng nhập địa chỉ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    updateProfile(userId, profile, onSuccess);
  };

  return (
      <div className="bg-[#f8f9fa] p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center mb-8">
          <div className="w-[68px] h-[68px] bg-[#fd7e14] rounded-full flex items-center justify-center text-white">
            <CgProfile className="w-[40px] h-[40px]" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-[#313f53]">{profile.name || "Người dùng"}</h2>
            <p className="text-gray-500">{profile.phone || "Chưa cập nhật SĐT"}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <InputField
                label="Họ và tên"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên của bạn"
                error={errors.name}
            />

            <InputField
                label="Số điện thoại"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
                error={errors.phone}
            />

            <div className="md:col-span-2">
              <InputField
                  label="Địa chỉ"
                  name="address"
                  value={profile.address ?? ""}
                  onChange={handleInputChange}
                  placeholder="Nhập địa chỉ chi tiết"
                  error={errors.address}
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              variant="primary"
              className="px-10 py-2.5 rounded-lg font-medium transition-all"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </div>
  );
};

export default ProfileForm;
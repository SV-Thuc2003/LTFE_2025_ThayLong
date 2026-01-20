import React, { useEffect, useState } from "react";
import Footer from "../../components/layout/footer/Footer";
import AccountMenu from "./AccountMenu";
import ProfileForm from "./ProfileForm";
import type { UserProfile } from "../../types/Profile";
import { fetchUserProfile } from "../../Service/updateUserProfile";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const ProfilePage = () => {
  const { userId } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const profile = await fetchUserProfile(userId);
      setUserProfile(profile);
    } catch {
      setError("Đã xảy ra lỗi khi tải thông tin cá nhân.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const handleAfterUpdate = () => {
    loadProfile();
    toast.success("Cập nhật thông tin thành công!");
  };

  if (!userId) return <p className="text-center py-8">Vui lòng đăng nhập để xem thông tin.</p>;
  if (loading) return <p className="text-center py-8">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <AccountMenu />
            </div>
            <div className="md:col-span-3">
              {userProfile && (
                  <ProfileForm
                      userId={userId}
                      initialProfile={userProfile}
                      onSuccess={handleAfterUpdate}
                  />
              )}
            </div>
          </div>
        </main>
      </div>
  );
};

export default ProfilePage;
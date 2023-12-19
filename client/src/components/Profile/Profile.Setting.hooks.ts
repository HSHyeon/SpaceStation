import { useMutation } from "@tanstack/react-query";
import profileSettingAPI from "./Profile.Setting.api";
import toast from "react-hot-toast";
import { storage, storageKeys } from "@/global/storage";

export const useProfileSetting = () => {
  const logout = useMutation({
    mutationFn: profileSettingAPI.logout,
    onSuccess: (response) => {
      const message =
        response.status === 204
          ? "로그아웃 되었습니다."
          : response.data.message;

      toast.success(message);
      storage.remove(storageKeys.currentUser);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }).mutateAsync;

  const withdraw = useMutation({
    mutationFn: profileSettingAPI.withdraw,
    onSuccess: (response) => {
      const message = !response.data.message
        ? "회원 탈퇴가 처리되었습니다."
        : response.data.message;

      toast.success(message);
      storage.remove(storageKeys.currentUser);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }).mutateAsync;

  return { logout, withdraw };
};

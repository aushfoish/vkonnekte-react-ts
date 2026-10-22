import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { AccountSection } from "./AccountSection";
import { AccountTitle } from "@/entities/user";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import { FetchErrorModal } from "@/features/fetch-error/ui/FetchErrorModal";
import { SkeletonMainPage } from "@/shared/ui/SkeletonMainPage";
// import { AdminAuthModule } from "@/features/pass-the-authorization/ui/AdminAuthModule";

export const UserPage = () => {
  const auth = useAuthStore((state) => state.adminAuthCheck)
  auth()
  const currentUserId = useAuthStore((state) => state.currentUserId)
  
  const { isLoading, profile, isFetchPositive, refetch } = useFetchProfile(currentUserId);

  // if (!currentUserId) return <AdminAuthModule onClose={}/>
  
  if (!profile && isFetchPositive === false) return <FetchErrorModal onClick={refetch} label="Не удалось подключиться к серверу" text="Проверьте подключение к интернету и обновите страницу, либо
              повторите попытку позже."/>

  if (isLoading || !profile) return <SkeletonMainPage />;
  
  return (
    <>
      <AccountTitle />

      <AccountSection />
    </>
  );
};
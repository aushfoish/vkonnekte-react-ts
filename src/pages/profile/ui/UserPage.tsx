import { AccountSection } from "./AccountSection";
import { AccountTitle } from "@/entities/user";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import { FetchErrorModal } from "@/features/fetch-error/ui/FetchErrorModal";
import { SkeletonMainPage } from "@/shared/ui/SkeletonMainPage";

export const UserPage = () => {
  const { isLoading, profile, isFetchPositive, refetch } = useFetchProfile("c849ba0e-1a02-4d1b-8042-01d801e3c7b1");

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
import { useAuthStore } from "@/entities/user/model/useAuthStore";
import { useFetchProfile } from "@/entities/user/model/useFetchProfile";
import { AdminProfileTabItem } from "@/features/admin-tab-profile-item/ui/AdminProfileTabItem";

export const AdminProfileTable = () => {
  const userId = useAuthStore((state) => state.currentUserId) || undefined

  const { profile } = useFetchProfile(userId);

  if (profile)
    return (
      <AdminProfileTabItem
        user_id={profile.user_id}
        birthday={profile.birthday}
        languages={profile.languages}
        id={profile.id}
        firstname={profile?.firstname}
        lastname={profile.lastname}
        bio={profile.bio}
        avatar={profile.avatar}
        city={profile.city}
        workplace={profile.workplace}
        country={profile.country}
        birth_location={profile.birth_location}
        phone_number={profile.phone_number}
        website={profile.website}
        activities={profile.activities}
        hobbies={profile.hobbies}
        music_genres={profile.music_genres}
        favorite_movies={profile.favorite_movies}
        favorite_games={profile.favorite_games}
        favorite_quotes={profile.favorite_quotes}
        about_me={profile.about_me}
      />
    );
};

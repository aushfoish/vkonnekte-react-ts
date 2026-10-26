import { WallContent } from "@/widgets/account-wall/ui/WallContent";
import { WallHeader } from "@/widgets/account-wall/ui/WallHeader";

export const AccountWall = ({wallId}: {wallId: string}) => {

  return (
    <>
      <WallHeader wallId={wallId}/>

      <WallContent wallId={wallId}/>
    </>
  );
};

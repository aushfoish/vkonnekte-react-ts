import { Button, SectionRadio } from "@/shared/ui";
import { useState } from "react";
import style from './AdminControl.module.scss'
import { AdminPostsTable } from "@/widgets/admin-table-posts/ui/AdminPostsTable";

export const AdminControl = () => {
  const [cathegory, setCathegory] = useState("посты");
  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  return (
    <div
      className="adminControl"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className={style.controlSection}>
        <SectionRadio
          checked={cathegory === 'посты'}
          type="radio"
          children="посты"
          id="posts"
          onChange={() => setCathegory("посты")}
          value="posts"
        />
        <SectionRadio
          checked={cathegory === 'музыка'}
          type="radio"
          children="музыка"
          id="music"
          onChange={() => setCathegory("музыка")}
          value="music"
        />
        <SectionRadio
          checked={cathegory === 'анкета'}
          type="radio"
          children="анкета"
          id="info"
          onChange={() => setCathegory("анкета")}
          value="info"
        />
        <Button onClick={logout} children='выйти из админки'/>
      </div>

      {cathegory === "посты" && <AdminPostsTable />}
      
      
    </div>
  );
};

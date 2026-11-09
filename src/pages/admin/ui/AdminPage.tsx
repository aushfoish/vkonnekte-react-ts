import { AdminControl } from "@/pages/admin/ui/AdminControl";
import { useState } from "react";

export const AdminPage = () => {
  const [isAdmin] = useState(true);

  if (isAdmin) return <AdminControl />;
};

export default AdminPage
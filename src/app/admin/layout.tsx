import AdminNav from "./components/AdminNav";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col p-1">
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;

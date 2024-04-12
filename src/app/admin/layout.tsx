import Navigation from "../ui/components/Navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col p-1">
      <Navigation userNav="admin" />
      {children}
    </div>
  );
};

export default AdminLayout;

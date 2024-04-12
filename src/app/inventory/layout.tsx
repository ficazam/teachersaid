import Navigation from "../ui/components/Navigation";

const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col p-1">
      <Navigation userNav="inventory" />
      {children}
    </div>
  );
};

export default InventoryLayout;

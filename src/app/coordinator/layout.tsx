import Navigation from "../ui/components/Navigation";

const CoordinatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col p-1">
      <Navigation userNav="coordinator" />
      {children}
    </div>
  );
};

export default CoordinatorLayout;

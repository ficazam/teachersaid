import { Navigation } from "./components";

const CoordinatorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-center items-center flex flex-col p-1 mt-10">
      <Navigation />
      {children}
    </div>
  );
};

export default CoordinatorLayout;

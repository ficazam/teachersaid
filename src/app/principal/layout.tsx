import { Navigation } from "./components";

const PrincipalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col">
      <Navigation />
      {children}
    </div>
  );
};

export default PrincipalLayout;

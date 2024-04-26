import { Navigation } from "./components";

const PrincipalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-center items-center flex flex-col mt-10">
      <Navigation />
      {children}
    </div>
  );
};

export default PrincipalLayout;

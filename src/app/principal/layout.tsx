import PrincipalNav from "./components/PrincipalNav";

const PrincipalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col p-1">
      <PrincipalNav />
      {children}
    </div>
  );
};

export default PrincipalLayout;

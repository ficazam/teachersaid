import Navigation from "../ui/components/Navigation";

const PrincipalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col">
      <Navigation userNav="principal" />
      {children}
    </div>
  );
};

export default PrincipalLayout;

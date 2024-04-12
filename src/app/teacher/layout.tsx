import Navigation from "../ui/components/Navigation";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col p-1">
      <Navigation userNav="teacher" />
      {children}
    </div>
  );
};

export default TeacherLayout;

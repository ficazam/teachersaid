import { Navigation } from "./components";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen justify-evenly items-center flex flex-col p-1">
      <Navigation />
      {children}
    </div>
  );
};

export default TeacherLayout;

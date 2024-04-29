import { Navigation } from "./components";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-[100vw] justify-center items-center flex flex-col">
      <Navigation />
      {children}
    </div>
  );
};

export default TeacherLayout;

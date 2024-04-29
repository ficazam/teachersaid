import Link from "next/link";
import { Card } from "./components";

const TeacherHome = () => {
  const adminButtons = [
    { direction: "new-order", label: "New Order" },
    { direction: "orders", label: "My Orders" },
  ];
  return (
    <>
      <h1 className="text-4xl">Teacher Home</h1>
      <div className="flex">
        {adminButtons.map((button) => (
          <Link href={`/teacher/${button.direction}`} key={button.direction}>
            <Card>
              <p>{button.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TeacherHome
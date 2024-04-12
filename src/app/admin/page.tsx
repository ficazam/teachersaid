import Link from "next/link";
import Card from "../ui/components/Card";

const AdminHome = () => {
  const adminButtons = [
    { direction: "new-school", label: "Add New School" },
    { direction: "schools", label: "View All Schools" },
  ];
  return (
    <>
      <h1 className="text-4xl">Admin Home</h1>
      <div className="flex mb-48">
        {adminButtons.map((button) => (
          <Link href={`/admin/${button.direction}`} key={button.direction}>
            <Card>
              <p>{button.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default AdminHome;

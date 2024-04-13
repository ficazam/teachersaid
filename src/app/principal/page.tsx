import Link from "next/link";
import Card from "../ui/components/Card";

const PrincipalHome = () => {
  const adminButtons = [
    { direction: "new-staff", label: "Add Staff Member" },
    { direction: "my-school", label: "View School Information" },
  ];
  return (
    <>
      <h1 className="text-4xl">Principal Home</h1>
      <div className="flex mb-48">
        {adminButtons.map((button) => (
          <Link href={`/principal/${button.direction}`} key={button.direction}>
            <Card>
              <p>{button.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PrincipalHome;
import Link from "next/link";
import { Card } from "./components";

const PrincipalHome = () => {
  const adminButtons = [
    { direction: "new-item", label: "Add Item to Inventory" },
    { direction: "orders", label: "View Orders" },
  ];
  return (
    <>
      <h1 className="text-4xl">Inventory Home</h1>
      <div className="flex mb-48">
        {adminButtons.map((button) => (
          <Link href={`/inventory/${button.direction}`} key={button.direction}>
            <Card>
              <p className="elevation-1">{button.label}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PrincipalHome;

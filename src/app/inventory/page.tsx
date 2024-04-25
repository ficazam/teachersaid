import Link from "next/link";
import { Card } from "./components";

const PrincipalHome = () => {
  const adminButtons = [
    { direction: "items", label: "View Inventory" },
    { direction: "orders", label: "View Orders" },
    { direction: "new-item", label: "Add Item to Inventory" },
  ];
  return (
    <>
      <h1 className="text-4xl">Inventory Home</h1>
      <div className="flex flex-wrap justify-center">
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

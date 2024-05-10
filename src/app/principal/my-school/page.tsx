import Link from "next/link";
import { Card } from "../components";

const page = () => {
  return (
    <Link href={`/principal/my-school/orders`}>
      <Card>
        <p>View Orders</p>
      </Card>
    </Link>
  );
};

export default page;

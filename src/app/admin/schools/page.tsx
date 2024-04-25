import { getSchools } from "@/lib/actions";
import { Card } from "../components";
import { Suspense } from "react";
import Loader from "@/app/ui/components/Loader";

const Schools = async () => {
  const schools = await getSchools();

  return (
    <>
      <h1 className="text-4xl">All Schools</h1>
      <Suspense fallback={<Loader="blue" />}>
        <div className="mb-48">
          {schools ? (
            schools.map((school) => (
              <Card key={school.id}>
                <p>{school.name}</p>
              </Card>
            ))
          ) : (
            <p>No schools to display yet.</p>
          )}
        </div>
      </Suspense>
    </>
  );
};

export default Schools;

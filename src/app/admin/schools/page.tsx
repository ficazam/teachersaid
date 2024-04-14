import { getSchools } from "@/lib/actions";
import Card from "../../ui/components/Card";

const Schools = async () => {
  const schools = await getSchools();

  return (
    <>
      <h1 className="text-4xl">All Schools</h1>
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
    </>
  );
};

export default Schools;

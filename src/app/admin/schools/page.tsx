import { getSchools } from "@/lib/actions/actions";
import Card from "../../ui/components/Card";

const Schools = async () => {
  const schools = await getSchools();

  return (
    <>
      <h1 className="text-4xl">All Schools</h1>
      {schools ? (
        schools.map((school) => (
          <Card key={school.id}>
            <p>{school.name}</p>
          </Card>
        ))
      ) : (
        <p>No schools to display yet.</p>
      )}
    </>
  );
};

export default Schools;

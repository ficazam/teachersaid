import { getSchools } from "@/lib/actions/actions";
import AdminCard from "../components/AdminCard";

const Schools = async () => {
  const schools = await getSchools();
  
  return (
    <>
      <h1 className="text-4xl">All Schools</h1>
      {schools ? (
        schools.map((school) => (
          <AdminCard key={school.id} cardLabel={school.name} linkDirection="" />
        ))
      ) : (
        <p>No schools to display yet.</p>
      )}
    </>
  );
};

export default Schools;

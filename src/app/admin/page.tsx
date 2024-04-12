import AdminCard from "./components/AdminCard";

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
          <AdminCard
            key={button.direction}
            linkDirection={`/admin/${button.direction}`}
            cardLabel={button.label}
          />
        ))}
      </div>
    </>
  );
};

export default AdminHome;

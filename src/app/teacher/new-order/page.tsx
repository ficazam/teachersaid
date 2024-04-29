import dynamic from "next/dynamic";
const Loader = dynamic(() => import("../../ui/components/Loader"));
const ItemList = dynamic(() => import("./components/ItemList"), {
  ssr: false,
  loading: () => <Loader />,
});

const NewOrder = () => {
  return (
    <>
      <div className="top-0 fixed bg-white w-full h-[14vh] z-20 flex flex-col justify-end">
        <h1 className="text-4xl text-center">New Order</h1>
      </div>
      <div className="mt-14">
        <ItemList />
      </div>
    </>
  );
};

export default NewOrder;

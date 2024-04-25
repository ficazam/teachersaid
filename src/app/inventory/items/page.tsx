'use client'
import dynamic from "next/dynamic";
const ItemList = dynamic(() => import("./components/ItemList"), {
  ssr: false,
  loading: () => <Loader />,
});
const Loader = dynamic(() => import("../../ui/components/Loader"));

const Items = () => {
  return (
    <>
      <h1 className="text-4xl mt-10">Inventory</h1>
      <ItemList />
    </>
  );
};

export default Items;

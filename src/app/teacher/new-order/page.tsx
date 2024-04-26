import dynamic from "next/dynamic";
const Loader = dynamic(() => import("../../ui/components/Loader"));
const ItemList = dynamic(() => import('./components/ItemList'), {
    ssr: false,
    loading: () => <Loader />,
  })

const NewOrder = () => {
  return (
    <>
      <h1 className="text-4xl">New Order</h1>
      <ItemList />
    </>
  );
};

export default NewOrder;

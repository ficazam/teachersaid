import OrderCardDetails from "../../components/OrderCardDetails";

const OrderDetails = ({ params }: { params: { id: string } }) => {
  return <OrderCardDetails orderId={params.id} />;
};

export default OrderDetails;

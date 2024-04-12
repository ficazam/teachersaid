import Link from "next/link";

interface iAdminCardProps {
    linkDirection: string
    cardLabel: string
}

const AdminCard = (props: iAdminCardProps) => {
    const { linkDirection, cardLabel } = props
  return (
    <Link href={linkDirection}>
      <div className="min-w-[40vw] max-w-[90vw] h-[10vh] border m-2 border-blue-200 rounded bg-blue-100 flex flex-col justify-center items-center">
        {cardLabel}
      </div>
    </Link>
  );
};

export default AdminCard;

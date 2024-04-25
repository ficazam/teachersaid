import { UserRole } from "@/lib/enums/user-role.enum";

interface IRoleCardProps {
  information: { id: number; label: string; value: UserRole };
  onPress: () => void;
  isSelected: boolean;
}

const RoleCard = ({ information, onPress, isSelected }: IRoleCardProps) => {
  const { id, label, value } = information;
  return (
    <div
      onClick={onPress}
      className={`mr-3 mt-6 py-2 px-5 w-[27vw] border rounded-full flex items-center justify-center ${
        isSelected
          ? "bg-emerald-500 border-emerald-800 text-white"
          : "bg-white border-emerald-500 text-emerald-500"
      }`}
    >
      {label}
    </div>
  );
};

export default RoleCard;

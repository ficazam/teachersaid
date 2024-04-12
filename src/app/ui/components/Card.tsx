const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-[40vw] max-w-[90vw] h-[10vh] border m-2 border-blue-200 rounded bg-blue-100 flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default Card;

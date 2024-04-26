const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative -z-10 flex justify-center items-center min-w-[40vw] grow h-[10vh] m-2 p-1 px-10 ring-1 ring-white/5 bg-gradient-to-br shadow-md from-rose-100/65 to-rose-300/65 rounded">
      <div className="absolute top-0 w-full h-full backdrop-blur-sm" />
      <div className="text-center z-0">{children}</div>
    </div>
  );
};

export default Card;

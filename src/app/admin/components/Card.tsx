const Card = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="relative flex justify-center items-center -z-10 w-[40vw] h-[10vh] m-2 p-1 ring-1 ring-white/5 bg-gradient-to-br shadow-md from-blue-100/65 to-blue-300/65 rounded">
        <div className="absolute top-0 w-full h-full backdrop-blur-sm" />
        <div className="text-center z-0">{children}</div>
      </div>
    );
  };
  
  export default Card;
  
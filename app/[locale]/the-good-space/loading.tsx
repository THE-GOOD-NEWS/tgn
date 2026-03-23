export default function LoadingGIF() {
  return (
    <div className="theme-good-space fixed inset-0 z-[100] flex items-center justify-center bg-primary min-h-screen">
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px]">
        <img 
          src="/goodSpace/goodSpaceTransition.gif" 
          alt="Loading The Good Space..." 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

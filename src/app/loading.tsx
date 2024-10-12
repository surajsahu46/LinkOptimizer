export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="loader w-20 h-[50px] relative">
        <span className="loader-text absolute top-0 p-0 m-0 text-LinkOptimizer-secondary animate-text-move text-[14px] tracking-[1px]">
          loading
        </span>
        <span className="load bg-LinkOptimizer-primary rounded-[50px] block size-4 bottom-0 absolute translate-x-16 animate-loading before:absolute before:content-[''] before:bg-LinkOptimizer-secondary before:size-full before:rounded-[50px] before:animate-loading2"></span>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="m-10 font-bold text-3xl">Getting the data</div>
      <div className="w-10 h-10 border-4 border-gray-light border-transparent border-t-blue rounded-full animate-spin"></div>
    </div>
  );
}

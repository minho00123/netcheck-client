export default function Card({ Icon, title }) {
  return (
    <div className="flex flex-col items-center w-52 mx-10 my-5 p-2 border-2 border-blue rounded-xl bg-white">
      <Icon size={50} />
      <h2 className="mt-3 font-bold text-blue">{title}</h2>
    </div>
  );
}

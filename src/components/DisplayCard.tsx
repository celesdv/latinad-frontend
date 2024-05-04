import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";

const DisplayCard = ({ display }: any) => {
  return (
    <div className="h-full">
      <div className="rounded-lg overflow-hidden relative">
        <img
          src={display.picture_url}
          alt={display.name + "-img"}
          className="h-full w-full"
        />
        <span className="absolute top-5 right-0 text-xl rounded-l-full px-4 py-2 font-semibold capitalize bg-neutral-800 text-neutral-100 min-w-28 shadow-xl shadow-sky-700">
          {display.type}
        </span>
        <span className="absolute bottom-0 w-full h-16 lg:h-20 text-xl font-semibold capitalize bg-sky-800 text-neutral-100 min-w-28 shadow-xl shadow-sky-700">
          <div className="flex justify-between h-full">
            <button className="flex items-end">
              <button
                onClick={() => console.log(`${display.name}`)}
                className="pt-7 pl-4 pb-4 pr-7 rounded-tr-full bg-sky-600 hover:bg-sky-400"
              >
                <TrashIcon className="size-6 text-neutral-100" />
              </button>
            </button>
            <div className="grow text-center w-16 pt-2">{display.name}</div>
            <div className="flex items-end">
              <button
                onClick={() => console.log(`${display.name}`)}
                className="pt-7 pl-7 pb-4 pr-4 rounded-tl-full bg-sky-600 hover:bg-sky-400"
              >
                <PencilIcon className="size-6 text-neutral-100" />
              </button>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default DisplayCard;

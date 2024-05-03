const DisplayCard = ({ display }: any) => {
    return (

        <div className="h-full">
            <div className="rounded-lg overflow-hidden relative">
                <img src={display.picture_url} alt={display.name + '-img'} className="h-full w-full" />
                <span className="absolute top-5 right-0 text-xl rounded-l-full px-4 py-2 font-semibold capitalize bg-neutral-800 text-neutral-100 min-w-28 shadow-xl shadow-sky-700">
                    {display.type}
                </span>
                <span className="absolute bottom-0 w-full h-16 lg:h-20 text-xl font-semibold capitalize bg-sky-800 text-neutral-100 min-w-28 shadow-xl shadow-sky-700">
                    <div className="flex justify-between h-full">
                        <button className="flex items-end">
                            <button onClick={() => console.log(`${display.name}`)} className="p-3 rounded-tr-3xl bg-sky-600 hover:bg-sky-400">
                                elim
                            </button>
                        </button>
                        <div className="grow text-center w-16 pt-2">{display.name}</div>
                        <div className="bg-sky-600 w-16 lg:w-20"></div>
                    </div>

                </span>
            </div>

        </div>

    );
};

export default DisplayCard;

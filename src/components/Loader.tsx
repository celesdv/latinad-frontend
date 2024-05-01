function Loader() {
    return (
        <div className="flex relative gap-3 bg-neutral-100 text-sky-800 font-bold uppercase rounded py-4 justify-center">
            <div className="absulute w-4 h-4 rounded-full top-0 left-0 bg-sky-800 animate-pulse"></div>
            <div className="absulute w-4 h-4 rounded-full top-0 left-8 bg-sky-700 animate-pulse"></div>
            <div className="absulute w-4 h-4 rounded-full top-0 left-16 bg-sky-600 animate-pulse"></div>
            <div className="absulute w-4 h-4 rounded-full top-0 left-24 bg-sky-500 animate-pulse"></div>
        </div>)
}

export default Loader
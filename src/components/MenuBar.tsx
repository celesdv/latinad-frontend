import { Link } from "react-router-dom";

function MenuBar() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between relative bg-neutral-100 rounded-xl max-w-96 w-96 px-4 py-2">
        <Link to="form">
          <div
            className="text-neutral-100 focus:outline-none rounded-full text-sm p-2 text-center bg-sky-600 hover:bg-sky-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="currentColor"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-sky-700">
          <div>Filtro byName</div>
          <div>Filtro byType</div>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;

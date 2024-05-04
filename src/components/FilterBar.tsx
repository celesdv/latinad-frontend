import { SubmitHandler, useForm } from "react-hook-form";
import useDisplay from "../hooks/useDisplay";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type LoginInputs = {
  name: string;
  indoor: boolean;
  outdoor: boolean
};

function FilterBar() {
  const { getDisplay } = useDisplay();

  const {
    register,
    handleSubmit,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    const selectType = () => {
      if (values.indoor && values.outdoor) return ''
      if (values.indoor) return 'indoor'
      if (values.outdoor) return 'outdoor'
    }
    const type = selectType()
    await getDisplay(0, values.name, type ? type : '')
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between relative bg-neutral-100 rounded-full max-w-96 w-96 p-3">
        <label className="border rounded-full border-sky-800 p-1">
          <input
            {...register("name")}
            id="search"
            placeholder="Buscar por nombre"
            type="search"
            className="w-full border-0 bg-neutral-100 text-sm rounded-full text-sky-800 p-2 focus:outline-0 placeholder:text-sky-400"
          />
        </label>

        <div>
          <label className="flex gap-2">
            <input id="indoor" type="checkbox" {...register("indoor")} />
            <span>Indoor</span>
          </label>
          <label className="flex gap-2">
            <input id="outdoor" type="checkbox" {...register("outdoor")} />
            <span>Outdoor</span>
          </label>
        </div>

        <div className="flex items-center gap-3 text-sky-700">
          <button type="submit" className="text-neutral-100 focus:outline-none rounded-full text-sm p-2 text-center bg-sky-600 hover:bg-sky-700">
            <MagnifyingGlassIcon className="size-5 text-neutral-100" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterBar;

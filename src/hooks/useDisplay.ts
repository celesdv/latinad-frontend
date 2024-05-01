import { useContext } from "react";
import { DisplayContext } from "../context/DisplayContext";

const useDisplay = () => {
  return useContext(DisplayContext);
};

export default useDisplay;
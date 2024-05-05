import ListDisplay from "../components/ListDisplay";

function DisplayPage() {
  return (
    <div className="p-4 h-[calc(100vh-5.1rem)] overflow-y-auto">
      {/* Renderiza el componente ListDisplay */}
      <ListDisplay />      
    </div>
  );
}

export default DisplayPage;

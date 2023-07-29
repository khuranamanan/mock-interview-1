import CategoryCard from "../Components/CategoryCard";
import { useData } from "../Context/DataContext";

function HomePage() {
  const { categories } = useData();

  return (
    <div className="p-4 flex flex-col gap-4 mb-16">
      <h1 className="font-medium text-3xl">Categories:</h1>
      <div className="flex flex-wrap justify-center w-full gap-4">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

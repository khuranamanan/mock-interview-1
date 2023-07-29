import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-end justify-start basis-64 grow shrink-0 aspect-video p-4 bg-cover bg-center rounded-lg cursor-pointer overflow-hidden"
      onClick={() => navigate(`/category/${category.category}`)}
    >
      <img
        src={category.thumbnail}
        alt={category.category}
        className="absolute inset-0 object-cover h-full w-full"
      />
      <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
      <div className="absolute bottom-4 left-4 text-white font-medium">
        {category.category}
      </div>
    </div>
  );
}

export default CategoryCard;

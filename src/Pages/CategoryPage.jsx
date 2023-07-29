import { useNavigate, useParams } from "react-router";
import { useData } from "../Context/DataContext";
import VideoCard from "../Components/VideoCard";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CategoryPage() {
  const { categoryName } = useParams();
  const { videos } = useData();
  const navigate = useNavigate();

  const categoryVids = videos.filter(
    ({ category }) => category === categoryName
  );

  return (
    <div className="p-4 mb-16 flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <button
          className="hover:bg-slate-100 text-gray-500 p-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-2xl">{categoryName}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryVids.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;

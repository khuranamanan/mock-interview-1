import { useState } from "react";
import { useData } from "../Context/DataContext";
import VideoCard from "../Components/VideoCard";

function ExplorePage() {
  const { videos } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mb-16 flex flex-col gap-4">
      <div className="flex gap-4 flex-col items-center justify-center sm:flex-row sm:justify-between">
        <h1 className="font-bold text-2xl">Explore:</h1>

        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-[90%] sm:max-w-[300px]"
        />
      </div>

      {/* Search Input Field */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.length === 0 ? (
          <p className="font-medium text-center">
            No videos found for the given search term.
          </p>
        ) : (
          filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        )}
      </div>
    </div>
  );
}

export default ExplorePage;

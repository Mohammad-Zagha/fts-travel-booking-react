import { useFetchRecentlyVisited } from "../../../../../hooks/home/useFetchRecentlyVisited";
import RecentlyVistedCard from "./RecentlyVistedCard";

const RecentlyVisited = () => {
  const { data } = useFetchRecentlyVisited();

  if (!data || data.length === 0) return null;

  return (
    <section className="px-4 py-8 md:px-10 lg:px-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Recently Visited
        </h2>
        <p className="text-gray-600">Hotels you've explored recently</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((hotel) => (
          <RecentlyVistedCard key={hotel.hotelId} hotel={hotel} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyVisited;

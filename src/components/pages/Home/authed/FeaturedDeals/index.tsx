import { Link } from "react-router";
import { useFetchFeaturedDeals } from "../../../../../hooks/home/useFetchFeaturedDeals";
import { FeaturedDealCard } from "./FeaturedDealCard";

const FeaturedDeals = () => {
  const { data } = useFetchFeaturedDeals();

  if (!data?.length) return null;

  return (
    <section className="px-4 py-6 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-semibold text-primary">Featured Deals</h2>
        <Link to="/deals/featured" className=" hover:underline text-sm">
          View More
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-scroll overflow-y-hidden bg-white  scroll-smooth scrollbar-hide py-3">
        {data.map((deal) => (
          <div
            key={deal.hotelId}
            className="snap-start shrink-0 w-full max-w-2xl"
          >
            <FeaturedDealCard deal={deal} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDeals;

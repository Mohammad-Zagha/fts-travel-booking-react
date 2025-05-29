import { useFetchFeaturedDeals } from "../../../../../hooks/home/useFetchFeaturedDeals";
import { FeaturedDealCard } from "./FeaturedDealCard";
import Carousel from "../../../../ui/Carousel";

const FeaturedDeals = () => {
  const { data } = useFetchFeaturedDeals();

  if (!data?.length) return null;

  return (
    <section className="px-4 py-8 md:px-10 lg:px-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Featured Deals</h2>
        <p className="text-gray-600">Hotels with the best deals</p>
      </div>

      <Carousel
        showArrows={true}
        showDots={true}
        autoPlay={true}
        autoPlayInterval={6000}
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
      >
        {data.map((deal) => (
          <FeaturedDealCard key={deal.hotelId} deal={deal} />
        ))}
      </Carousel>
    </section>
  );
};

export default FeaturedDeals;

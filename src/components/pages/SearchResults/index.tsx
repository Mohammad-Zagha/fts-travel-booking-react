import { useFetchFilterdHotels } from "../../../hooks/SearchResults/useFetchFilterdHotels";
import useQueryParams from "../../../hooks/useQueryParams";

const SearchResults = () => {
  const query = useQueryParams();
  const { data } = useFetchFilterdHotels({
    city: query.search,
    chickInDate: query.from,
    chickOutDate: query.to,
    adults: parseInt(query.adults),
    children: parseInt(query.children),
    numberOfRooms: parseInt(query.rooms),
  });
  console.log(data);
  return <div>SearchResults</div>;
};

export default SearchResults;

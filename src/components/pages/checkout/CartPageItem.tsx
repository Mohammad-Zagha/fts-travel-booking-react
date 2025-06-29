import type { CartRoomItem } from "../../../context/cartContext";
import { Avatar, AvatarImage } from "../../ui/Avatar";
import { Button } from "../../ui/Button";
import { Trash2 } from "lucide-react";

const CartPageItem = ({
  item,
  onRemove,
}: {
  item: CartRoomItem;
  onRemove: (roomId: number) => void;
}) => {
  return (
    <div
      key={item.roomId}
      className="flex items-start justify-between border-b border-gray-200 pb-4"
    >
      {/* Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <Avatar className="w-full h-full rounded-lg">
          <AvatarImage
            src={item.roomPhotoUrl}
            alt={item.roomType}
            className="w-full h-full object-cover"
          />
        </Avatar>
      </div>

      {/* Details */}
      <div className="flex-1 px-4">
        <h3 className="text-sm font-semibold text-gray-800">{item.roomType}</h3>
        <p className="text-xs text-gray-500">
          Room {item.roomNumber} • {item.capacityOfAdults} Adults,{" "}
          {item.capacityOfChildren} Children
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(item.checkIn).toLocaleDateString()} -{" "}
          {new Date(item.checkOut).toLocaleDateString()}
        </p>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end space-y-2">
        <p className="text-sm font-bold text-gray-800">
          ${item.price * item.quantity}
        </p>
        <p className="text-xs text-gray-500">
          ${item.price} × {item.quantity}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.roomId)}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartPageItem;

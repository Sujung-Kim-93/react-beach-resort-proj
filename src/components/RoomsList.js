import React from "react";
import Room from "./Room";

export default function RoomsList({ sortedRooms }) {
  if (sortedRooms.length === 0) {
    return (
      <div className="empty-search">
        Unfortunately No Rooms matched your search parameters
      </div>
    );
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {sortedRooms.map((room) => {
          return <Room key={room.id} room={room} />;
        })}
      </div>
    </section>
  );
}

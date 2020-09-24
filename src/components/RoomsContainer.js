import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
//import { RoomConsumer } from "../Context";
import { withRoomConsumer } from "../Context";
import Loading from "./Loading";

function RoomsContainer({ context }) {
  const { loading, rooms, sortedRooms } = context;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList sortedRooms={sortedRooms} />
    </>
  );
}

export default withRoomConsumer(RoomsContainer);

// export default function RoomsContainer() {
//   return (
//     <RoomConsumer>
//       {(value) => {
//         console.log(value);
//         const { loading, rooms, sortedRooms } = value;

//         if (loading) {
//           return <Loading />;
//         }

//         return (
//           <>
//             <h1>hello from Roomscontainer</h1>
//             <RoomsFilter rooms={rooms} />
//             <RoomsList sortedRooms={sortedRooms} />
//           </>
//         );
//       }}
//     </RoomConsumer>
//   );
// }

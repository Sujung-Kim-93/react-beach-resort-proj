import React from "react";
import client from "./Contentful";

const RoomContext = React.createContext();

// <RoomContext.Provider value={}
class RoomProvider extends React.Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  //getData
  getData = async () => {
    try {
      let response = await client.getEntries({
        content_type: "beachResortRoom",
        order: "fields.capacity,fields.price",
      });
      let items = response.items;
      // console.log(items);
      let rooms = this.formatData(items);
      let featuredRooms = rooms.filter((item) => {
        return item.featured === true;
      });
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(
        ...rooms.map((item) => {
          return item.size;
        })
      );
      this.setState(() => {
        return {
          rooms,
          featuredRooms,
          sortedRooms: rooms,
          loading: false,
          price: maxPrice,
          maxPrice,
          maxSize,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getData();
  }

  formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      // images는 이미 있는 images를 대체 (images:images) id는 추가(id:id)
      return room;
    });
    return tempItems;
  }

  getRoom = (slug) => {
    const foundRoom = this.state.rooms.find((item) => item.slug === slug);
    return foundRoom;
  };

  handleChange = (event) => {
    // roomsfilter에서 이벤트 발생하면 값 받아옴
    const target = event.target;
    const name = event.target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    //console.log(name, value);

    // state 설정
    this.setState(() => {
      return { [name]: value };
    }, this.filterRooms);
  };

  filterRooms = () => {
    //전체값
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    // state내의 기준에 따라 sort해서 sortedList 설정
    let tempRooms = rooms;

    // 룸타입 설정
    if (this.state.type !== "all") {
      tempRooms = tempRooms.filter((room) => {
        return room.type === type;
      });
    }
    // 인원 설정
    tempRooms = tempRooms.filter((room) => {
      return room.capacity >= parseInt(capacity);
    });

    // 가격 설정
    tempRooms = tempRooms.filter((room) => {
      return room.price <= price;
    });

    // 크기 설정
    tempRooms = tempRooms.filter((room) => {
      return room.size >= minSize && room.size <= maxSize;
    });

    // 아침 설정
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => {
        return room.breakfast === true;
      });
    }

    //반려동물 설정
    if (pets) {
      tempRooms = tempRooms.filter((room) => {
        return room.pets === true;
      });
    }

    //sortedList 돌려주기
    this.setState(() => {
      return { sortedRooms: tempRooms };
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => {
          return <Component {...props} context={value} />;
        }}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };

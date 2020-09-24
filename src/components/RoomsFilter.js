import React from "react";
import { useContext } from "react";
import { RoomContext } from "../Context";
import Title from "../components/Title";
// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

// room type : type / guests: capacity / room price: price / room size:size / breafast / pets
function RoomsFilter() {
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
    rooms,
  } = useContext(RoomContext);
  let roomTypes = getUnique(rooms, "type");
  roomTypes = [...roomTypes, "all"];
  const capacityTypes = getUnique(rooms, "capacity");

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* end select type */}
        {/* select capacity */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {capacityTypes.map((capacity) => (
              <option key={capacity} value={capacity}>
                {capacity}
              </option>
            ))}
          </select>
        </div>
        {/* end select capacity */}
        {/* range price */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            type="range"
            id="price"
            name="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end range price */}
        {/* room size */}
        <div className="form-group">
          <label htmlFor="size">Room Size</label>
          <div className="size-inputs">
            <input
              type="number"
              value={minSize}
              name="minSize"
              onChange={handleChange}
              id="size"
              className="size-input"
            />
            <input
              type="number"
              value={maxSize}
              name="maxSize"
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end room size */}
        {/* checkbox extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
        {/* end checkbox extras */}
      </form>
    </section>
  );
}

export default RoomsFilter;

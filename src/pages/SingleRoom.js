import React from "react";
import { RoomContext } from "../Context";
import defaultBcg from "../images/room-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import StyledHero from "../components/StyledHero";
class SingleRoom extends React.Component {
  static contextType = RoomContext;
  state = {
    slug: this.props.match.params.slug,
    defaultBcg: defaultBcg,
  };

  componentDidMount() {}

  render() {
    const { slug } = this.state;
    const { getRoom } = this.context;
    const foundRoom = getRoom(slug);
    // console.log(slug);
    // console.log(foundRoom);
    if (!foundRoom) {
      return (
        <div className="error">
          <h3>no such room could be found</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
    } = foundRoom;
    const [mainImg, ...defaultImg] = images;
    return (
      <>
        <StyledHero bgImg={mainImg || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((image, idx) => {
              return <img key={idx} src={image} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>
                max capacity :&nbsp;
                {capacity > 1 ? capacity + " people" : capacity + " person"}
              </h6>
              <h6>{pets ? "Pets allowed" : "No Pets Allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map((extra, idx) => {
              return <li key={idx}>- {extra}</li>;
            })}
          </ul>
        </section>
      </>
    );
  }
}
export default SingleRoom;

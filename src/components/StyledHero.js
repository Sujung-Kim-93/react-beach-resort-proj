import styled from "styled-components";
import defaultImg from "../images/room-1.jpeg";

const StyledHero = styled.header`
  min-height: calc(100vh - 66px);
  background: url(${defaultImg});
  background: url(${(props) => (props.bgImg ? props.bgImg : defaultImg)})
    center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero;

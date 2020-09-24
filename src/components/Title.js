import React from "react";

class Title extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div className="section-title">
        <h4>{title}</h4>
        <div />
      </div>
    );
  }
}
export default Title;

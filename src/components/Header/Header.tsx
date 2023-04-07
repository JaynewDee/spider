import React from "react";

// const body = () => <div className="spider-body">{"()"}</div>;
const left = () => <span className="">{"}"}</span>;
const middle = () => (
  <span className="middle-spider">
    {"}"}
    {/* {body()} */}
    {"{"}
  </span>
);
const right = () => <span className="">{"{"}</span>;

const Spider = () => {
  return (
    <div className="spider">
      {left()} {middle()} {right()}
    </div>
  );
};

const Header: React.FC<any> = () => {
  return (
    <header className="header-container">
      <Spider />
      <h2 id="app-title">SPIDER</h2>
      <Spider />
    </header>
  );
};

export default Header;

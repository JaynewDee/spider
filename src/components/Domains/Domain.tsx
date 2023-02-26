import React from "react";

interface DomainProps {
  data: {
    name: string;
    code: string;
  };
}

const Domain: React.FC<DomainProps> = ({ data }): JSX.Element => {
  if (!data) return <div></div>;

  const codeTransform = (code: string) => {
    const asNum = Number(code);
    return asNum >= 200 && asNum < 300
      ? { color: "green" }
      : asNum >= 300 && asNum < 400
      ? { color: "yellow" }
      : { color: "red" };
  };

  const { name, code } = data;
  return (
    <div className="domain-box">
      <p>Name: {name}</p>
      <p>
        Status: <span style={codeTransform(code)}>{code}</span>
      </p>
    </div>
  );
};

export default Domain;

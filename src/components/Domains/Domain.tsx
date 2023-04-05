import React from "react";
import { OptionsState } from "../Monitor/Monitor";

interface DomainProps {
  data: {
    name: string;
    domain: string;
    code: string;
  };
  options: OptionsState;
}

const Domain: React.FC<DomainProps> = ({ data, options }): JSX.Element => {
  if (!data) return <div></div>;

  const codeTransform = (code: string) => {
    const asNum = Number(code);
    return asNum >= 200 && asNum < 300
      ? { color: "green" }
      : asNum >= 300 && asNum < 400
      ? { color: "yellow" }
      : { color: "red" };
  };

  const { name, domain, code } = data;

  return (
    <div className="domain-box">
      <p>{name}</p>
      {options.iframes ? (
        <iframe src={domain}>FQDN: {domain}</iframe>
      ) : (
        <p>FQDN: {domain}</p>
      )}
      <p>
        Status: <span style={codeTransform(code)}>{code}</span>
      </p>
    </div>
  );
};

export default Domain;

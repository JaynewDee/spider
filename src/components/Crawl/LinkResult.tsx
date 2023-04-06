import React, { useState } from "react";

interface LinkProps {
  src: string;
}

const LinkResult: React.FC<LinkProps> = ({ src }) => {
  const [iframeState, setIframeState] = useState(false);

  const toggleIframe = () => {
    setIframeState((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleIframe} className="toggle-iframe-btn">
        IFRAME
      </button>
      {iframeState ? (
        <iframe src={src}></iframe>
      ) : (
        <a className="scraped-link" href={src}>
          {src}
        </a>
      )}
    </>
  );
};

export default LinkResult;

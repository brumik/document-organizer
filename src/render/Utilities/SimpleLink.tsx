import React, { FC } from "react";

interface Props {
  children: React.ReactChild | React.ReactChildren;
  onClick: () => void;
}

const SimpleLink: FC<Props> = ({ children, onClick }) => (
  <a href="" onClick={(e) => { e.preventDefault(); onClick() }}>
    {children}
  </a>
);

export default SimpleLink;

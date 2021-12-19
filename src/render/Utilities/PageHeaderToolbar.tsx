import { Toolbar, ToolbarContent, ToolbarItem } from "@patternfly/react-core";
import React, { FC } from "react";

interface Props {
  children: React.ReactChild | React.ReactChildren;
}

const mapChildren = (children: React.ReactChild | React.ReactChildren) => 
  Array.isArray(children)
    ? children.map(child => (<ToolbarItem>{child}</ToolbarItem>))
    : (<ToolbarItem>{children}</ToolbarItem>);

const PageHeaderToolbar: FC<Props> = ({ children }) => (
  <Toolbar id="toolbar">
    <ToolbarContent>
      {mapChildren(children)}
    </ToolbarContent>
  </Toolbar>
);

export default PageHeaderToolbar;

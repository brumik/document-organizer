import React, { FC } from 'react';
import { Nav, NavGroup, NavItem, NavItemSeparator, NavList } from '@patternfly/react-core';
import { Link, useMatch, useResolvedPath, LinkProps } from 'react-router-dom';

interface CustomNavItemProps extends LinkProps {
  matchEnd?: boolean
}

const CustomNavItem:FC<CustomNavItemProps> = ({ matchEnd = true, to, children, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: matchEnd });

  return (
    <NavItem isActive={!!match}>
      <Link to={to} {...props}>{children}</Link>
    </NavItem>
  );
};

const NavDefaultList: FC<Record<string, never>> = () => (
  <Nav>
    <NavList>
      <CustomNavItem to="/">Main page</CustomNavItem>
      <CustomNavItem to="/settings">Settings</CustomNavItem>
      <NavGroup title="Projects">
        <CustomNavItem to="/project/starred">Starred</CustomNavItem>
        <CustomNavItem to="/project">List</CustomNavItem>
        <CustomNavItem to="/project/archive">Archive</CustomNavItem>
      </NavGroup>
      <NavGroup title="Documents">
        <CustomNavItem to="/document/starred">Starred</CustomNavItem>
        <CustomNavItem to="/document">List</CustomNavItem>
        <CustomNavItem to="/document/archive">Archive</CustomNavItem>
      </NavGroup>
    </NavList>
  </Nav>
)
export default NavDefaultList;
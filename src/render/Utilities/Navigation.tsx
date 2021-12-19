import React, { FC } from 'react';
import { Nav, NavItem, NavList } from '@patternfly/react-core';
import { Link, useMatch, useResolvedPath, LinkProps } from 'react-router-dom';

interface CustomNavItemProps extends LinkProps {
  matchEnd?: boolean
}

const CustomNavItem:FC<CustomNavItemProps> = ({ matchEnd = false, to, children, ...props }) => {
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
      <CustomNavItem to="/" matchEnd>Main page</CustomNavItem>
      <CustomNavItem to="/project">Projects</CustomNavItem>
      <CustomNavItem to="/document">Documents</CustomNavItem>
      <CustomNavItem to="/settings">Settings</CustomNavItem>
    </NavList>
  </Nav>
)
export default NavDefaultList;
import React, { FC } from "react";
import styled from "styled-components";
import { Card, CardBody, CardTitle } from "@patternfly/react-core";
import { Link } from "react-router-dom";
import AddCircleOIcon from '@patternfly/react-icons/dist/js/icons/add-circle-o-icon'; 
import { IconSize } from "@patternfly/react-icons";

const CenteredLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

interface Props {
  title: string;
  url: string;
}

const AddListItem: FC<Props> = ({ title, url }) => {
  return (
    <Card>
      <CardTitle>
        <CenteredLink to={url}>{title}</CenteredLink>
      </CardTitle>
      <CardBody>
        <CenteredLink to={url}>
          <AddCircleOIcon size={IconSize.xl} />
        </CenteredLink>
      </CardBody>
    </Card>
  );
};

export default AddListItem;

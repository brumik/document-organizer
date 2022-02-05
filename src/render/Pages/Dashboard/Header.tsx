import React, { FC } from "react";
import {
  Card,
  CardBody,
  CardTitle
} from "@patternfly/react-core";
import { useAppSelector } from "../../store";
import {
  documentsSelector,
  projectsSelector
} from "../../Utilities/stateSelectors";

const Header: FC<Record<string, never>> = () => {
  const docCount = useAppSelector(documentsSelector({
    isArchived: false,
  })).length;

  const projCount = useAppSelector(projectsSelector({
    isArchived: false,
  })).length;

  const docArchivedCount = useAppSelector(documentsSelector({
    isArchived: true,
  })).length;

  const projArchivedCount = useAppSelector(projectsSelector({
    isArchived: true,
  })).length;

  return (
    <Card>
      <CardTitle>
        Dashboard
      </CardTitle>
      <CardBody>
        <p>Projects: <strong>{projCount} active</strong> and {projArchivedCount} archived.</p>
        <p>Documents: <strong>{docCount} active</strong> and {docArchivedCount} archived.</p>
        <p>Archived items are not shown on the Dashboard.</p>
      </CardBody>
    </Card>
  )
};

export default Header;

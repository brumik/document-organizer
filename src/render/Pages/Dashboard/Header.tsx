import React, { FC } from "react";
import { useAppSelector } from "../../store";
import {
  documentsSelector,
  projectsSelector
} from "../../Utilities/stateSelectors";
import TitleCard from "../../Utilities/TitleCard";

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
    <TitleCard title="Dashboard">
      <p>Projects: <strong>{projCount} active</strong> and {projArchivedCount} archived.</p>
      <p>Documents: <strong>{docCount} active</strong> and {docArchivedCount} archived.</p>
      <p>Archived items are not shown on the Dashboard.</p>
    </TitleCard>
  )
};

export default Header;

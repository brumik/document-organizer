import React, { FC } from "react";
import { FilterStatus } from "../../store/filter/types";
import { useAppSelector } from "../../store";
import {
  documentsSelector,
  projectsSelector
} from "../../Utilities/stateSelectors";
import TitleCard from "../../Utilities/TitleCard";

const Header: FC<Record<string, never>> = () => {
  const docCount = useAppSelector(documentsSelector({
    status: FilterStatus.active
  })).length;

  const projCount = useAppSelector(projectsSelector({
    status: FilterStatus.active
  })).length;

  const docArchivedCount = useAppSelector(documentsSelector({
    status: FilterStatus.archived
  })).length;

  const projArchivedCount = useAppSelector(projectsSelector({
    status: FilterStatus.archived
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

import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import { ArchiveIcon, FolderOpenIcon, StarIcon } from "@patternfly/react-icons";
import React, { FC, useState } from "react";
import {
  useAppDispatch,
  useAppSelector
} from "../../store";
import { setStatus } from "../../store/filter";
import { FilterStatus } from "../../store/filter/types";

const statusMenuItems = [
  <SelectOption key="isActive" value={FilterStatus.active}><FolderOpenIcon /> Active</SelectOption>,
  <SelectOption key="isStarred" value={FilterStatus.starred}><StarIcon /> Starred</SelectOption>,
  <SelectOption key="isArchived" value={FilterStatus.archived}><ArchiveIcon /> Archived</SelectOption>,
];

const StatusSelect: FC<Record<string, never>> = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selected = useAppSelector(state => state.filter.status);
  const dispatch = useAppDispatch();
  
  return (
    <Select
      variant={SelectVariant.single}
      aria-label="Status"
      onToggle={() => setIsExpanded(!isExpanded)}
      onSelect={(_e, selected) => {
        dispatch(setStatus(selected as FilterStatus));
        setIsExpanded(false);
      }}
      selections={selected}
      isOpen={isExpanded}
      placeholderText="Status"
    >
      {statusMenuItems}
    </Select>
  )
};

export default StatusSelect;

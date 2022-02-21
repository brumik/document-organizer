import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import React, { FC, useState } from "react";
import { setTags, toggleTag } from "../../store/filter";
import { useAppDispatch, useAppSelector } from "../../store";
import { tagsSelector } from '../stateSelectors';

interface Props {
  forType?: 'doc' | 'proj' | undefined;
}

const StatusSelect: FC<Props> = ({ forType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selected = useAppSelector(state => state.filter.tags);
  const dispatch = useAppDispatch();

  const items = useAppSelector(tagsSelector(forType)).map(tag => (
    <SelectOption key={tag} value={tag}>{tag}</SelectOption>
  ));

  return (
    <Select
      variant={SelectVariant.typeaheadMulti}
      aria-label="Tags"
      onToggle={() => setIsExpanded(!isExpanded)}
      onSelect={(_e, selected) => dispatch(toggleTag(selected.toString()))}
      onClear={() => dispatch(setTags([]))}
      selections={selected}
      isOpen={isExpanded}
      placeholderText="Tags"
    >
      {items}
    </Select>
  )
};

export default StatusSelect;

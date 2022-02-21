import {
  Button,
  ButtonVariant,
  InputGroup,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarItem
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import React, { FC, useState } from "react";
import { setSearch } from "../../store/filter";
import { useAppDispatch, useAppSelector } from "../../store";
import StatusSelect from "./StatusSelect";
import TagSelect from "./TagSelect";

interface Props {
  forType?: 'doc' | 'proj' | undefined
}

const FilterToolbar: FC<Props> = ({
  forType = undefined
}) => {
  const search = useAppSelector(state => state.filter.search);
  const dispatch = useAppDispatch();

  return (
    <Toolbar>
      <ToolbarContent>
        <ToolbarItem>
          <StatusSelect />
        </ToolbarItem>
        <ToolbarItem>
          <TagSelect forType={forType} />
        </ToolbarItem>
        <ToolbarItem>
          <InputGroup>
            <TextInput
              name="search"
              type="search"
              aria-label="Search in title and description"
              placeholder="Search in title and description"
              value={search}
              onChange={(value) => dispatch(setSearch(value))}
            />
            <Button
              variant={ButtonVariant.control}
              aria-label="Icon for the search field"
            >
              <SearchIcon />
            </Button>
          </InputGroup>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

export default FilterToolbar;

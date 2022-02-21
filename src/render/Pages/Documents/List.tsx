import React, { FC } from "react";
import { Gallery, Stack, StackItem } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import ListItem from "./Components/DocumentListItem";
import AddListItem from "../../Utilities/AddListItem";
import { documentsSelector } from "../../Utilities/stateSelectors";
import TitleCard from "../../Utilities/TitleCard";
import FilterToolbar from "../../Utilities/FilterToolbar";

const List: FC<Record<string, never>> = () => {
  const filter = useAppSelector(state => state.filter);
  const keys = useAppSelector(documentsSelector(filter)).map(d => d.slug) ?? [];

  return (
    <Stack hasGutter>
      <StackItem>
        <TitleCard
          title="Documents"
          description="You can find all your active documents on this page."
        >
          <FilterToolbar forType="doc" />
        </TitleCard>
      </StackItem>
      <StackItem>
        <Gallery hasGutter>
          <AddListItem title="Add new document" url="/document/new" />
          {keys.map(key => (
            <ListItem key={key} slug={key} />
          ))}
        </Gallery>
      </StackItem>
    </Stack>
  );
};

export default List;

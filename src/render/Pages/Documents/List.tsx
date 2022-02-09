import React, { FC } from "react";
import { Gallery, Stack, StackItem } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import ListItem from "./Components/DocumentListItem";
import AddListItem from "../../Utilities/AddListItem";
import { documentsSelector } from "../../Utilities/stateSelectors";
import TitleCard from "../../Utilities/TitleCard";

interface Props {
  isArchived?: boolean;
  isStarred?: boolean;
}

const List: FC<Props> = (props) => {
  const keys = useAppSelector(documentsSelector(props)).map(d => d.slug) ?? [];

  return (
    <Stack hasGutter>
      <StackItem>
        <TitleCard
          title="Projects"
          description="You can find all your active projects on this page."
        />
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

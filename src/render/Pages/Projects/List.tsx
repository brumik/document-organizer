import React, { FC } from "react";
import { Gallery, Stack, StackItem } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import ListItem from "./Components/ProjectListItem";
import AddListItem from "../../Utilities/AddListItem";
import { projectsSelector } from "../../Utilities/stateSelectors";
import TitleCard from "../../Utilities/TitleCard";

interface Props {
  isArchived?: boolean;
  isStarred?: boolean;
}

const List: FC<Props> = (props) => {
  const keys = useAppSelector(projectsSelector(props)).map(p => p.slug);

  return (
    <Stack hasGutter>
      <StackItem>
        <TitleCard
          title="Projects"
          description="You can find all your active projects on this page."
        />
      </StackItem>  
      <StackItem>
        <Gallery
          hasGutter
          minWidths={{
            sm: '307px',
            md: '307px',
            lg: '307px',
            xl: '307px',
            '2xl': '307px',
          }}
        >
          <AddListItem title="Add new project" url="/project/new" />
          {keys.map(key => (
            <ListItem key={key} slug={key} />
          ))}
        </Gallery>
      </StackItem>
    </Stack>
  );
};

export default List;

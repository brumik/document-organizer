import React, { FC } from "react";
import { Gallery, Stack, StackItem } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import ListItem from "./Components/ProjectListItem";
import AddListItem from "../../Utilities/AddListItem";
import { projectsSelector } from "../../Utilities/stateSelectors";
import TitleCard from "../../Utilities/TitleCard";
import FilterToolbar from "../../Utilities/FilterToolbar";

const List: FC<Record<string, never>> = () => {
  const filter = useAppSelector(state => state.filter);
  const keys = useAppSelector(projectsSelector(filter)).map(p => p.slug);

  return (
    <Stack hasGutter>
      <StackItem>
        <TitleCard
          title="Projects"
          description="You can find all your active projects on this page."
        >
          <FilterToolbar forType="proj"/>
        </TitleCard>
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

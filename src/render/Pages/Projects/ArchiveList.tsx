import React, { FC } from "react";
import { Card, CardBody, CardTitle, Gallery, Stack, StackItem } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import ListItem from "./Components/ProjectListItem";
import AddListItem from "../../Utilities/AddListItem";
import { projectsSelector } from "../../Utilities/stateSelectors";

const ArchiveList: FC<Record<string, never>> = () => {
  const keys = useAppSelector(projectsSelector({ isArchived: true })).map(p => p.slug) ?? [];

  return (
    <Stack hasGutter>
      <StackItem>
        <Card>
          <CardTitle>Projects</CardTitle>
          <CardBody>
            This is the page's description.
          </CardBody>
        </Card>
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

export default ArchiveList;
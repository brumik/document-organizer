import React, { FC } from "react";
import { Card, CardBody, CardTitle, Gallery, GalleryItem, Stack, StackItem } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import ListItem from "./Components/DocumentListItem";
import AddListItem from "../../Utilities/AddListItem";
import { documentsSelector } from "../../Utilities/stateSelectors";

const ArchiveList: FC<Record<string, never>> = () => {
  const keys = useAppSelector(documentsSelector({ isArchived: true })).map(d => d.slug) ?? [];

  return (
    <Stack hasGutter>
      <StackItem>
        <Card>
          <CardTitle>Documents</CardTitle>
          <CardBody>
            This is the page's description.
          </CardBody>
        </Card>
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

export default ArchiveList;

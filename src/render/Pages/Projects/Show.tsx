import React, { FC } from "react";
import { Gallery, GalleryItem, Stack, StackItem } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import DocumentListItem from "../Documents/Components/DocumentListItem";
import {
  documentsSelector,
  projectSelector
} from "../../Utilities/stateSelectors";
import ProjectListItem from "./Components/ProjectListItem";
import AddListItem from "../../Utilities/AddListItem";
import { FilterStatus } from "../../store/filter/types";

const Show: FC<Record<string, never>> = () => {
  const { slug } = useParams() as { slug: string };

  const { isArchived } = useAppSelector(projectSelector(slug));
  const relatedDocuments = useAppSelector(
    documentsSelector({
      projectSlug: slug,
      status: isArchived ? FilterStatus.archived : FilterStatus.active })
  );

  return (
    <Stack>
      <StackItem>
        <ProjectListItem slug={slug} />
      </StackItem>
      <StackItem>
        <Gallery hasGutter style={{ padding: '24px' }}>
          <AddListItem title="Add new document" url="/document/new" />
          {relatedDocuments.map((document) => (
            <GalleryItem key={document.slug}>
              <DocumentListItem slug={document.slug} />
            </GalleryItem>
          ))}
        </Gallery>
      </StackItem>
    </Stack>
  );
};

export default Show;

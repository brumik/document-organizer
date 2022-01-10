import React, { FC } from "react";
import { Button, ButtonVariant, Card, CardBody, CardFooter, CardTitle, Gallery, GalleryItem, Stack, StackItem } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import DocumentListItem from "../Documents/Components/DocumentListItem";
import {
  useApi,
  openProject,
} from '../../api';
import {
  documentsSelector,
  projectSelector
} from "../../Utilities/stateSelectors";

const Show: FC<Record<string, never>> = () => {
  const { slug } = useParams() as { slug: string };

  const {
    title = 'Undefined',
    description = 'Undefined',
    isArchived = false
  } = useAppSelector(projectSelector(slug)) ?? {};
  const relatedDocuments = useAppSelector(
    documentsSelector({ projectSlug: slug, isArchived })
  );
  const { request: openApi } = useApi(openProject, null);

  return (
    <Stack hasGutter>
      <StackItem>
        <Card>
          <CardTitle>{title}</CardTitle>
          <CardBody>
            <p>{description}</p>
          </CardBody>
          <CardFooter>
            <p>Number of documents: {relatedDocuments.length}</p>
            <Button
              variant={ButtonVariant.secondary}
              onClick={() => openApi({ slug })}
            >
              Show in files
            </Button>
          </CardFooter>
        </Card>
      </StackItem>
      <StackItem>
        <Gallery hasGutter>
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

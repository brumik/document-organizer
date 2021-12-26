import React, { FC } from "react";
import { Button, ButtonVariant, Card, CardBody, CardFooter, CardTitle, Gallery, GalleryItem, Stack, StackItem } from "@patternfly/react-core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import DocumentListItem from "../Documents/Components/DocumentListItem";
import { openProject } from "../../store/database";

const Show: FC<Record<string, never>> = () => {
  const { slug } = useParams() as { slug: string };
  const dispatch = useAppDispatch();

  const { title, description } = useAppSelector(state => state.database.projects.find(p => p.slug === slug)) ?? {
    title: "Undefined",
    description: "Undefined",
  };
  const relatedDocuments = useAppSelector(state => state.database.documents.filter(d => d.projectSlug === slug));

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
              onClick={() => dispatch(openProject(slug))}
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

import React, { FC } from "react";
import { Card, CardBody, CardFooter, CardTitle, Stack, StackItem, Label, LabelGroup } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SimpleLink from '../../Utilities/SimpleLink';
import {
  useApi,
  openDocument,
} from '../../api';
import { documentSelector, projectSelector } from "../../Utilities/stateSelectors";

const Show: FC<Record<string, never>> = () => {
  const { slug } = useParams() as { slug: string };
  const { title = 'Undefined', projectSlug = '', tags = [] } = useAppSelector(documentSelector(slug)) ?? {};

  const {
    title: projectTitle = 'Undefined'
  } = useAppSelector(projectSelector(projectSlug)) ?? {};

  const { request: openApi } = useApi(openDocument, null);

  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <p>Static description</p>
      </CardBody>
      <CardFooter>
        <Stack hasGutter>
          <StackItem>
            Tags:{' '}
            <LabelGroup>
              {tags.map((tag, i) => <Label key={i}>{tag}</Label>)}
            </LabelGroup>
          </StackItem>
          <StackItem>
            <p>Project: <Link to={`/project/${projectSlug}`}>{projectTitle}</Link></p>
          </StackItem>
          <StackItem>
            <p><SimpleLink onClick={() => openApi({ slug })}>Show file</SimpleLink></p>
          </StackItem>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default Show;

import React, { FC } from "react";
import { Card, CardBody, CardFooter, CardTitle } from "@patternfly/react-core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { openDocument } from "../../store/database";
import SimpleLink from '../../Utilities/SimpleLink';

const Show: FC<Record<string, never>> = () => {
  const { slug } = useParams() as { slug: string };
  const dispatch = useAppDispatch();
  const { title, projectSlug } = useAppSelector(state => state.database.documents.find(p => p.slug === slug)) ?? {
    title: "Undefined",
    projectSlug: '',
  };

  const project = useAppSelector(state => state.database.projects.find(p => p.slug === projectSlug)) ?? {
    title: "Undefined",
    description: "Undefined",
  };

  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardBody>
        <p>Static description</p>
      </CardBody>
      <CardFooter>
        <p>Project: <Link to={`/project/${projectSlug}`}>{project.title}</Link></p>
        <SimpleLink onClick={() => dispatch(openDocument(slug))}>Show file</SimpleLink>
      </CardFooter>
    </Card>
  );
};

export default Show;

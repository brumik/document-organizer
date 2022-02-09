import { Card, CardBody, CardTitle, Title } from "@patternfly/react-core";
import React, { FC } from "react";

interface Props {
  title: string;
  description?: string;
}

const TitleCard: FC<Props> = ({
  title,
  description,
  children
}) => (
  <Card>
    <CardTitle>
      <Title size="xl" headingLevel="h1">
        {title}
      </Title>
    </CardTitle>
    <CardBody>
      {description}
      {children}
    </CardBody>
  </Card>
);

export default TitleCard;

import { Card, CardBody, CardHeader, PageSection, Title } from "@patternfly/react-core";
import React, { FC } from "react";

interface Props {
  title: string;
  description?: string | React.ReactChild;
  toolbar?: React.ReactChild;
  children?: React.ReactChild | React.ReactChildren;
}

const Page: FC<Props> = ({
  title,
  description,
  toolbar,
  children
}) => {
  return (
    <>
      <PageSection
        variant="light"
        padding={{ default: 'noPadding'}}
      >
        <Card isPlain>
          <CardHeader>
            <Title size="xl" headingLevel="h1">
              {title}
            </Title>
          </CardHeader>
          <CardBody>
            {description}
          </CardBody>
        </Card>
        {toolbar}
      </PageSection>
      <PageSection isFilled>{children}</PageSection>
    </>
  );
};

export default Page;

import {
  Card,
  CardBody,
  CardTitle,
  EmptyState,
  EmptyStateIcon,
  List,
  ListItem,
  Title
} from "@patternfly/react-core";
import React, { FC } from "react";
import { CubesIcon, IconSize, StarIcon } from "@patternfly/react-icons";
import { Document, Project } from "../../types";
import { Link } from "react-router-dom";
import { dateSmaller } from "./helpers";

interface Props {
  items: Document[] | Project[];
  title: string;
  showExpiration?: boolean;
};

const linkTo = (item: Document | Project) => {
  if ('projectSlug' in item) {
    return `/project/${item.projectSlug}`;
  } else {
    return `/project/${item.slug}`;
  }
};

const getTitle = (item: Document | Project, showExpiration = false) => {
  let title = item.title;
  if ('expirationDate' in item) {
    if (showExpiration) title += `: ${item.expirationDate}`; 
    if (dateSmaller(item.expirationDate)) title += ' (expired)';
  }

  return title;
}

const ItemList: FC<Props> = ({
  title,
  items,
  showExpiration = false
}) => (
  <Card isFullHeight>
    <CardTitle>{title}</CardTitle>
    <CardBody>
      {items.length < 1 && (
        <EmptyState>
          <EmptyStateIcon icon={CubesIcon} />
          <Title headingLevel="h5" size="md">
            No items found.
          </Title>
        </EmptyState>
      )}
      {items.length > 0 && (
        <List isPlain isBordered>
          {items.map(el => (
            <ListItem
              key={el.slug}
              icon={el.isStarred ? <StarIcon size={IconSize.md} color="gold"/> : null}
            >
              <Link to={linkTo(el)}>
                {getTitle(el, showExpiration)}
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </CardBody>
  </Card>
)

export default ItemList;

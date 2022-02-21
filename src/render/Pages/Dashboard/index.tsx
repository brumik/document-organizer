import { Grid, GridItem } from "@patternfly/react-core";
import React, { FC } from "react";
import Header from "./Header";
import ItemList from "./ItemList";
import { useAppSelector } from "../../store/hooks";
import {
  documentsSelector,
  projectsSelector
} from "../../Utilities/stateSelectors";
import {
  documentExpirationFilter,
  projectExpirationFilter
} from "./helpers";
import { FilterStatus } from "../../store/filter/types";

const DashboardPage: FC<Record<string, never>> = () => {
  const listItems = (type: 'doc' | 'proj') => 
    type === 'doc'
      ? useAppSelector(documentsSelector({
        status: FilterStatus.starred
      }))
      : useAppSelector(projectsSelector({
        status: FilterStatus.starred
      }));

  const docExpiration = useAppSelector(documentExpirationFilter);
  const projExpiration = useAppSelector(projectExpirationFilter);

  return (
    <Grid hasGutter>
      <GridItem sm={12}>
        <Header />
      </GridItem>
      <GridItem sm={12} md={4}>
        <ItemList
          title="Expired projects"
          items={projExpiration.expiredItems}
          showExpiration
        />
      </GridItem>
      <GridItem sm={12} md={4}>
        <ItemList
          title="Projects expiring in a week"
          items={projExpiration.expiringInWeek}
          showExpiration
        />
      </GridItem>
      <GridItem sm={12} md={4}>
        <ItemList
          title="Projects expiring in a month"
          items={projExpiration.expiringInMonth}
          showExpiration
        />
      </GridItem>
      <GridItem sm={12} md={4}>
        <ItemList
          title="Expired documents"
          items={docExpiration.expiredItems}
          showExpiration
        />
      </GridItem>
      <GridItem sm={12} md={4}>
        <ItemList
          title="Documents expiring in a week"
          items={docExpiration.expiringInWeek}
          showExpiration
        />
      </GridItem>
      <GridItem sm={12} md={4}>
        <ItemList
          title="Documents expiring in a month"
          items={docExpiration.expiringInMonth}
          showExpiration
        />
      </GridItem>
      <GridItem sm={12} md={6}>
        <ItemList
          title="Starred projects"
          items={listItems('proj')}
        />
      </GridItem>
      <GridItem sm={12} md={6}>
        <ItemList
          title="Starred documents"
          items={listItems('doc')}
        />
      </GridItem>
      <GridItem sm={12}></GridItem>
    </Grid>
  );
};

export default DashboardPage;

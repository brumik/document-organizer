import React, { FC } from "react";
import {
  Grid,
  GridItem,
} from "@patternfly/react-core";
import Page from "../../Utilities/Page";
import AppSettingsPage from "./Components/AppSettingsCard";
import NotificationsCard from "./Components/NotificationsCard";

const SettingsPage: FC<Record<string, never>> = () => {
  return (
    <Page
      title="Settings"
      description="You can find all the settings for the application on this page."
    >
      <Grid hasGutter>
        <GridItem span={12}>
          <AppSettingsPage />
        </GridItem>
        <GridItem span={12}>
          <NotificationsCard />
        </GridItem>
      </Grid>
    </Page>
  );
};

export default SettingsPage;

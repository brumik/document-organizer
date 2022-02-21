import React, { FC } from "react";
import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Grid,
  GridItem,
  InputGroup,
  TextInput,
} from "@patternfly/react-core";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRootFolder } from "../store/settings";
import {
  useApi,
  importDatabase,
  exportDatabase
} from '../api';
import Page from "../Utilities/Page";

const SettingsPage: FC<Record<string, never>> = () => {
  const rootFolder = useAppSelector(state => state.settings.rootFolder);
  const dispatch = useAppDispatch();

  const { request: importApi, ...restImportDatabase } = useApi(importDatabase, null);
  const { request: exportApi, ...restExportDatabase } = useApi(exportDatabase, null);

  return (
    <Page
      title="Settings"
      description="You can find all the settings for the application on this page."
    >
      <Grid hasGutter>
        <GridItem span={12}>
          <Card>
            <CardTitle>
              App settings
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup fieldId="root-folder" label="The root folder for the data in the app">
                  <InputGroup>
                    <TextInput
                      id="root-folder"
                      type="text"
                      aria-label="root folder"
                      value={rootFolder}
                      isReadOnly
                    />
                    <Button
                      variant={ButtonVariant.primary}
                      onClick={() => dispatch(setRootFolder())}
                    >
                      Select a new path
                    </Button>
                  </InputGroup>
                </FormGroup>
                <FormGroup fieldId="">
                  <Button id="export" onClick={() => exportApi({})}>
                    Export database
                  </Button>
                  {' '}
                  <Button id="import" onClick={() => importApi({})}>
                    Import database
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Page>
  );
};

export default SettingsPage;

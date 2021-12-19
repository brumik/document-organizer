import React, { FC } from "react";
import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  InputGroup,
  TextInput,
} from "@patternfly/react-core";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRootFolder } from "../store/settings";
import { importDatabase, exportDatabase } from "../store/database";

const SettingsPage: FC<Record<string, never>> = () => {
  const rootFolder = useAppSelector(state => state.settings.rootFolder);
  const dispatch = useAppDispatch();

  return (
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
            <Button id="export" onClick={() => dispatch(exportDatabase())}>
              Export database
            </Button>
            {' '}
            <Button id="import" onClick={() => dispatch(importDatabase())}>
              Import database
            </Button>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

export default SettingsPage;

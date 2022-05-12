import React, { FC } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Grid,
  GridItem,
  InputGroup,
  InputGroupText,
  Label,
  Switch,
  TextInput
} from "@patternfly/react-core";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  sendTestNotification,
  setNotificationBeforeDays,
  toggleNotificationEnabled
} from "../../../store/settings";


const NotificationsCard: FC<Record<string, never>> = () => {
  const notificationSupported = useAppSelector(state => state.settings.notificationSupported);
  const notificationEnabled = useAppSelector(state => state.settings.notificationEnabled);
  const notificationBeforeDays = useAppSelector(state => state.settings.notificationBeforeDays);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardTitle>Notifications</CardTitle>
      <CardBody>
        <Form>
          <FormGroup fieldId="notification-switch" label="Enable notifications">
            <Switch
              id="notification-switch"
              label="Notifications are enabled"
              labelOff={
                notificationSupported
                ? "Notifications are disabled"
                : "Notifications are not supported on your system"
              }
              isDisabled={!notificationSupported}
              isChecked={notificationEnabled}
              onChange={() => dispatch(toggleNotificationEnabled())}
            />
          </FormGroup>
          {notificationSupported && notificationEnabled && (  
            <FormGroup
              fieldId="notification-before-days"
              label="Notification timing before expiration date (if the item has one):"
            >
              <InputGroup>
                <TextInput
                  id="notificationBeforeDays"
                  aria-label="Notification defore days field"
                  type="number"
                  value={notificationBeforeDays}
                  onChange={(value) => dispatch(setNotificationBeforeDays(+value))}
                />
                <InputGroupText>days</InputGroupText>
                <Button
                  id="notification-test"
                  onClick={() => dispatch(sendTestNotification())}
                >
                  Send a test notification
                </Button>
              </InputGroup>
            </FormGroup>
          )}
        </Form>
      </CardBody>
    </Card>
  );
}

export default NotificationsCard;
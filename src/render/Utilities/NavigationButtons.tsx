import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonVariant } from "@patternfly/react-core";
import AngleLeftIcon from "@patternfly/react-icons/dist/js/icons/angle-left-icon";
import AngleRightIcon from "@patternfly/react-icons/dist/js/icons/angle-right-icon";
import { IconSize } from "@patternfly/react-icons";

const NavigationButtons: FC<Record<string, never>> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant={ButtonVariant.plain}
        onClick={() => navigate(-1)}>
          <AngleLeftIcon size={IconSize.lg} />
        </Button>
      <Button
        variant={ButtonVariant.plain}
        onClick={() => navigate(1)}>
          <AngleRightIcon size={IconSize.lg} />
        </Button>
    </>
  );
};

export default NavigationButtons;

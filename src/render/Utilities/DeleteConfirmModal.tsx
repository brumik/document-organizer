import { Button, ButtonVariant, Modal, ModalVariant } from "@patternfly/react-core";
import React, { FC, useState } from "react";

interface Props {
  name: string;
  deleteAction: () => void;
  children: React.ReactElement;
}

const DeleteConfirmModal: FC<Props> = ({ name, deleteAction, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {React.cloneElement(children, {
          onClick: () => setIsOpen(true),
      })}
      <Modal
        variant={ModalVariant.medium}
        title={`Are you sure you want to delete "${name}"?`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        actions={[
          <Button
            key="confirm"
            variant={ButtonVariant.danger}
            onClick={deleteAction}
          >
            Delete
          </Button>,
          <Button
            key="cancel"
            variant={ButtonVariant.link}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        ]}
      >
        This action cannot be undone. If you delete the item all associated items and data will be lost.
      </Modal>
    </>
  );
};

export default DeleteConfirmModal;

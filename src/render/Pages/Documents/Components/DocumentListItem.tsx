import React, { FC, useState } from "react";
import {
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  KebabToggle
} from "@patternfly/react-core";
import { useAppSelector } from '../../../store/hooks';
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../../../Utilities/DeleteConfirmModal";
import SimpleLink from "../../../Utilities/SimpleLink";
import {
  useApi,
  deleteDocument,
  openDocument,
  archiveDocument,
} from '../../../api';
import { documentSelector } from "../../../Utilities/stateSelectors";

interface Props {
  slug: string;
}

const DocumentListItem: FC<Props> = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { title } = useAppSelector(documentSelector(slug)) ?? {
    title: ''
  };

  const { request: deleteApi } = useApi(deleteDocument, null);
  const { request: openApi } = useApi(openDocument, null);
  const { request: archiveApi } = useApi(archiveDocument, null);

  const kebabDropDownItems = [
    <DropdownItem
      key="edit"
      onClick={() => navigate(`/document/${slug}/edit`)}
    >
      Edit
    </DropdownItem>,
    <DeleteConfirmModal
      key="delete"
      name={title}
      deleteAction={() => {
        deleteApi({ slug });
      }}
    >
      <DropdownItem style={{ color: 'red' }}>
        Delete
      </DropdownItem>
    </DeleteConfirmModal>,
    <DropdownItem
      key="archive"
      onClick={() => archiveApi({ slug })}
    >
      Archive
    </DropdownItem>
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link to={`/document/${slug}`}>{title}</Link>
        </CardTitle>
        <CardActions>
          <Dropdown
            toggle={
              <KebabToggle
                onToggle={() => setIsOpen((current) => !current)}
              />
            }
            isOpen={isOpen}
            isPlain
            dropdownItems={kebabDropDownItems}
            position={DropdownPosition.right}
          />
          <Checkbox
            aria-label="card checkbox"
            id="check-1"
            name="check1"
          />
        </CardActions>
      </CardHeader>
      <CardBody>
        <p>Static desc.</p>
      </CardBody>
      <CardFooter>
        <SimpleLink onClick={() => openApi({ slug })}>Show file</SimpleLink>
      </CardFooter>
    </Card>
  );
};

export default DocumentListItem;

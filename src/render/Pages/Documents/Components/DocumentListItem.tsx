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
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../../../Utilities/DeleteConfirmModal";
import { deleteDocument, openDocument } from "../../../store/database";
import SimpleLink from "../../../Utilities/SimpleLink";

interface Props {
  slug: string;
}

const DocumentListItem: FC<Props> = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { title } = useAppSelector(state => state.database.documents.find(d => d.slug === slug)) ?? {
    title: ''
  };

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
        dispatch(deleteDocument(slug));
        navigate(`/document`)
      }}
    >
      <DropdownItem style={{ color: 'red' }}>
        Delete
      </DropdownItem>
    </DeleteConfirmModal>
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
        <SimpleLink onClick={() => dispatch(openDocument(slug))}>Show file</SimpleLink>
      </CardFooter>
    </Card>
  );
};

export default DocumentListItem;

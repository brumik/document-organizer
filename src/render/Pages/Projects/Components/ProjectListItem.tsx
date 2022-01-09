import React, { FC, useEffect, useState } from "react";
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
import {
  useApi,
  deleteProject,
  archiveProject,
} from '../../../api';
import {
  documentsSelector,
  projectSelector
} from "../../../Utilities/stateSelectors";

interface Props {
  slug: string;
}

const ProjectListItem: FC<Props> = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { title, description } = useAppSelector(projectSelector(slug)) ?? {
    title: "Undefined",
    description: "Undefined",
  };

  const relatedDocuments = useAppSelector(
    documentsSelector({ projectSlug: slug, isArchived: false })
  );

  const { request: deleteApi } = useApi(deleteProject, null);
  const { request: archiveApi } = useApi(archiveProject, null);

  
  const kebabDropDownItems = [
    <DropdownItem
      key="edit"
      onClick={() => navigate(`/project/${slug}/edit`)}
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
          <Link to={`/project/${slug}`}>{title}</Link>
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
        <p>{description}</p>
      </CardBody>
      <CardFooter>
        <p>Number of documents: {relatedDocuments.length}</p>
      </CardFooter>
    </Card>
  );
};

export default ProjectListItem;

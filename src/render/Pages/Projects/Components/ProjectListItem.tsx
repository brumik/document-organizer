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
  KebabToggle,
  Label,
  LabelGroup
} from "@patternfly/react-core";
import { useAppSelector } from '../../../store/hooks';
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../../../Utilities/DeleteConfirmModal";
import {
  useApi,
  deleteProject,
  archiveProject,
  toggleProjectStar,
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

  const project = useAppSelector(projectSelector(slug));
  const { title, description, isArchived, tags } = project;

  const relatedDocuments = useAppSelector(
    documentsSelector({ projectSlug: slug, isArchived })
  );

  const { request: deleteApi } = useApi(deleteProject, null);
  const { request: archiveApi } = useApi(archiveProject, null);
  const { request: starApi } = useApi(toggleProjectStar, null);
  
  const kebabDropDownItems = [
    <DropdownItem
      key="edit"
      onClick={() => navigate(`/project/${slug}/edit`)}
    >
      Edit
    </DropdownItem>,
    <DropdownItem
      key="archive"
      onClick={() => archiveApi({ slug, isArchived: !isArchived })}
    >
      {isArchived ? 'Unarchive' : 'Archive'}
    </DropdownItem>,
    <DropdownItem
      key="star"
      onClick={() => starApi({ project })}
    >
      {project.isStarred ? 'Unstar' : 'Star'}
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
    </DeleteConfirmModal>
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
        Tags:{' '}
        <LabelGroup>
          {tags.map((tag, i) => <Label key={i}>{tag}</Label>)}
        </LabelGroup>
        <p>Number of documents: {relatedDocuments.length}</p>
      </CardFooter>
    </Card>
  );
};

export default ProjectListItem;

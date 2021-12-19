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
import { deleteProject } from "../../../store/database";

interface Props {
  slug: string;
}

const ProjectListItem: FC<Props> = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { title, description } = useAppSelector(state => state.database.projects[slug]);
  const relatedDocuments = useAppSelector(state =>
    Object.entries(state.database.documents)
      .filter(([,doc]) => doc.projectSlug === slug));

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
        dispatch(deleteProject(slug));
        navigate(`/project`)
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
        <p>Number of documents: {relatedDocuments.length}</p>
      </CardFooter>
    </Card>
  );
};

export default ProjectListItem;

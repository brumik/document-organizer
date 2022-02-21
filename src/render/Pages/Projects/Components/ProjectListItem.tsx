import React, { FC, useEffect, useState } from "react";
import { 
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  KebabToggle,
  Label,
  LabelGroup,
  Split,
  SplitItem,
  Stack,
  StackItem
} from "@patternfly/react-core";
import { useAppSelector } from '../../../store/hooks';
import { Link, useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../../../Utilities/DeleteConfirmModal";
import {
  useApi,
  deleteProject,
  archiveProject,
  toggleProjectStar,
  openProject,
} from '../../../api';
import {
  documentsSelector,
  projectSelector
} from "../../../Utilities/stateSelectors";
import { ArchiveIcon, CalendarDayIcon, CopyIcon, StarIcon } from "@patternfly/react-icons";
import SimpleLink from "../../../Utilities/SimpleLink";
import { FilterStatus } from "../../../store/filter/types";

interface Props {
  slug: string;
}

const ProjectListItem: FC<Props> = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const project = useAppSelector(projectSelector(slug));
  const {
    title,
    description,
    isArchived,
    isStarred,
    tags,
    expirationDate
  } = project;

  const relatedDocuments = useAppSelector(
    documentsSelector({
      projectSlug: slug,
      status: isArchived ? FilterStatus.archived : FilterStatus.active })
  );

  const { request: deleteApi } = useApi(deleteProject, null);
  const { request: archiveApi } = useApi(archiveProject, null);
  const { request: starApi } = useApi(toggleProjectStar, null);
  const { request: showApi } = useApi(openProject, null);

  
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
    <Card isFullHeight>
      <CardHeader>
        <CardTitle>
          {isStarred && <><StarIcon color="gold" />{' '}</>}
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
        </CardActions>
      </CardHeader>
      <CardBody>
        <Stack hasGutter>
          {description && (
            <StackItem>{description}</StackItem>
          )}
          {(tags.length > 0 || isArchived) && (
            <StackItem>
              <LabelGroup numLabels={10}>
                {[
                  isArchived && 
                    <Label key="archived" icon={<ArchiveIcon />}>
                      Archived
                    </Label>,
                  ...tags.map((tag, i) => <Label key={i}>{tag}</Label>),
                ].filter(Boolean)}
              </LabelGroup>
            </StackItem>
          )}
          <Split hasGutter>
            <SplitItem>
              <CopyIcon />{' '}
                {relatedDocuments.length}
            </SplitItem>
            {expirationDate && (
              <SplitItem>
                <CalendarDayIcon /> {expirationDate}
              </SplitItem>
            )}
          </Split>
        </Stack>
      </CardBody>
      <CardFooter>
        <SimpleLink onClick={() => showApi({ slug })}>
          Show in files
        </SimpleLink>
      </CardFooter>
    </Card>
  );
};

export default ProjectListItem;

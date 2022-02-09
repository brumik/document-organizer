import React, { FC, useState } from "react";
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
import SimpleLink from "../../../Utilities/SimpleLink";
import {
  useApi,
  deleteDocument,
  openDocument,
  archiveDocument,
  toggleDocumentStar,
  openProject,
} from '../../../api';
import {
  documentSelector,
  projectSelector
} from "../../../Utilities/stateSelectors";
import { ArchiveIcon, CalendarDayIcon, FolderOpenIcon, StarIcon } from "@patternfly/react-icons";

interface Props {
  slug: string;
}

const DocumentListItem: FC<Props> = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const document = useAppSelector(documentSelector(slug));
  const {
    isArchived,
    isStarred,
    title,
    description,
    tags,
    expirationDate,
    projectSlug
  } = document;

  const { title: projectTitle } =
    useAppSelector(projectSelector(projectSlug));

  const { request: deleteApi } = useApi(deleteDocument, null);
  const { request: openApi } = useApi(openDocument, null);
  const { request: showApi } = useApi(openProject, null);
  const { request: archiveApi } = useApi(archiveDocument, null);
  const { request: starApi } = useApi(toggleDocumentStar, null);

  const kebabDropDownItems = [
    <DropdownItem
      key="edit"
      onClick={() => navigate(`/document/${slug}/edit`)}
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
      onClick={() => starApi({ document })}
    >
      {isStarred ? 'Unstar' : 'Star'}
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
  ];

  return (
    <Card isFullHeight>
      <CardHeader>
        <CardTitle>
          {isStarred && <><StarIcon color="gold" />{' '}</>}
          {title}
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
              <LabelGroup>
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
          <StackItem>
            <Split hasGutter>
              {projectTitle && (
                <SplitItem>
                  <FolderOpenIcon />{' '}
                    <Link to={`/project/${projectSlug}`}>
                      {projectTitle}
                    </Link>
                </SplitItem>
              )}
              {expirationDate && (
                <SplitItem>
                  <CalendarDayIcon /> {expirationDate}
                </SplitItem>
              )}
            </Split>
          </StackItem>
        </Stack>
      </CardBody>
      <CardFooter>
        <Split hasGutter>
          <SplitItem isFilled>
            <SimpleLink onClick={() => openApi({ slug })}>
              Open file
            </SimpleLink>
          </SplitItem>
          <SplitItem>
            <SimpleLink onClick={() => showApi({ slug: projectSlug })}>
              Show in files
            </SimpleLink>
          </SplitItem>
        </Split>
      </CardFooter>
    </Card>
  );
};

export default DocumentListItem;

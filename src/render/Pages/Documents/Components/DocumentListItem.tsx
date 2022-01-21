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
  KebabToggle,
  Label,
  LabelGroup,
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
} from '../../../api';
import {
  documentSelector,
  projectSelector
} from "../../../Utilities/stateSelectors";

interface Props {
  slug: string;
}

const DocumentListItem: FC<Props> = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const document = useAppSelector(documentSelector(slug));

  const { title: projectTitle } =
    useAppSelector(projectSelector(document.projectSlug));

  const { request: deleteApi } = useApi(deleteDocument, null);
  const { request: openApi } = useApi(openDocument, null);
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
      onClick={() => archiveApi({ slug, isArchived: !document.isArchived })}
    >
      {document.isArchived ? 'Unarchive' : 'Archive'}
    </DropdownItem>,
    <DropdownItem
      key="star"
      onClick={() => starApi({ document })}
    >
      {document.isStarred ? 'Unstar' : 'Star'}
    </DropdownItem>,
    <DeleteConfirmModal
      key="delete"
      name={document.title}
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
    <Card>
      <CardHeader>
        <CardTitle>
          <Link to={`/document/${slug}`}>{document.title}</Link>
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
        <Stack hasGutter>
          <StackItem>
            Tags:{' '}
            <LabelGroup>
              {document.tags.map((tag, i) => <Label key={i}>{tag}</Label>)}
            </LabelGroup>
          </StackItem>
          <StackItem>
            <p>Project:
              <Link to={`/project/${document.projectSlug}`}>
                {projectTitle}
              </Link>
            </p>
          </StackItem>
          <StackItem>
            <p>
              <SimpleLink onClick={() => openApi({ slug })}>
                Show file
              </SimpleLink>
            </p>
          </StackItem>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default DocumentListItem;

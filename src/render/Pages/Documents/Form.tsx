import React, { FC, useEffect, useState } from "react";
import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  DatePicker,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Grid,
  GridItem,
  InputGroup,
  InputGroupText,
  InputGroupTextVariant,
  Switch,
  TextArea,
  TextInput
} from "@patternfly/react-core";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store";
import uniqueSlugHelper from "../../Utilities/uniqueSlugHelper";
import {
  useApi,
  addNewDocument,
  updateDocument,
  selectDocumentToUpload,
  openDocument,
} from '../../api';
import {
  documentSelector,
  projectsSelector,
} from "../../Utilities/stateSelectors";
import SimpleLink from "../../Utilities/SimpleLink";
import TitleCard from "../../Utilities/TitleCard";

const DocumentForm: FC<Record<string, never>> = () => {
  const { slug } = useParams() as { slug?: string };
  const navigate = useNavigate();

  const editedDoc = useAppSelector(documentSelector(slug ?? ''));

  const { request: addApi, isSuccess: addSuccess } = useApi(addNewDocument, null);
  const { request: updateApi, isSuccess: updateSuccess } = useApi(updateDocument, null);

  const {
    request: getDocumentPath,
    result: selectedPath,
  } = useApi(selectDocumentToUpload, '');
  const { request: openApi } = useApi(openDocument, null);


  const projectDropdownOptions = 
    useAppSelector(projectsSelector({ isArchived: false }))
      .map(({ slug, title }) => ({ value: slug, label: title }));

  const [form, setForm] = useState(editedDoc);
  const [hasExpiration, setHasExpiration] = useState(!!form.expirationDate);

  useEffect(() => {
    setForm(current => ({
      ...current,
      slug: uniqueSlugHelper(form.title)
    }));
  }, [form.title]);

  useEffect(() => {
    const extReg = /(?:\.([^.]+))?$/;
    if (selectedPath && !form.title) {
      setForm(current => ({
        ...current,
        title: selectedPath.replace(/^.*[\\\/]/, ''),
        ext: extReg.exec(selectedPath)?.[1] ?? ''
      }))
    }
  }, [selectedPath])

  useEffect(() => {
    if (addSuccess || updateSuccess)
      navigate(-1);
  }, [addSuccess, updateSuccess]);

  const projectDropdownOnChange = (projectSlug: string) => {
    setForm(current => ({
      ...current,
      projectSlug
    }));
  };

  const onSave = () => {
    if (slug)
      updateApi({ 
        oldSlug: slug,
        document: form
      });
    else
      addApi({
        originFile: selectedPath, 
        document: form
      });
  }

  const onCancel = () => {
    navigate('/document')
  };

  return (
    <Grid hasGutter>
      <GridItem span={12}>
        <TitleCard
          title={slug ? `Edit document "${form.title}"` : `Add a new document`}
          description="Fields marked with a red star are required."
        />
      </GridItem>
      <GridItem md={6} sm={12}>
        <Card isFullHeight>
          <CardTitle>Document details</CardTitle>
          <CardBody>
            <Form>
              {slug && (
                <FormGroup label="Old slug (curent document name on disk)" fieldId="old-slug">
                  <TextInput
                    isRequired
                    type="text"
                    id="old-slug"
                    name="old-slug"
                    value={slug}
                    isReadOnly
                  />
                </FormGroup>
              )}
              <FormGroup label="Slug (document name on disk)" fieldId="slug">
                <TextInput
                  isRequired
                  type="text"
                  id="slug"
                  name="slug"
                  value={form.slug}
                  isReadOnly
                />
              </FormGroup>
              <FormGroup label="Title (if left empty will get from the document)" isRequired fieldId="title">
                <TextInput
                  isRequired
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={(title) => setForm({ ...form, title })}
                />
              </FormGroup>
              {!slug && (
                <FormGroup fieldId="upload-document" isRequired label="Select the document from the disk">
                  <InputGroup>
                    <TextInput
                      id="upload-document"
                      type="text"
                      aria-label="upload document"
                      value={selectedPath}
                      isReadOnly
                    />
                    <Button
                      variant={ButtonVariant.primary}
                      onClick={() => getDocumentPath({})}
                    >
                      Select a document
                    </Button>
                  </InputGroup>
                </FormGroup>
              )}
              {slug && (<p>
                <SimpleLink onClick={() => openApi({ slug })}>
                  Show file
                </SimpleLink>
              </p>)}
            </Form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md={6} sm={12}>
        <Card>
          <CardTitle>Document information</CardTitle>
          <CardBody>
            <Form>
              <FormGroup label="Description" fieldId="description">
                <TextArea
                  id="description"
                  name="description"
                  aria-label="description"
                  resizeOrientation="vertical"
                  rows={5}
                  value={form.description}
                  onChange={(description) => setForm({ ...form, description })}
                />
              </FormGroup>
              <FormGroup label="Tags (comma divided list)" fieldId="tags">
                <TextInput
                  type="text"
                  id="tags"
                  name="tags"
                  value={form.tags.join(',')}
                  onChange={(value) => setForm({ ...form, tags: value ? value.split(',') : [] })}
                />
              </FormGroup>
              <FormGroup label="Project" fieldId="project">
                <FormSelect
                  value={form.projectSlug}
                  onChange={projectDropdownOnChange}
                  aria-label="FormSelect Input"
                >
                  <FormSelectOption
                    key="no-project"
                    value="./"
                    label="No project"
                  />
                  {projectDropdownOptions.map((option) => (
                    <FormSelectOption
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup label="Expiration Date" fieldId="expiration-date">
                <InputGroup>
                  <DatePicker
                    id="expiration-date"
                    isDisabled={!hasExpiration}
                    value={form.expirationDate}
                    onChange={expirationDate => setForm({ ...form, expirationDate})}
                  />
                  <InputGroupText variant={InputGroupTextVariant.plain}>
                    <Switch
                      aria-label="Toggle expiration date"
                      isChecked={hasExpiration}
                      onChange={() => {
                        setHasExpiration(!hasExpiration);
                        setForm({ ...form, expirationDate: '' });
                      }}
                    />
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md={12} sm={12}>
        <Card>
          <CardBody>
            <Button
              variant={ButtonVariant.primary}
              onClick={onSave}
            >
              Save
            </Button>
            {' '}
            <Button
              variant={ButtonVariant.link}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default DocumentForm;

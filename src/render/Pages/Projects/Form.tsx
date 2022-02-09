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
import { useAppSelector } from "../../store/hooks";
import uniqueSlugHelper from "../../Utilities/uniqueSlugHelper";
import {
  useApi,
  addNewProject,
  updateProject,
} from '../../api';
import { projectSelector } from "../../Utilities/stateSelectors";
import TitleCard from "../../Utilities/TitleCard";

const ProjectForm: FC<Record<string, never>> = () => {
  const { slug } = useParams() as { slug?: string };
  const navigate = useNavigate();

  const editedProject = useAppSelector(projectSelector(slug ?? ''));

  const { request: addApi, ...restAddProject } = useApi(addNewProject, null);
  const { request: updateApi, ...restUpdateProject } = useApi(updateProject, null);

  const [form, setForm] = useState(editedProject);
  const [hasExpiration, setHasExpiration] = useState(!!form.expirationDate);

  useEffect(() => {
    setForm(current => ({
      ...current,
      slug: uniqueSlugHelper(form.title)
    }));
  }, [form.title]);

  useEffect(() => {
    if (
      restAddProject.isSuccess ||
      restUpdateProject.isSuccess
    )
      navigate(`/project/${form.slug}`);
  }, [restAddProject, restUpdateProject]);

  const onSave = () => {
    if (slug) {
      updateApi({
        oldSlug: slug,
        project: form
      });
    } else {
      addApi({ project: form });
    }
  };

  const onCancel = () => {
    navigate('/project')
  };

  return (
    <Grid hasGutter>
      <GridItem span={12}>
        <TitleCard
          title={slug ? `Edit project "${slug}"` : `Add a new project`}
          description="Fields marked with a red star are required."
        />
      </GridItem>
      <GridItem span={12}>
        <Card>
          <CardTitle>Project details</CardTitle>
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
              <FormGroup label="Slug (folder name on disk)" fieldId="slug">
                <TextInput
                  isRequired
                  type="text"
                  id="slug"
                  name="slug"
                  value={form.slug}
                  isReadOnly
                />
              </FormGroup>
              <FormGroup label="Title" isRequired fieldId="title">
                <TextInput
                  isRequired
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={(title) => setForm({ ...form, title })}
                />
              </FormGroup>
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
                  onChange={(value) => setForm({ ...form, tags: value ? value.split(',') : []})}
                />
              </FormGroup>
              <FormGroup label="Expiration Date" fieldId="expiration-date">
                <InputGroup>
                  <DatePicker
                    id="expiration-date"
                    isDisabled={!hasExpiration}
                    value={form.expirationDate}
                    onChange={expirationDate => setForm({ ...form, expirationDate })}
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
      <GridItem span={12}>
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

export default ProjectForm;

import React, { FC, useEffect, useState } from "react";
import { Button, ButtonVariant, Card, CardBody, CardTitle, Form, FormGroup, Grid, GridItem, TextArea, TextInput } from "@patternfly/react-core";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNewProject, updateProject } from "../../store/database";
import { Project } from "../../types";
import uniqueSlugHelper from "../../Utilities/uniqueSlugHelper";

const ProjectForm: FC<Record<string, never>> = () => {
  const { slug } = useParams() as { slug?: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const projects = useAppSelector(state => state.database.projects);

  const [form, setForm] = useState<Project>({
    title: '',
    description: '',
  });

  const [formSlug, setFormSlug] = useState(slug ?? '');

  useEffect(() => {
    setFormSlug(
      uniqueSlugHelper(form.title)
    );
  }, [form.title]);

  useEffect(() => {
    if (slug && projects[slug]) {
      setForm(projects[slug]);
    }
  }, [slug]);

  const onSave = () => {
    if (slug)
      dispatch(updateProject(slug, formSlug, form));
    else
      dispatch(addNewProject(formSlug, form));

    navigate(`/project/${formSlug}`);
  };

  const onCancel = () => {
    navigate('/project')
  };

  return (
    <Grid hasGutter>
      <GridItem span={12}>
        <Card>
          <CardTitle>Create a new project</CardTitle>
          <CardBody>
            You can create a new project here.
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md={6} sm={12}>
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
                  value={formSlug}
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
            </Form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md={6} sm={12}>
        <Card>
          <CardTitle>Linked documents</CardTitle>
          <CardBody>
            <p>Document 1</p><br />
            <p>Document 2</p><br />
            <p>Document 3</p>
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

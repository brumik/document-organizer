import React, { FC } from "react";
import { Gallery } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import ListItem from "./Components/ProjectListItem";
import AddListItem from "../../Utilities/AddListItem";
import { projectsSelector } from "../../Utilities/stateSelectors";
import FilterToolbar from "../../Utilities/FilterToolbar";
import Page from "../../Utilities/Page";

const List: FC<Record<string, never>> = () => {
  const filter = useAppSelector(state => state.filter);
  const keys = useAppSelector(projectsSelector(filter)).map(p => p.slug);

  return (
    <Page
      title="Projects"
      description="You can find all your active projects on this page."
      toolbar={<FilterToolbar forType="proj" />}
    >
      <Gallery
        hasGutter
        minWidths={{
          sm: '307px',
          md: '307px',
          lg: '307px',
          xl: '307px',
          '2xl': '307px',
        }}
      >
        <AddListItem title="Add new project" url="/project/new" />
        {keys.map(key => (
          <ListItem key={key} slug={key} />
        ))}
      </Gallery>
    </Page>
  );
};

export default List;

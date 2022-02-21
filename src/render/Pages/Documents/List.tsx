import React, { FC } from "react";
import { Gallery } from "@patternfly/react-core";
import { useAppSelector } from "../../store/hooks";
import ListItem from "./Components/DocumentListItem";
import AddListItem from "../../Utilities/AddListItem";
import { documentsSelector } from "../../Utilities/stateSelectors";
import FilterToolbar from "../../Utilities/FilterToolbar";
import Page from "../../Utilities/Page";

const List: FC<Record<string, never>> = () => {
  const filter = useAppSelector(state => state.filter);
  const keys = useAppSelector(documentsSelector(filter)).map(d => d.slug) ?? [];

  return (
    <Page
      title="Documents"
      description="You can find all your active documents on this page."
      toolbar={<FilterToolbar forType="doc" />}
    >
      <Gallery hasGutter>
        <AddListItem title="Add new document" url="/document/new" />
        {keys.map(key => (
          <ListItem key={key} slug={key} />
        ))}
      </Gallery>
    </Page>
  );
};

export default List;

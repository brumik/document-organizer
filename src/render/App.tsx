import React, { FC } from "react";
import {
  Page,
  PageHeader,
  PageSection,
  PageSidebar,
} from "@patternfly/react-core";
import Navigation from "./Utilities/Navigation";
import logo from "./logo.png";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SettingsPage from "./Pages/Settings";
import { sync as settingsSync } from "./store/settings";
import { selectDocumentToUploadResponse, sync as databaseSync } from "./store/database";
import { useAppDispatch } from "./store/hooks";
import {
  List as ProjList,
  Show as ProjShow,
  Form as ProjForm,
} from "./Pages/Projects";
import {
  List as DocList,
  Show as DocShow,
  Form as DocForm,
} from "./Pages/Documents";
import NavigationButtons from "./Utilities/NavigationButtons";
import PageHeaderToolbar from "./Utilities/PageHeaderToolbar";

const App: FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize and keep up to date the settings db
    window.api.settings.send('requestAll');
    window.api.settings.receive('getAll', (data) => {
      dispatch(settingsSync(data));
    });
    // Initialize and keep up to date the database db
    window.api.database.send('requestAll');
    window.api.database.receive('getAll', (data) => {
      dispatch(databaseSync(data));
    });
    window.api.database.receive('selectDocumentToUploadResponse', (data) => {
      dispatch(selectDocumentToUploadResponse(data));
    });
  }, []);

  const Header = (
    <PageHeader
      logo={(
        <>
          <img src={logo} width="30px" alt="Logo" />
          <p style={{ marginLeft: '10px', color: 'white' }}>Document Organizer</p>
        </>   
      )}
      showNavToggle
      headerTools={
        <PageHeaderToolbar>
          <NavigationButtons />
        </PageHeaderToolbar>
      }
    />
  );

  const Sidebar = <PageSidebar nav={<Navigation />} />;

  return (
    <Page isManagedSidebar header={Header} sidebar={Sidebar} style={{ minHeight: "100vh" }}>
      <PageSection isFilled>
        <Routes>
          <Route path="/" element={<ProjList />} />
          <Route path="/project" element={<ProjList />} />
          <Route path="/project/:slug" element={<ProjShow />} />
          <Route path="/project/:slug/edit" element={<ProjForm />} />
          <Route path="/project/new" element={<ProjForm />} />
          <Route path="/document" element={<DocList />} />
          <Route path="/document/:slug" element={<DocShow />} />
          <Route path="/document/:slug/edit" element={<DocForm />} />
          <Route path="/document/new" element={<DocForm />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </PageSection>
    </Page>
  );
};

export default App;

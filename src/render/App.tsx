import React, { FC } from "react";
import {
  Page,
  PageHeader,
  PageSidebar,
} from "@patternfly/react-core";
import Navigation from "./Utilities/Navigation";
import logo from "./logo_512x512.png";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SettingsPage } from "./Pages/Settings";
import { sync as settingsSync } from "./store/settings";
import { sync as databaseSync } from "./store/database";
import { useAppDispatch } from "./store/hooks";
import {
  List as ProjList,
  Show as ProjShow,
  Form as ProjForm,
} from "./Pages/Projects";
import DashboardPage from "./Pages/Dashboard";
import {
  List as DocList,
  Form as DocForm,
} from "./Pages/Documents";
import NavigationButtons from "./Utilities/NavigationButtons";
import PageHeaderToolbar from "./Utilities/PageHeaderToolbar";
import {
  useApi,
  documentHealthCheck,
  projectHealthCheck,
  reloadAll
} from "./api";

const App: FC<Record<string, never>> = () => {
  const dispatch = useAppDispatch();

  const docHealthCheck = useApi(documentHealthCheck, null, 'docHealthCheck', false);
  const projHealthCheck = useApi(projectHealthCheck, null, 'projHealthCheck', false);

  useEffect(() => {
    window.api.database.receive('getAll', (data) => {
      dispatch(databaseSync(data));
    });
    window.api.settings.receive('getAll', (data) => {
      dispatch(settingsSync(data));
    });
    reloadAll();
    window.api.settings.send('requestAll');
    docHealthCheck.request({});
    projHealthCheck.request({});
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
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/project" element={<ProjList />} />
        <Route path="/project/:slug" element={<ProjShow />} />
        <Route path="/project/:slug/edit" element={<ProjForm />} />
        <Route path="/project/new" element={<ProjForm />} />
        <Route path="/document" element={<DocList />} />
        <Route path="/document/:slug/edit" element={<DocForm />} />
        <Route path="/document/new">
          <Route index element={<DocForm />} />
          <Route path=":projectSlug" element={<DocForm />} />
        </Route>
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Page>
  );
};

export default App;

import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import TeamsList from './views/TeamsList';
import TeamForm from './views/TeamForm';
import Pabellones from './views/Pabellones';
import PabellonForm from './views/PabellonForm';
import Recuperacion from "./views/Recuperacion";
import RecuperacionForm from "./views/RecuperacionForm";
import RecuperacionShow from "./views/RecuperacionShow";
import AddCamaToSala from "./views/AddCamaToSala";
import CamasRecuperacion from "./views/CamasRecuperacion";
import CamaForm from "./views/CamaForm";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/teams-list",
    layout: DefaultLayout,
    component: TeamsList
  },
  {
    path: "/teams-form",
    layout: DefaultLayout,
    component: TeamForm
  },
  {
    path: "/pabellones",
    layout: DefaultLayout,
    component: Pabellones
  },
  {
    path: "/editar-pabellon/:id",
    layout: DefaultLayout,
    component: PabellonForm
  },
  {
    path: "/agregar-pabellon",
    layout: DefaultLayout,
    component: PabellonForm
  },
  {
    path: "/recuperacion",
    layout: DefaultLayout,
    component: Recuperacion
  },
  {
    path: "/editar-recuperacion/:id",
    layout: DefaultLayout,
    component: RecuperacionForm
  },
  {
    path: "/agregar-recuperacion",
    layout: DefaultLayout,
    component: RecuperacionForm
  },
  {
    path: "/ver-recuperacion/:id",
    layout: DefaultLayout,
    component: RecuperacionShow
  },
  {
    path: "/agregar-cama-recuperacion/:id",
    layout: DefaultLayout,
    component: AddCamaToSala
  },
  {
    path: "/camas-recuperacion",
    layout: DefaultLayout,
    component: CamasRecuperacion
  },
  {
    path: "/crear-cama-recuperacion",
    layout: DefaultLayout,
    component: CamaForm
  },
  {
    path: "/editar-cama-recuperacion/:id",
    layout: DefaultLayout,
    component: CamaForm
  }
];

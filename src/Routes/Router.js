import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminHomePage from "../pages/AdminHomePage";
import ApplicationFormPage from "../pages/ApplicationFormPage";
import LoginPage from "../pages/LoginPage";
import HomePages from "../pages/HomePages";
import ListTripsPage from "../pages/ListTripsPages";
import TripDetailsPage from "../pages/TripDetailsPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <HomePages />
        </Route>

        <Route exact path='/trips/list'>
          <ListTripsPage />
        </Route>

        <Route exact path='/admin/trips/list'>
          <AdminHomePage />
        </Route>

        <Route exact path='/login'>
          <LoginPage />
        </Route>

        <Route exact path='/trips/application'>
          <ApplicationFormPage />
        </Route>

        <Route exact path='/admin/trips/:id'>
          <TripDetailsPage />
        </Route>

        <Route>
          <div>Página não encontrada</div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

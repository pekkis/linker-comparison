/** @jsx jsx */
import { lazy, Suspense } from "react";
import { Box, jsx } from "theme-ui";
import { FC, useEffect } from "react";
import url from "../assets/trollo.png";
import { useStore } from "../services/state";
import { Switch, Route } from "react-router";
// import IndexPage from "./IndexPage";
import Spinner from "./Spinner";
import Error from "./Error";

const IndexPage = lazy(() => import("./IndexPage"));
const PersonPage = lazy(() => import("./PersonPage"));

const App: FC = () => {
  const persons = useStore((store) => store.persons);
  const firePerson = useStore((store) => store.firePerson);
  const hirePerson = useStore((store) => store.hirePerson);
  const getPersons = useStore((store) => store.getPersons);
  const isLoading = useStore((state) => state.loadingCount > 0);

  useEffect(() => {
    getPersons();
  }, [getPersons]);

  return (
    <Box as="main" p={2}>
      {isLoading && <Spinner />}

      <h1>
        <img alt="Trollo" src={url} />
        Trollo Giga ERP
      </h1>

      <Error>
        Oh noesss! Your duckling can't handle the intensiveeeeeeee suckling!
      </Error>

      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Suspense fallback={<div>laddare</div>}>
                <IndexPage
                  firePerson={firePerson}
                  hirePerson={hirePerson}
                  persons={persons}
                />
              </Suspense>
            );
          }}
        />

        <Route
          exact
          path="/person/:id"
          render={(props) => {
            const personId = props.match.params.id;
            const person = persons.find((p) => p.id === personId);

            return (
              <Suspense fallback={<div>laddare</div>}>
                <PersonPage person={person} />
              </Suspense>
            );
          }}
        />
        <Route
          render={() => {
            return <section>NOT FOUND</section>;
          }}
        />
      </Switch>
    </Box>
  );
};

export default App;

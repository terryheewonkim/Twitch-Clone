import { Router, Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import history from "./history";
import Header from "./components/Header";
import StreamCreate from "./components/streams/StreamCreate";
import StreamDelete from "./components/streams/StreamDelete";
import StreamEdit from "./components/streams/StreamEdit";
import StreamList from "./components/streams/StreamList";
import StreamShow from "./components/streams/StreamShow";

function App() {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const ProtectedRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() => {
          return isSignedIn ? children : <Redirect to="/" />;
        }}
      />
    );
  };

  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={StreamList} />
          <ProtectedRoute path="/streams/new">
            <StreamCreate />
          </ProtectedRoute>
          <ProtectedRoute path="/streams/edit/:id">
            <StreamEdit />
          </ProtectedRoute>
          <ProtectedRoute path="/streams/delete/:id">
            <StreamDelete />
          </ProtectedRoute>
          <Route path="/streams/:id" component={StreamShow} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

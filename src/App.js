import {
  HashRouter as Router, Link, Route, Switch
} from 'react-router-dom';
import './App.css';
import AllQueues from './pages/AllQueues';
import Home from './pages/Home';
import SingleQueue from './pages/SingleQueue';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <h1>
            <Link to="/">queue</Link>
          </h1>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/queues/new">
            Create a new office hour
          </Route>
          <Route path="/queues/:qid" component={SingleQueue} />
          <Route path="/queues" component={AllQueues} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

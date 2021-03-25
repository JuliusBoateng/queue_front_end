import {
  HashRouter as Router, Link, Route, Switch
} from 'react-router-dom';
import './App.css';
import AllQueues from './pages/AllQueues';
import EditQueue from './pages/EditQueue';
import Home from './pages/Home';
import SingleQueue from './pages/SingleQueue';

function App() {
  return (
    <Router>
        <div class = "jumbotron jumbotron-fluid banner">
          <div class = "container text-center text-white">
            <h1 id="queue">
              <Link to="/">queue</Link>
            </h1>
          </div>
        </div>
        
        <div class="container h-75">
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/queues/new" component={EditQueue} />
            <Route path="/queues/:qid" component={SingleQueue} />
            <Route path="/queues" component={AllQueues} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Post from './components/Post';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Post} path="/post/:slug" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

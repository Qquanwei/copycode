import Editor from './Editor';
import './App.css';

function App() {
  return (
      <div className="App">
          <h1>Copy Code</h1>
          <header className="App-header">
              <Editor />
              <img alt="" src={require('./screenshot.png').default}/>
          </header>
      </div>
  );
}

export default App;

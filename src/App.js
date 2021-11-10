import Editor from './Editor';
import './App.css';

function App() {
  return (
      <div className="App">
          <h1>Copy My Code</h1>
          <header className="App-header">
              <div className="left">
                  <Editor />
              </div>
              <div className="right"></div>
          </header>
      </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import AllRoutes from './components/AllRoutes';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div className="header">
        <div>TASK MANAGER</div>
      </div>
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;

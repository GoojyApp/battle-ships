
import MainScreen from '../components/main-screen/MainScreen';
import AppNavbars from '../components/app-navbars/AppNavbars';
import './App.scss';


function App() {
  return (
      <div className="app">
        <AppNavbars/>
        <MainScreen/>
      </div>
  );
}

export default App;

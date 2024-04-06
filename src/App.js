import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import ViewExpenses from './components/ViewExpenses';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
       <Route path='/' element={<Login />} ></Route>
       <Route path='/viewexpenses' element={<ViewExpenses />}></Route>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

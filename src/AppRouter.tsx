
import { BrowserRouter as Router, Route, BrowserRouter, Routes,  } from 'react-router-dom';
import { LoginApp } from './pages/login';
import { MeTasksApp } from './pages/me-tasks';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register"  Component={LoginApp} /> 
        <Route path="/me-tasks"  Component={MeTasksApp} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

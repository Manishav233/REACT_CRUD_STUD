import './App.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { UserProvider } from './Usercontext';
import { useState } from 'react';
import StudentForm from './StudentForm';
import StudentView from './StudentView';
import StudentEdit from './StudentEdit';
import StudentInfo from './StudentInfo';
import TeacherInfo from './TeacherInfo';
import TeacherForm from './TeacherForm';
import TeacherView from './TeacherView';
import TeacherEdit from './TeacherEdit';

function App() {

  const  [users,setUsers] = useState([]);

  return (
    <BrowserRouter>
      <div id='wrapper'>
        <UserProvider value={{users,setUsers}}>
          <Sidebar />
          <div id='content-wrapper' className='d-flex flex-column'>
            <div id='content'>
              <Navbar />
              <div className='text-center d-flex align-item-center'>
              </div>
              <div className='container-fluid'>
                <Routes>
                  <Route path="/students-info" element={<StudentInfo />} />
                  <Route path="/teachers-info" element={<TeacherInfo />} />
                  <Route path="/form" element={<StudentForm />} />
                  <Route path="/teacher-form" element={<TeacherForm />} />
                  <Route path="/user-view/:id" element={<StudentView />} />
                  <Route path="/user-edit/:id" element={<StudentEdit />} />
                  <Route path="/teacher-view/:id" element={<TeacherView />} />
                  <Route path="/teacher-edit/:id" element={<TeacherEdit />} />
                </Routes>
              </div>
            </div>
          </div>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

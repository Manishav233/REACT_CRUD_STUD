import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import UserContext from './Usercontext'
import axios from 'axios';

function TeacherView() {

  // const userContext = useContext(UserContext)
  let params = useParams()

  const [teacher,setTeacher] = useState({})

  useEffect(()=>{
      async function fetchData(){
        try{
          const response = await axios.get(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/teachers/${params.id}`)
        setTeacher(response.data)
        }catch{
          console.log("data Error")
        }
      }
      fetchData()
  },[])


  return (
    <div>
      <h1 className='text-center font-weight-bold text-dark'>Teacher Info</h1>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead className="text-center">
              <tr>
                <th className='h4 text-dark'>Name</th>
                <th className='h4 text-dark'>Department</th>
                <th className='h4 text-dark'>Age</th>
                <th className='h4 text-dark'>Salary</th>
                <th className='h4 text-dark'>Qualification</th>
              </tr>
            </thead>
            <tbody>
              <td className='text-center h5 text-capitalize'>{teacher.name}</td>
              <td className='text-center h5 text-uppercase'>{teacher.department}</td>
              <td className='text-center h5 text-capitalize'>{teacher.age}</td>
              <td className='text-center h5 text-capitalize'>{teacher.salary}</td>
              <td className='text-center h5 text-capitalize'>{teacher.qualification}</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TeacherView
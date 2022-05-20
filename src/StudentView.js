import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import UserContext from './Usercontext'
import axios from 'axios';

function StudentView() {

  // const userContext = useContext(UserContext)
  let params = useParams()
  const [user,setUser] = useState({})

  useEffect(()=>{
      async function fetchData(){
        try{
          const response = await axios.get(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/students/${params.id}`)
        setUser(response.data)
        }catch{
          console.log("data Error")
        }
      }
      fetchData()
  },[])


  return (
    <div>
      <h1 className='text-center font-weight-bold text-dark'>Student Info</h1>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
            <thead className="text-center">
              <tr>
                <th className='h4 text-dark'>Name</th>
                <th className='h4 text-dark'>Roll Number</th>
                <th className='h4 text-dark'>DOB</th>
                <th className='h4 text-dark'>Age</th>
                <th className='h4 text-dark'>Grade</th>
              </tr>
            </thead>
            <tbody>
              <td className='text-center h5 text-capitalize'>{user.name}</td>
              <td className='text-center h5 text-capitalize'>{user.rollnumber}</td>
              <td className='text-center h5 text-capitalize'>{user.dob}</td>
              <td className='text-center h5 text-capitalize'>{user.age}</td>
              <td className='text-center h5 text-capitalize'>{user.grade}</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StudentView
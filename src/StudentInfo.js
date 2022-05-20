import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
// import UserContext from './Usercontext';
import swal from "sweetalert";

function StudentInfo() {

    const [userData, setUsersData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                let users = await axios.get("https://625683506ea70370053ab8bc.mockapi.io/student/v1/students")
                setUsersData(users.data)
            } catch {
                console.log("error")
            }
        }

        fetchData();
    }, [])

    const deleteUser = (id) => {
        swal({
            title: "Delete the Student ?",
            text: "Once You Deleted You can't Recover it !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/students/${id}`)
                    .then(() => {
                        getData();
                    });

                swal("Student has been deleted !", {
                    icon: "success",
                });
            } else {
                swal({
                    title:"Student Has Not Deleted!",
                    icon : "error"
                });
            }
        });
    };

    const getData = () => {
        axios.get(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/students/`)
            .then((getData) => {
                setUsersData(getData.data);
            });
    };

    // const userContext = useContext(UserContext);

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0  font-weight-bold text-success">Students</h1>
                <Link
                    className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
                    to={"/form"}
                >
                    <i className="fa-sm text-white-50"></i> Create Student
                </Link>
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0  text-dark">
                        Students Informations
                    </h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-light table-striped"
                            id="dataTable"
                            width="100%"
                            cellSpacing="0"
                        >
                            <thead className="text-center">
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Name</th>
                                    <th>Roll Number</th>
                                    <th>DOB</th>
                                    <th>Age</th>
                                    <th>Grade</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* maping array data into table */}
                                {userData.map((student, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* <td className='text-center'>{data.id}</td> */}
                                            <td className='text-center text-dark text-capitalize'>{student.name}</td>
                                            <td className='text-center text-dark text-capitalize'>{student.rollnumber}</td>
                                            <td className='text-center text-dark text-capitalize'>{student.dob}</td>
                                            <td className='text-center text-dark text-capitalize'>{student.age}</td>
                                            <td className='text-center text-dark text-capitalize'>{student.grade}</td>
                                            <td className="text-center ">
                                                <Link to={`/user-view/${student.id}`} type="button" class="btn btn-warning"> View </Link>
                                                <Link to={`/user-edit/${student.id}`} type="button" class="btn btn-primary m-1"> Edit </Link>
                                                <button onClick={() => deleteUser(student.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentInfo
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
// import UserContext from './Usercontext';
import swal from "sweetalert";

function TeacherInfo() {

    const [teacherData, setTeachersData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                let users = await axios.get("https://625683506ea70370053ab8bc.mockapi.io/student/v1/teachers")
                setTeachersData(users.data)
            } catch {
                console.log("error")
            }
        }

        fetchData();
    }, [])

    const deleteTeacher = (id) => {
        swal({
            title: "Remove the Teacher ?",
            text: "Once You Deleted You can't Recover it !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/teachers/${id}`)
                    .then(() => {
                        getData();
                    });

                swal("Teacher has been deleted !", {
                    icon: "success",
                });
            } else {
                swal({
                    title: "Teacher Has Not Deleted!",
                    icon: "error"
                });
            }
        });
    };

    const getData = () => {
        axios.get(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/teachers/`)
            .then((getData) => {
                setTeachersData(getData.data);
            });
    };

    // const userContext = useContext(UserContext);

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0  font-weight-bold text-success">Teachers</h1>
                <Link
                    className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"
                    to={"/teacher-form"}
                >
                    <i className="fa-sm text-white-50"></i> Create Teacher
                </Link>
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0  text-dark">
                        Teachers Informations
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
                                    <th className='text-capitalize'>Name</th>
                                    <th className='text-capitalize'>Department</th>
                                    <th className='text-capitalize'>age</th>
                                    <th className='text-capitalize'>salary</th>
                                    <th className='text-capitalize'>Qualifications</th>
                                    <th className='text-capitalize'>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* maping array data into table */}
                                {teacherData.map((teacher, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* <td className='text-center'>{data.id}</td> */}
                                            <td className='text-center text-dark text-capitalize'>{teacher.name}</td>
                                            <td className='text-center text-dark text-uppercase'>{teacher.department}</td>
                                            <td className='text-center text-dark text-capitalize'>{teacher.age}</td>
                                            <td className='text-center text-dark text-capitalize'>{teacher.salary}</td>
                                            <td className='text-center text-dark text-capitalize'>{teacher.qualification}</td>
                                            <td className="text-center ">
                                                <Link to={`/teacher-view/${teacher.id}`} type="button" class="btn btn-warning"> View </Link>
                                                <Link to={`/teacher-edit/${teacher.id}`} type="button" class="btn btn-primary m-1"> Edit </Link>
                                                <button onClick={() => deleteTeacher(teacher.id)} className="btn btn-danger">Delete</button>
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

export default TeacherInfo
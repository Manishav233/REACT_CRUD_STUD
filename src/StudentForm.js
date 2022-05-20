import React, { useContext } from 'react'
import { useFormik } from 'formik'
import UserContext from './Usercontext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function StudentForm() {
    const navigate = useNavigate()

    let userContext = useContext(UserContext);

    let formik = useFormik({
        initialValues: {
           name : "",
           rollnumber : "",
           dob : "",
           age :  0,
           grade : "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = "Enter Your Name"
            }
            if (!values.rollnumber) {
                errors.rollnumber = "Enter Your Exam Number"
            }
            if (!values.dob) {
                errors.dob = "Enter Your Date of Birth"
            }
            if (!values.age) {
                errors.age = "Age is Required"
            }
            if(!values.grade){
                errors.grade="Enter Your Grade"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await axios.post("https://625683506ea70370053ab8bc.mockapi.io/student/v1/students", values)
                userContext.setUsers([...userContext.users, values])
                navigate("/students-info", { replace: true })

            } catch {
                console.log("error")
            }
        }
    })

    let userCreated = () => {

        swal({
            title: "User Created",
            icon: "success"
        });
    }
    return (
        <div className="container">
            <h1 className="text-center">Student Informations</h1>
            <form className="row g-3" onSubmit={formik.handleSubmit}>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="username" className="form-label text-dark">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="name"
                        name="name"
                        required
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        style={{ border: formik.values.name !== "" ? "1px solid green" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.name}</span>
                </div>
                <div className="col-lg-6 mb-2  ">
                    <label htmlFor="username" className="form-label  text-dark">
                        Roll Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="rollnumber"
                        name="rollnumber"
                        required
                        value={formik.values.rollnumber}
                        onChange={formik.handleChange}
                        style={{ border: formik.values.rollnumber!== "" ? "1px solid green" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.rollnumber}</span>
                </div>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="inputEmail4" className="form-label  text-dark">
                        Date of Birth
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-label='dob'
                        name="dob"
                        required
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        style={{ border: formik.values.dob !== "" ? "1px solid green" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.dob}</span>
                </div>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="inputEmail4" className="form-label  text-dark">
                        Age
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-label='age'
                        name="age"
                        required
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        style={{ border: formik.values.age !== "" ? "1px solid green" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.age}</span>
                </div>  
                <div className="col-lg-12 mb-4">
                    <label htmlFor="inputEmail4" className="form-label  text-dark">
                        Grade
                    </label>
                    <input type="text"
                        className="form-control text-center"
                        aria-label='Position'
                        name="grade"
                        required
                        value={formik.values.grade}
                        onChange={formik.handleChange}
                        style={{ border: formik.values.grade !== "" ? "1px solid green" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.grade}</span>
                </div>
                <div className="col-12 d-flex justify-content-center">
              
                    <button 
                    disabled={!formik.isValid}
                    onClick={() => userCreated()} type="submit" className="btn btn-lg btn-success">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default StudentForm
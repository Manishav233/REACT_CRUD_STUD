import React, { useContext } from 'react'
import { useFormik } from 'formik'
import UserContext from './Usercontext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function TeacherForm() {
    const navigate = useNavigate()

    let userContext = useContext(UserContext);

    let formik = useFormik({
        initialValues: {
            name: "",
            department: "",
            age: 0,
            salary: 0,
            qualification: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = "Enter Your Name Here"
            }
            if (!values.department) {
                errors.department = "Which Department You are ?"
            }
            if (!values.age) {
                errors.age = "Enter Your Age Here ?"
            }
            if (!values.salary) {
                errors.salary = "Enter Your Salary Here"
            }
            if (!values.qualification) {
                errors.qualification = "Enter Your Qualifications"
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await axios.post("https://625683506ea70370053ab8bc.mockapi.io/student/v1/teachers", values)
                userContext.setUsers([...userContext.users, values])
                navigate("/teachers-info", { replace: true })

            } catch {
                console.log("error")
            }
        }
    })

    let teacherCreated = () => {

        swal({
            title: "User Created",
            icon: "success"
        });
    }
    return (
        <div className="container">
            <h1 className="text-center">Teacher Informations</h1>
            <form className="row g-3" onSubmit={formik.handleSubmit}>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="username" className="form-label text-dark">
                        Teacher Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="name"
                        name="name"
                        required
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        style={{ border: formik.values.name !== "" ? "1px solid limegreen" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.name}</span>
                </div>
                <div className="col-lg-6 mb-2  ">
                    <label htmlFor="username" className="form-label  text-dark">
                        Department
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="department"
                        name="department"
                        required
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        style={{ border: formik.values.department !== "" ? "1px solid limegreen" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.department}</span>
                </div>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="inputEmail4" className="form-label  text-dark">
                        Age
                    </label>
                    <input type="number"
                        className="form-control"
                        aria-label='age'
                        name="age"
                        required
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        // style={{ border: formik.values.age !== "" ? "1px solid limegreen" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.age}</span>
                </div>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="inputEmail4" className="form-label  text-dark">
                        Salary
                    </label>
                    <input type="number"
                        className="form-control"
                        aria-label='salary'
                        name="salary"
                        required
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                        // style={{ border: formik.values.salary !== "" ? "1px solid limegreen" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.salary}</span>
                </div>
                <div className="col-lg-12 mb-4">
                    <label htmlFor="inputEmail4" className="form-label  text-dark">
                        Qualification
                    </label>
                    <input type="text"
                        className="form-control text-center"
                        aria-label='qualificaiton'
                        name="qualification"
                        required
                        value={formik.values.qualification}
                        onChange={formik.handleChange}
                        style={{ border: formik.values.qualification !== "" ? "1px solid limegreen" : "" }}
                    />
                    <span style={{ color: "red" }}>{formik.errors.qualification}</span>
                </div>
                <div className="col-12 d-flex justify-content-center">

                    <button
                        disabled={!formik.isValid}
                        onClick={() => teacherCreated()} type="submit" className="btn btn-lg btn-success">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TeacherForm
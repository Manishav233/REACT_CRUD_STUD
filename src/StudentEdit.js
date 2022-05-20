import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'

function StudentEdit() {
    const navigate = useNavigate()

    let params = useParams()
    let formik = useFormik({
        initialValues: {
            name: "",
            rollnumber: "",
            dob: "",
            age: 0,
            grade: ""
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = "Enter Your Name Here"
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
            await axios.put(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/students/${params.id}`, values)
            navigate("/students-info",{replace: true})
        }
    })
    useEffect(() => {
        async function fetchData(){
            try {
                let user = await axios.get(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/students/${params.id}`)
                formik.setValues(user.data);
            } catch (error) {
            console.log(error);
            }    
        }
        fetchData();
    },[])

    let changesSaved = () => {
        swal({
            title : "Student Updated",
            icon : "success"
        })
    }
    return (
        <div className="container mt-5">
            {/* <h1 className="text-center">Edit User Details</h1> */}
            <form className="row g-3" onSubmit={formik.handleSubmit}>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="username" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.name ? "1px solid red" : "1px solid green"}}
                    />
                </div>
                <div className="col-lg-6">
                    <label htmlFor="username" className="form-label">
                        Roll Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="rollnumber"
                        name="rollnumber"
                        value={formik.values.rollnumber}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.rollnumber ? "1px solid red" : "1px solid green"}}
                    />
                </div>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="inputEmail4" className="form-label">
                        Date of Birth
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-label='dob'
                        name="dob"
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.dob ? "1px solid red" : "1px solid green"}}
                    />
                </div>
                <div className="col-lg-6 mb-4">
                    <label htmlFor="inputPassword4" className="form-label">
                        Age
                    </label>
                    <input type="number"
                        className="form-control"
                        name="age"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.age ? "1px solid red" : "1px solid green"}}
                    />
                </div>
                <div className="col-lg-12 mb-4">
                    <label htmlFor="inputPassword4" className="form-label">
                        Grade
                    </label>
                    <input type="text"
                        className="form-control text-center text-capitalize"
                        name="grade"
                        value={formik.values.grade}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.grade ? "1px solid red" : "1px solid grey"}}
                    />
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <button disabled={!formik.isValid} onClick={()=>changesSaved()} type="submit" className="btn btn-lg btn-success">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}

export default StudentEdit
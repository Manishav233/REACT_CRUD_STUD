import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'

function TeacherEdit() {
    const navigate = useNavigate()

    let params = useParams()
    let formik = useFormik({
        initialValues: {
            name: "",
            department: "",
            age: "",
            age: 0,
            qualification: ""
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = "Enter Your Name"
            }
            if (!values.department) {
                errors.department = "Enter Your Exam Number"
            }
            if (!values.age) {
                errors.age = "Enter Your Date of Birth"
            }
            if (!values.salary) {
                errors.salary = "Age is Required"
            }
            if(!values.qualification){
                errors.qualification="Enter Your qualification"
            }
            return errors;
        },
        onSubmit: async (values) => {
            await axios.put(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/teachers/${params.id}`, values)
            navigate("/teachers-info",{replace: true})
        }
    })
    useEffect(() => {
        async function fetchData(){
            try {
                let user = await axios.get(`https://625683506ea70370053ab8bc.mockapi.io/student/v1/teachers/${params.id}`)
                formik.setValues(user.data);
            } catch (error) {
            console.log(error);
            }    
        }
        fetchData();
    },[])

    let changesSaved = () => {
        swal({
            title : "Updated",
            icon : "success"
        })
    }
    return (
        <div className="container mt-5">
            {/* <h1 className="text-center">Edit User Details</h1> */}
            <form className="row g-3" onSubmit={formik.handleSubmit}>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="username" className="form-label">
                        Teacher Name
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
                        Department
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="department"
                        name="department"
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.department ? "1px solid red" : "1px solid green"}}
                    />
                </div>
                <div className="col-lg-6 mb-2">
                    <label htmlFor="inputEmail4" className="form-label">
                        Age
                    </label>
                    <input type="text"
                        className="form-control"
                        aria-label='age'
                        name="age"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.age ? "1px solid red" : "1px solid green"}}
                    />
                </div>
                <div className="col-lg-6 mb-4">
                    <label htmlFor="inputPassword4" className="form-label">
                        Salary
                    </label>
                    <input type="number"
                        className="form-control"
                        name="salary"
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.age ? "1px solid red" : "1px solid green"}}
                    />
                </div>
                <div className="col-lg-12 mb-4">
                    <label htmlFor="inputPassword4" className="form-label">
                        Qualification
                    </label>
                    <input type="text"
                        className="form-control text-center text-capitalize"
                        name="qualification"
                        value={formik.values.qualification}
                        onChange={formik.handleChange}
                        // style={{border: formik.errors.qualification ? "1px solid red" : "1px solid grey"}}
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

export default TeacherEdit
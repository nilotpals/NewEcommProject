import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Axios from 'axios';

function Register()
{
    const history = useNavigate();
    const initialValues = {fullname: "",email: "",password: "",repassword: ""};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const apiurl = "http://localhost:5000/";

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormValues({...formValues,[name] : value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateFormValue(formValues));
        setIsSubmit(true); 
    }

    const validateFormValue = (values) => {
        const errors = [];
        if(!values.fullname)
        {
            errors.fullname = "Full name is required";
        }
        if(!values.email)
        {
            errors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        if(!values.password)
        {
            errors.password = "Password is required";
        }
        if(!values.repassword)
        {
            errors.repassword = "Password is required";
        }
        if(values.password !== '' && values.repassword !== '' && values.password !== values.repassword)
        {
            errors.repassword = "Password is mismatch";
        }
        return errors;
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit)
        {
            submitDetails();
        /*    const formData = {"fullname": formValues.fullname,"email" : formValues.email, "password" : formValues.password};
            Axios.post(apiurl+"users/registration",formData).then((result) => {
                console.log(result.data);
            }); */
        }
    },[formErrors]); 

    const submitDetails = async () => {
 
        var sendValue = {fullname: formValues.fullname,email: formValues.email,password: formValues.password};
        try{
            let result = await fetch(apiurl+"users/registration",{
                method: "post",
                body: JSON.stringify(sendValue),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            result = await result.json();
            history("/login");
        } catch (e){
            console.log("Not Registered");
        }
       
    } 

    return (
        <body className="hold-transition register-page">
        <div className="register-box">
            <div className="register-logo">
                <Link to="/home"><b>Admin</b>LTE</Link>
            </div>

            <div className="card">
                <div className="card-body register-card-body">
                <p className="login-box-msg">Register a new membership</p>

                <form action="/#" onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Full name" name="fullname" value={formValues.fullname} onChange={handleChange}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <p style={{color:'red'}}>{formErrors.fullname}</p>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email" name="email" value={formValues.email} onChange={handleChange}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <p style={{color:'red'}}>{formErrors.email}</p>
                    <div className="input-group mb-3">
                    <input type="password" className="form-control" placeholder="Password" name="password" value={formValues.password} onChange={handleChange}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <p style={{color:'red'}}>{formErrors.password}</p>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Retype password" name="repassword" value={formValues.repassword} onChange={handleChange}/>
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <p style={{color:'red'}}>{formErrors.repassword}</p>
                    <div className="row">
                    <div className="col-4">
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </div>
                    </div>
                </form>

                </div>
            </div>
        </div>
        </body>
    )
}

export default Register;
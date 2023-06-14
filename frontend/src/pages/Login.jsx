import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

function Login()
{
    const history = useNavigate();
    const initialValues = {email: "",password: ""};
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
        
        return errors;
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit)
        {
            submitDetails();
        }
    },[formErrors]); 

    const submitDetails = async () => {
        try{
            let result = await fetch(apiurl+"users/login",{
                method: "post",
                body: JSON.stringify(formValues),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            result = await result.json();
         //   console.log(result);
         //   history("/home");
        } catch (e){
            console.log("Invalid username or password");
        }
    }

    return (
        <body className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to="/home"><b>Admin</b>LTE</Link>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form action="/#" onSubmit={handleSubmit}>
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
                        <div className="row">
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Login;
import { useContext, useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";


export default function Register() {

    const { setToken } = useContext(AppContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({

        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({})

   async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "post",
            body: JSON.stringify(formData),
        });

        const data = await res.json()

        if (data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
           console.log(data);
        }

       
    }

    return (
        <>
        <h1 className="title">Register a new account</h1>
       

        <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">

            <div>
                <input 
                type="text" 
                placeholder="Username" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value })}
                />
                {errors.username && <p className="error">{errors.username[0]}</p>}
            </div>

            <div>
                <input type="text" placeholder="Firstname" 
                 value={formData.firstname}
                 onChange={(e) => setFormData({...formData, firstname: e.target.value })}
                
                />
                {errors.firstname && <p className="error">{errors.firstname[0]}</p>}
            </div>

            <div>
                <input type="text" placeholder="Lastname"
                 value={formData.lastname}
                 onChange={(e) => setFormData({...formData, lastname: e.target.value })}
                
                />
                {errors.lastname && <p className="error">{errors.lastname[0]}</p>}
            </div>            

            <div>
                <input type="text" placeholder="Email" 
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value })}
                
                />
                {errors.email && <p className="error">{errors.email[0]}</p>}
            </div>

            <div>
                <input type="password" placeholder="Password" 
                 value={formData.password}
                 onChange={(e) => setFormData({...formData, password: e.target.value })}
                
                />
                {errors.password && <p className="error">{errors.password[0]}</p>}
            </div>

            <div>
                <input type="password" placeholder="Confirm Password" 
                 value={formData.password_confirmation}
                 onChange={(e) => setFormData({...formData, password_confirmation: e.target.value })
                }
                
                />
            </div>

            <button className="primary-btn">Register</button>
        </form>
        </>
    );
}
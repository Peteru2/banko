import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/image/Logo.png"
import SideView from "../component/sideView";
import { useNavigate } from 'react-router-dom';



const Login = () => {

const navigate = useNavigate();
const [success, setSuccess] = useState()
const [icon, setIcon] = useState(false)
const [formMessage, setFormMessage] =useState("chess")

const handleSuccess = () =>{
        setSuccess(false);
        close()
        setIcon(false)
}
const handleRetry = () => {
    setSuccess(false);
    setIcon(false)
    setFormMessage("")

  };
    const [formData, setFormData] = useState({
    
        email: '',
        password:'',

      });
    
      const [errors, setErrors] = useState({
       
        email: '',
        password:'',
      });
    
      const handleInputChange = (e) => {
        // e.preventDefault();       
        
       const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSubmit = (e) =>{
            e.preventDefault();
      const newErrors = {};
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    

    //   console.log(formData)
            
                 if (!formData.email.trim()) {
                    newErrors.email = 'Email is required';
                } else if (!emailRegex.test(formData.email)) {
                    newErrors.email = 'Invalid email format';
                }
                else if(!formData.password.trim()){
                    newErrors.password = 'Password is required';
                }
                else if(formData.password.length < 8){
                    newErrors.password = 'Password must not be less than 8 characters';
                }
                else {
                    setIcon(true)
                    axios.post('http://localhost:8000/Login', formData)
                    .then(response => {
                        const { token } = response.data;
                        localStorage.setItem('token', token);
                            console.log(response.data.token)
                                toast.success(response.data.message, {
                                    position: "top-right",
                                  }); 
                                  navigate('/')
                        setFormData({
                            email: '',
                            password:'',
                        })
                    })
                    .catch(error => {   
                        if (error.response) {
                            
                            if (error.response.status === 404) {
                                toast.error(error.response.data.message, {
                                    position: "top-right",
                                  }); 
                            } else if (error.response.status === 401) {
                                toast.error(error.response.data.message, {
                                    position: "top-right",
                                  }); 
                            } else {
                                toast.error(error.response.data.message, {
                                    position: "top-right",
                                  }); 
                            }
                          } else if (error.request) {
                            // The request was made but no response was received
                            console.log('No response received from server');
                          } else {
                            // Something else happened while setting up the request
                            console.log('Error:', error.message);
                          }
                        setSuccess(true)
                        setFormMessage(error.message)

                    });
                }

                setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
                setErrors({});
            }
      }
    return ( 
                <>
                <div className="flex">
                    <section className="mx-10 h-screen   flex  items-center ">
                        <div>
                        <div>
                        <h2 className="text-[26px] text-private font-bold  flex  font-playfair">
                                <img src={Logo} className="w-8 mr-2" alt="banko Logo" />
                                Banko.</h2>
                        </div>
                        <form onSubmit={handleSubmit}  className={`font-roboto w-[350px]  text-black`}>
                            <div className="flex  ">
                                <div>
                            <h2 className="my-2 text-black font-roboto text-private text-[28px]">Log in to your account</h2>
                            <h2 className="my- text-black font-roboto font-bold  text-public text-opacity-80 text-[16px]">Don't have an account? <span className="text-blue"><Link to={'/SignUp'}>Sign Up</Link></span></h2>
                            </div>
                            <button className="ml-auto cursor-pointer" onClick={(e) => { e.preventDefault(); close(); }}><i className="fa fa-times"></i></button>
                            </div>
                        
                           

                            <div className="mb-6 mt-10">  
                            <label className="  label flex text-[14px] font-bold">
                            <span>Email</span> <span className={`ml-auto text-red text-[14px] ${errors.email? "blink-error":""}`}> {errors.email}</span>
                        </label> 
                                <div className="flex items-center border border-gray rounded-[5px] px-3  mt-1 py-2">
                               
                                <input type="Email" 
                                name="email"
                                value={formData.email} 
                                onChange={handleInputChange}
                                className="w-full outline-none text-black" p/>
                                </div>
                            </div>

                    

                            <div className="mb-6">  
                            <label className=" label flex text-[14px] font-bold">
                            <span>Password</span> <span className={`ml-auto text-red text-[14px] ${errors.password? "blink-error":""}`}> {errors.password}</span>
                        </label> 
                        <div className="flex items-center border border-gray rounded-[5px] px-3 mt-1  py-2">
                               
                               <input type="text" 
                               name="password"
                               value={formData.password}
                               onChange={handleInputChange}
                               className="w-full outline-none text-black"  />
                               </div>
                            </div>

                            <button  type="submit"  className="bg-gray border-[1px]  mt-4 border-private bg-opacity-30 hover:bg-opacity-90  text-white  py-1 px-3 rounded-md ">{icon ?( <span>Submitting <i className="fas fa-spinner fa-spin"></i></span>):( <span className="text-private">Submit</span>  )}</button>
                                
                        </form>
                        <div > 
                        <h2 className={`mb-2 font-bold ${formMessage && formMessage.includes("Error") ? "text-red" : "hidden text-black"}`}>
                        {formMessage}
                                 </h2>
                                 <h2 className={`mb-2 font-bold ${formMessage && formMessage.includes("Success") ? "text-green" : "text-black hidden"}`}>
                        {formMessage}
                                 </h2>
                        
                        <button className={`bg-private w-full border-[1px] text-white rounded-[4px]  mt-3 ${formMessage && formMessage.includes("Success") ? "text-green" : "hidden"}`} onClick={handleSuccess}>Close</button>
                        <button className={`border-gray border-[1px] rounded-[4px] w-[50px] ${formMessage && formMessage.includes("Error") ? "text-green" : "hidden"}`}  onClick={handleRetry}>Retry</button>

                    </div>
                    </div>
                    </section>
                    <SideView />
                    </div>

                    <ToastContainer />
                    
                </>
     );
}
 
export default Login;
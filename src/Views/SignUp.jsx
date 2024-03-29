import { useState } from "react";
import axios from "axios"
import Logo from "../assets/image/Logo.png"
import SideView from "../component/sideView";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import api from "../component/api";

const SignUp = () => {

const [icon, setIcon] = useState(false)
const [formMessage, setFormMessage] = useState("chess")
const [userId, setUserId] = useState('');
const [otp, setOtp] = useState('');

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
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password:'',

      });
    
      const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
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
      const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

            if (formData.firstname.trim()  === '' ) {
            newErrors.firstname = 'First name is required';
            }
            else if(formData.lastname.trim()  === '' ){
                newErrors.lastname = ' Las tname is required';
            }
                else if (!formData.email.trim()) {
                    newErrors.email = 'Email is required';
                } else if (!emailRegex.test(formData.email)) {
                    newErrors.email = 'Invalid email format';
                }
                else if (!formData.phoneNumber.trim()) {
                    newErrors.phoneNumber = 'Phone Number is required';
                } else if (!phoneRegex.test(formData.phoneNumber)) {
                    newErrors.phoneNumber = 'Invalid phone number format';
                }
                else if (formData.phoneNumber.length !== 11 ) {
                  newErrors.phoneNumber = 'Invalid phone number';
              }
                else if(!formData.password.trim()){
                    newErrors.password = 'Password is required';
                }
                else if(formData.password.length < 8){
                    newErrors.password = 'Password must not be less than 8 characters';
                }
                else {
                    console.log(formData)
                    setIcon(true)
                    axios.post('http://localhost:8000/SignUp', formData)
                    .then(response => {
                        setFormData({
                            firstname: '',
                            lastname:'',
                            email: '',
                            phoneNumber: '',
                            password:'',
                        })
                          console.log(response.data.user._id)
                          setUserId(response.data.user._id);
                          setIcon(false)
                    })
                    .catch(error => {
                        if (error.response) {

                             if (error.response.status === 401) {
                                toast.error(error.response.data.error, {
                                    position: "top-right",
                                  }); 
                              setIcon(false)

                            } else {
                                toast.error(error.response.data.error, {
                                    position: "top-right",
                                  }); 
                          setIcon(false)
                            }
                          } else if (error.request) {
                            console.log('No response received from server');
                             setIcon(false)
                          } else {
                            console.log('Error:', error.message);
                            setIcon(false)
                          }
                    });
                }
                setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
                setErrors({});
            }
      }

      
      const handleVerify = async () => {
        try {
         const response =  await api.post('/verifyOTP', { userId, otp });
          setUserId('');
          setOtp('');
          toast.success(response.data.message, {
            position: "top-right",
          });
        } catch (error) {
          toast.error(error.response.data.error, {
            position: "top-right",
          }); 
        }
      };
    return ( 
                <>
                <div className="flex">  
                    <section className="mx-10 h-screen  flex  items-center ">
                        <div>
                        <div>
                            <h2 className="text-[26px] text-private font-bold  flex  font-playfair">
                                <img src={Logo} className="w-8 mr-2" alt="banko Logo" />
                                Banko.</h2>
                        </div>
                        <form onSubmit={handleSubmit}  className={`font-roboto w-[350px] text-black`}>
                            <div className="flex  ">
                                <div>
                            <h2 className="my-2 text-black font-roboto text-private text-[28px]">Create your account</h2>
                            <h2 className="my- text-black font-roboto font-bold  text-public text-opacity-80 text-[16px]">Have an account? <span className="text-blue"><Link to={'/Login'}>Login in now</Link></span></h2>
                            </div>
                   
                            </div>
                        <div className="mb-3">  
                        
                        <label className=" mt-4 label flex text-[14px] font-bold">
                            <span><span className="text-red">*</span> Firstname</span> <span className={`ml-auto text-red text-[14px] ${errors.firstname? "blink-error":""}`}> {errors.firstname}</span>
                        </label> 
                                <div className="flex items-center border border-gray rounded-[5px] mt-1 px-3  py-2">
                               
                                <input type="text" className="w-full outline-none text-black"
                                
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                />
                                </div>
                            </div>

                            <div className="mb-3">  
                        
                        <label className=" mt-4 label flex text-[14px] font-bold">
                            <span><span className="text-red">*</span> Lastname</span> <span className={`ml-auto text-red text-[14px] ${errors.lastname? "blink-error":""}`}> {errors.lastname}</span>
                        </label> 
                      
                                <div className="flex items-center border border-gray rounded-[5px] mt-1 px-3  py-2">
                                <input type="text" className="w-full outline-none text-black"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                />
                                </div>
                            </div>

                            <div className="mb-3">  
                            <label className="  mt-4 label flex text-[14px] font-bold">
                            <span><span className="text-red">*</span> Email</span> <span className={`ml-auto text-red text-[14px] ${errors.email? "blink-error":""}`}> {errors.email}</span>
                        </label> 
                                <div className="flex items-center border border-gray rounded-[5px] px-3  mt-1 py-2">
                               
                                <input type="Email" 
                                name="email"
                                value={formData.email} 
                                onChange={handleInputChange}
                                className="w-full outline-none text-black" p/>
                                </div>
                            </div>

                            <div className="mb-3">  
                            <label className="  mt-4 label flex text-[14px] font-bold">
                            <span><span className="text-red">*</span> Phone Number</span> <span className={`ml-auto text-red text-[14px] ${errors.phoneNumber? "blink-error":""}`}> {errors.phoneNumber}</span>
                        </label> 
                                <div className="flex items-center border border-gray rounded-[5px] px-3 mt-1  py-2">
                               
                                <input type="text" 
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full outline-none text-black"  />
                                </div>
                            </div>

                            <div className="mb-3">  
                            <label className="  mt-4 label flex text-[14px] font-bold">
                            <span><span className="text-red">*</span> Password</span> <span className={`ml-auto text-red text-[14px] ${errors.password? "blink-error":""}`}> {errors.password}</span>
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
                                 <h2 className={`mb-2 font-bold ${formMessage && formMessage.includes("Successfully") ? "text-green" : "text-black hidden"}`}>
                        {formMessage}
                                 </h2>
                        
                        <button className={`bg-private w-full border-[1px] text-white rounded-[4px]  mt-3 ${formMessage && formMessage.includes("Successfully") ? "text-green" : "hidden"}`} onClick={handleSuccess}>Close</button>
                        <button className={`border-gray border-[1px] rounded-[4px] w-[50px] ${formMessage && formMessage.includes("Error") ? "text-green" : "hidden"}`}  onClick={handleRetry}>Retry</button>


                    </div>
                    {userId && (
                      <>
                      <div  className={ `font-roboto flex justify-center items-center  genModal font-roboto ${userId? "modal-show w-full":""}`} >
                        <div className="w-[400px]">
                        <h2 className="my-2">Please enter your OTP to verify your account</h2>

                        <input type="text"  className=" w-full  py-2 px-2 outline-none rounded-[8px] border-[1px] border-private " placeholder="Your OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <div className="bg-private rounded-[8px] cursor-pointer text-center mt-4 py-2 text-white">
                        <button onClick={handleVerify}>Verify OTP</button>
                        </div>
                        </div>
                        </div>
                      </>
                    )}
                    </div>
                    </section>
            <SideView />
                    </div>
                    <ToastContainer />
                    
                </>
     );
}
 
export default SignUp;
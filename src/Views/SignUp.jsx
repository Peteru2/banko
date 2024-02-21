import { useState } from "react";
import axios from "axios"
import Logo from "../assets/image/Logo.png"
import SideView from "../component/sideView";

const SignUp = () => {


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
   

    //   console.log(formData)
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
                        if(response.data.error == "Exist" ){
                            setFormMessage("Error:Email Already Exist")
                    }
                    else{
                        setFormMessage("Registration Successful")
                        setSuccess(true)
                    }
                       
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error:', error.message);
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
                            <h2 className="my-2 text-black font-roboto text-private text-[28px]">Log in to your account</h2>
                            <h2 className="my- text-black font-roboto font-bold text-[16px]">Don't have an account? Sign Up</h2>
                            </div>
                            <button className="ml-auto cursor-pointer" onClick={(e) => { e.preventDefault(); close(); }}><i className="fa fa-times"></i></button>
                            </div>
                        <div className="mb-3">  
                        
                        <label className=" mt-4 label flex text-[14px] font-bold">
                            <span>Firstname</span> <span className={`ml-auto text-red text-[14px] ${errors.firstname? "blink-error":""}`}> {errors.firstname}</span>
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
                            <span>Lastname</span> <span className={`ml-auto text-red text-[14px] ${errors.lastname? "blink-error":""}`}> {errors.lastname}</span>
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

                            <div className="mb-3">  
                            <label className="  mt-4 label flex text-[14px] font-bold">
                            <span>Phone Number</span> <span className={`ml-auto text-red text-[14px] ${errors.phoneNumber? "blink-error":""}`}> {errors.phoneNumber}</span>
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
                                 <h2 className={`mb-2 font-bold ${formMessage && formMessage.includes("Successfully") ? "text-green" : "text-black hidden"}`}>
                        {formMessage}
                                 </h2>
                        
                        <button className={`bg-private w-full border-[1px] text-white rounded-[4px]  mt-3 ${formMessage && formMessage.includes("Successfully") ? "text-green" : "hidden"}`} onClick={handleSuccess}>Close</button>
                        <button className={`border-gray border-[1px] rounded-[4px] w-[50px] ${formMessage && formMessage.includes("Error") ? "text-green" : "hidden"}`}  onClick={handleRetry}>Retry</button>

                    </div>
                    </div>
                    </section>

            <SideView />
                    </div>
                    
                </>
     );
}
 
export default SignUp;
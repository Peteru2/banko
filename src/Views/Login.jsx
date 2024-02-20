import { useState } from "react";
import axios from "axios"






const Login = ({close}) => {


const [success, setSuccess] = useState()
const [icon, setIcon] = useState(false)
const [formMessage, setFormMessage] =useState("chess")
const [isSelectionValid, setIsSelectionValid] = useState(false);

const handleSuccess = () =>{
        setSuccess(false);
        close()
        setIcon(false)
}
const handleRetry = () => {
    setSuccess(false);
    setIcon(false)

    // setFormMessage("");
  };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message:'',

      });
    
      const [errors, setErrors] = useState({
        name: '', 
        email: '',
        phoneNumber: '',
        message:'',
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

   
            if (formData.name.trim() === '') {

            newErrors.name = 'Name is required';
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
                else if(!formData.message.trim()){
                    newErrors.message = 'Message is required';
                }
                else {
                    setIcon(true)
                    axios.post('http://127.0.0.1/api/quoteform/submit', formData)
                    .then(response => {
                        // Handle success
                        console.log('Success:', response.data);
                        setFormData({
                            name: '',
                            email: '',
                            phoneNumber: '',
                            message:'',
                        })
                        console.log('Success:', response.message);

                        setFormMessage("Quote Submitted Successfully")

                        setSuccess(true)
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error:', error.message);
                        setSuccess(true)

                        setFormMessage(error.message)

                        // Display your error message here
                    });
                    
                  
                    // close()
                }
                setErrors(newErrors);
                console.log(formData)
            if (Object.keys(newErrors).length === 0) {
                setErrors({});
            }
      }
    return ( 
                <>
                    <section className="mx-10 flex  items-center ">
                        <div>
                        <div>
                            <h2 className="text-[20px] text-private font-bold    font-playfair">banko.</h2>
                        </div>
                        <form onSubmit={handleSubmit}  className={`font-roboto w-[350px] text-black ${success?"hidden":""}`}>
                            <div className="flex  ">
                                <div>
                            <h2 className="my-2 text-black font-roboto text-private text-[28px]">Log in to your account</h2>
                            <h2 className="my- text-black font-roboto font-bold text-[16px]">Don't have an account? Sign Up</h2>
                            </div>
                            <button className="ml-auto cursor-pointer" onClick={(e) => { e.preventDefault(); close(); }}><i className="fa fa-times"></i></button>
                            </div>
                        <div className="mb-6">  
                        
                        <label className=" mt-4 label flex text-[14px] font-bold">
                            <span>Name</span> <span className={`ml-auto text-red text-[14px] ${errors.name? "blink-error":""}`}> {errors.name}</span>
                        </label> 
                      
                                <div className="flex items-center border border-gray rounded-[5px] mt-1 px-3  py-2">
                               
                                <input type="text" className="w-full outline-none text-black"
                                
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                />
                                </div>
                            </div>

                            <div className="mb-6">  
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
                            <label className="label flex text-[14px] font-bold">
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

                            <div className="mb-6">  
                            <label className=" label flex text-[14px] font-bold">
                            <span>Your Message</span> <span className={`ml-auto text-red text-[14px] ${errors.message? "blink-error":""}`}> {errors.message}</span>
                        </label> 
                                <div className="flex items-center border border-gray rounded-[5px]  px-3 mt-1  py-2">
                               
                                <textarea type="text" name="message" 
                                className="w-full outline-none text-black" 
                                value={formData.message}
                                onChange={handleInputChange}
                               
                               />
                                </div>
                            </div>

                            <button  type="submit"  className="bg-gray border-[1px]  mt-4 border-private bg-opacity-30 hover:bg-opacity-90  text-white  py-1 px-3 rounded-md ">{icon ?( <span>Submitting <i class="fas fa-spinner fa-spin"></i></span>):( <span className="text-private">Submit</span>  )}</button>
                                
                        </form>
                        <div className= {`font-roboto text-black ${success?"":"hidden"}`}> 
                        <h2 className={`mb-2 font-bold ${formMessage && formMessage.includes("Error") ? "text-red" : "hidden text-black"}`}>
                        {formMessage}
                                 </h2>
                                 <h2 className={`mb-2 font-bold ${formMessage && formMessage.includes("Successfully") ? "text-green" : "text-black hidden"}`}>
                        {formMessage}
                                 </h2>
                        
                        <button className={`bg-private w-full border-[1px] text-white rounded-[4px]  mt-3 ${formMessage && formMessage.includes("Successfully") ? "text-green" : "hidden"}`} onClick={handleSuccess}>Close</button>
                        {/* <button className={`border-gray border-[1px] rounded-[4px] w-[50px] ${formMessage && formMessage.includes("Error") ? "text-green" : "hidden"}`}  onClick={handleRetry}>Retry</button> */}

                    </div>
                    </div>
                    </section>

                 
                    
                </>
     );
}
 
export default Login;
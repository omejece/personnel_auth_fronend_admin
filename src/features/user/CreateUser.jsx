
import { UseSelector, useDispatch } from "react-redux";
import { useCreateUserMutation, useGetUsersQuery } from "./userApiSlice";
import { useRef,useState,useEffect } from "react";
import { setUsers } from './userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QRCodeCanvas} from "qrcode.react";

const CreateUser = (props)=>{
     const qrRef = useRef();
     const [fName,setFName] = useState("");
     const [mName,setMName] = useState("");
     const [lName,setLName] = useState("");
     const [phone,setPhone] = useState("");
     const [email,setLEmail] = useState("");
     const [image,setImage] = useState("");
     const dispatch = useDispatch();
     const [createUser,{data:userCreateResp,isLoading: isUserCreateLoading,isSuccess:isUserCreated,isError: isUserCreateError}] = useCreateUserMutation();
     const { data:Users, isLoading: isUserLoading,isSuccess:isUserSucces, refetch: reloadUsers } = useGetUsersQuery();
     
     
     useEffect(()=>{
          if(isUserCreateError){
               alert(userCreateResp.message);
               toast.success('Success created');
          }

          if(isUserCreated){
               alert(userCreateResp.message);
               toast.success('Success created');
          }
     },[
        isUserCreated,
        isUserCreateError
     ]);



     const handleAddUser = async (e)=>{
        e.preventDefault();
        try{
             const result = await createUser({fName,lName,phone,email,image}).unwrap();
             if(result.success){
               reloadUsers();
               toast.success('Success created');
             }
             else{
               toast.error('unable to create');
             }
        }
        catch(err){
            if(!err?.status){
               toast.error('No response');
            }
            else if(err?.status === 409){
               toast.warning('Device exist');
            }
            else{
               toast.error('Unauthorized');
            }
        }
     }



     const handleFileChange = (e)=>{
          const file = e.target.files[0];
          const reader = new FileReader();
          
          reader.onloadend = ()=>{
               const base64String = reader.result.toString();
               setImage(base64String);
          }

          if(file){
               reader.readAsDataURL(file);
          }
     }

     return (
        isUserCreateLoading
        ? <h1>creating User....</h1>
        : <div className="container-fluid">
               <div className="action-title-container">
                   <h3 className="action-title">Create User</h3>
                   <hr />
               </div>
               <div className="row">
                       <div className="col-md-2 col-lg-2"></div>  
                       <div className="col-md-8 col-lg-8">
                            
                          <form className="form" onSubmit={handleAddUser}>

                              <div className="form-group">
                                   <label className="form-label">First Name</label>
                                   <input 
                                        type="text" 
                                        class="form-control" 
                                        value={fName} 
                                        onChange={(e)=>setFName(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label className="form-label">Last Name</label>
                                   <input 
                                        type="text" 
                                        class="form-control" 
                                        value={lName} 
                                        onChange={(e)=>setLName(e.target.value)}
                                        required
                                   />
                              </div>




                              <div className="form-group">
                                   <label className="form-label">Phone</label>
                                   <input 
                                        type="text" 
                                        class="form-control" 
                                        value={phone} 
                                        onChange={(e)=>setPhone(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label className="form-label">Email</label>
                                   <input 
                                        type="text" 
                                        class="form-control" 
                                        value={email}
                                        onChange={(e)=>setLEmail(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label className="form-label">Select image</label>
                                   <input 
                                        type="file" 
                                        class="form-control" 
                                        onChange={handleFileChange}
                                   />
                              </div>
                              <div className="form-group">
                                   <button className="btn btn-primary">Submit</button>
                              </div>
                         </form>

                    </div>
                    <div className="col-md-2 col-lg-2"></div>  
                  </div>
               <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
               />
               <ToastContainer />
               
          </div>
     );

};

export default  CreateUser;
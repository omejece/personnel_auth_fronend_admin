
import { UseSelector, useDispatch } from "react-redux";
import { useCreatePersonnelMutation, useGetPersonnelsQuery } from "./personnelApiSlice";
import { useRef,useState,useEffect } from "react";
import { setPersonnels } from './personnelSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QRCodeCanvas} from "qrcode.react";
import CryptoJS from 'crypto-js';

const secretKey = 'thwjw7889w7w89w9w0ww9w0>7jdj;68362n2u2';

const CreatePersonnel = (props)=>{
     const qrRef = useRef();
     const [fName,setFName] = useState("");
     const [mName,setMName] = useState("");
     const [lName,setLName] = useState("");
     const [armyNumber,setArmyNumber] = useState("");
     const [core,setCore] = useState("");
     const [rank,setRank] = useState("");
     const [phone,setPhone] = useState("");
     const [email,setLEmail] = useState("");
     const [image,setImage] = useState("");
     const [encryptedArmyNumber,setEncryptedArmyNumber] = useState("");
     const dispatch = useDispatch();
     const [createPersonnel,{data:personnelCreateResp,isLoading: isPersonnelCreateLoading,isSuccess:isPersonnelCreated,isError: isPersonnelCreateError}] = useCreatePersonnelMutation();
     const { data:Personnels, isLoading: isPersonnelLoading,isSuccess:isPersonnelSucces, refetch: reloadPersonnels } = useGetPersonnelsQuery();
     
     
     useEffect(()=>{},[armyNumber,encryptedArmyNumber]);
     useEffect(()=>{
          if(isPersonnelCreateError){
               alert(personnelCreateResp.message);
               toast.success('Success created');
          }

          if(isPersonnelCreated){
               alert(personnelCreateResp.message);
               toast.success('Success created');
          }
     },[
        isPersonnelCreated,
        isPersonnelCreateError
     ]);


     const downloadQRCode = () => {
          const canvas = qrRef.current.querySelector("canvas");
          const url = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = url;
          link.download = "qrcode.png";
          link.click();
     }

     const handleAddPersonnel = async (e)=>{
        e.preventDefault();
        try{
             const result = await createPersonnel({fName,mName,lName,armyNumber,core,rank,phone,email,image}).unwrap();
             if(result.success){
               reloadPersonnels();
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


     
     const encryptData = (data) => {
          return CryptoJS.AES.encrypt(data, secretKey).toString();
     };
     
     
     const decryptData = (encryptedData) => {
          const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
          return bytes.toString(CryptoJS.enc.Utf8);
     };


     const setUpArmyNumber = (e)=>{
          setArmyNumber(e.target.value);
          const encryptedData = encryptData(e.target.value);
          alert(encryptedData);
          alert(decryptData(encryptedData));
          setEncryptedArmyNumber(encryptData(e.target.value));
     }

     return (
        isPersonnelCreateLoading
        ? <h1>creating Personnel....</h1>
        : <div className="container-fluid">
               <div className="action-title-container">
                   <h3 className="action-title">Create Personnel</h3>
                   <hr />
               </div>
               <div className="row">
                       <div className="col-md-3 col-lg-3">
                         
                              <div style={{ textAlign: "center", marginTop: "20px" }}>
                                   <h4>QR Code Generator</h4>
                                   <div ref={qrRef}>
                                   <QRCodeCanvas value={encryptedArmyNumber} size={200} />
                                   </div>
                                   <button onClick={downloadQRCode} className="btn btn-primary" style={{ marginTop: "10px" }}>
                                         Download QR Code
                                   </button>
                              </div>

                       </div>  
                       <div className="col-md-9 col-lg-9">
                            
                          <form className="form" onSubmit={handleAddPersonnel}>

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
                                   <label className="form-label">Middle Name</label>
                                   <input 
                                        type="text" 
                                        class="form-control" 
                                        value={mName}
                                        onChange={(e)=>setMName(e.target.value)}
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
                                   <label className="form-label">Army Number</label>
                                   <input 
                                        type="text" 
                                        class="form-control" 
                                        value={armyNumber}
                                        onChange={setUpArmyNumber}
                                        required
                                   />
                              </div>


                              <div className="form-group">
                                   <label className="form-label">Unit Name</label>
                                   <input 
                                        type="text" 
                                        class="form-control" 
                                        value={core}
                                        onChange={(e)=>setCore(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="form-group">
                                   <label className="form-label">Rank</label>
                                   <select 
                                        type="text" 
                                        class="form-control" 
                                        value={rank}
                                        onChange={(e)=>setRank(e.target.value)}
                                        required>
                                        <option value="">--Select Personnel rank</option>
                                        <option value="Private">Private Soldier</option>
                                        <option value="Lance Copre">Lance Copra</option>
                                        <option value="Copra">Copra</option>
                                        <option value="Sergent">Sergent</option>
                                        <option value="Staff Sergent">Staff Sergent</option>
                                        <option value="Warrant Officer">Warrant Oficcer</option>
                                        <option value="Master Warrant Oficcer">Master Warrant Oficcer</option>
                                        <option value="Army Warrant Officer">Army Warrant Officer</option>
                                        <option value="Second Lieutenant">Second Lieutenant</option>
                                        <option value="Lieutenant">Lieutenant</option>
                                        <option value="Captain">Captain</option>
                                        <option value="Major">Major</option>
                                        <option value="Lieutenant Colonel">Lieutenant Conel</option>
                                        <option value="Colonel">Colonel</option>
                                        <option value="Brigadier General">Brigadier General</option>
                                        <option value="Major General">Major General</option>
                                        <option value="Lieutenant General">Lieutenant General</option>
                                        <option value="General">General</option>
                                        <option value="Air Marshall">Air Marshall</option>
                                   </select>
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

export default  CreatePersonnel;
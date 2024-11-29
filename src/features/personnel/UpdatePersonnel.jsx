





import { UseSelector, useDispatch } from "react-redux";
import { useGetPersonnelQuery,useUpdatePersonnelMutation } from "./personnelApiSlice";
import { useParams } from "react-router-dom";
import { useRef,useState,useEffect,useContext } from "react";
import { setPersonnels } from './personnelSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/ModalComponent";
import 'react-toastify/dist/ReactToastify.css';

const UpdatePersonnel = (props)=>{
     const dispatch = useDispatch();
     const [fName,setFName] = useState("");
     const [mName,setMName] = useState("");
     const [lName,setLName] = useState("");
     const [armyNumber,setArmyNumber] = useState("");
     const [core,setCore] = useState("");
     const [rank,setRank] = useState("");
     const [phone,setPhone] = useState("");
     const [email,setLEmail] = useState("");
     const [image,setImage] = useState("");
     let {id} = useParams();
     const { data: myPersonnel , isLoading: isPersonnelLoading, isSuccess: isPersonnelLoaded,refetch: fetchPersonnelDetail  } = useGetPersonnelQuery(id);
     const [updatePersonnel,{isLoading: isPersonnelUpdateLoadinfo,isSuccess:isPersonnelUpdated,isError: isPersonnelUpdateFailed}] = useUpdatePersonnelMutation();
     const navigation = useNavigate();
     
     

     useEffect(()=>{

          if(isPersonnelUpdateFailed){
               toast.error("failed to update personnel");
          }

          if(isPersonnelUpdated){
               toast.success("personel successfully updated");
          }

     },[
        isPersonnelUpdateLoadinfo,
        isPersonnelUpdated,
        isPersonnelUpdateFailed
     ]);

     useEffect(()=>{
        if(isPersonnelLoaded){
          setFName(myPersonnel.fName);
          setMName(myPersonnel.mName);
          setLName(myPersonnel.lName);
          setArmyNumber(myPersonnel.armyNumber);
          setCore(myPersonnel.core);
          setRank(myPersonnel.rank);
          setPhone(myPersonnel.phone);
          setLEmail(myPersonnel.email);
          setImage(myPersonnel.image);
        }

     },[isPersonnelLoaded,isPersonnelLoading]);

     useEffect(()=>{
          fetchPersonnelDetail();
     },[]);

     const handleEditUpdate = async (e)=>{
         try{
            e.preventDefault();
            const result = await updatePersonnel({id,fName,mName,lName,armyNumber,core,rank,phone,email,image}).unwrap();
            if(result.success){
                toast.success("personnel successfully updated");
                navigation("/dashboard/Personnels")
            }
         }
         catch(err){
              toast.error(err?.message)
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
          isPersonnelUpdated
          ? <h1>Updating Personnel....</h1>
          : <div className="container-fluid">
                 <div className="action-title-container">
                     <h3 className="action-title">Update Personnel</h3>
                     <hr />
                 </div>
                 <div className="form-content-center">
                    <form className="form" onSubmit={handleEditUpdate}>

                         <div className="form-group">
                              <label className="form-label">First Name</label>
                              <input 
                                type="text" 
                                class="form-control" 
                                value={fName}
                                placeholder="enter name" 
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
                                placeholder="enter name" 
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
                                placeholder="enter name" 
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
                                placeholder="enter name" 
                                onChange={(e)=>setArmyNumber(e.target.value)}
                                required
                              />
                         </div>


                         <div className="form-group">
                              <label className="form-label">Unit Name</label>
                              <input 
                                type="text" 
                                class="form-control" 
                                value={core}
                                placeholder="enter name" 
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
                                placeholder="enter name" 
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
                                placeholder="enter name" 
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

export default  UpdatePersonnel;
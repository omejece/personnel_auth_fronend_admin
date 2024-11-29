import 'react-notifications/lib/notifications.css';
import { useSelector, useDispatch } from "react-redux";
import { useGetPersonnelsQuery,useDeletePersonnelMutation } from "./personnelApiSlice";
import { useRef,useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { setPersonnels} from './personnelSlice';

import DialogComponent from '../../components/DialogComponent';



const ViewPersonnels= (props)=>{
     const [allPersonnels,setAllPersonnels] = useState([]);
     const [showDialog,setShowDialog] = useState(false);
     const [dialogResp,setDialogResp] = useState(false);
     const [currentPersonnel,setCurrentPersonnel] = useState(null);
     const { data:personnels,isError:isPersonnelFetchError, isLoading: isPersonnelLoading,isSuccess:isPersonnelSucces, refetch: reloadPersonnels } = useGetPersonnelsQuery();
     const [deletePersonnel,{isLoading: isPersonnelDeleted}] = useDeletePersonnelMutation();
     const dispatch = useDispatch();
     const navigate = useNavigate();

     useEffect(() => {
        if (isPersonnelSucces) {
            setAllPersonnels(personnels);
            dispatch(setPersonnels(personnels));
        }

        if(isPersonnelFetchError){
        }

      }, [isPersonnelSucces,isPersonnelFetchError, personnels]);

      useEffect(()=>{
          reloadPersonnels();
      },[]);

      const handleDeleteSubmit = async (e)=>{
          if(dialogResp == "delete"){
               try{ 
                   const id = currentPersonnel?._id;
                   const result = await deletePersonnel({id});
                   reloadPersonnels();
                   if(result.data.success == true){
                       setShowDialog(false);
                       setDialogResp("");
                       //show alert dialog
                   }
               }
               catch(err){
                   console.log(err);
                   //show alert dialog
               }
          }
      }

      const showDeleteDialog = (id)=>{
            const selectedPersonnel = allPersonnels.find(x=>x._id === id);
            if(selectedPersonnel){
                setCurrentPersonnel(selectedPersonnel);
                setShowDialog(true);
            }
      }




      const handleSearchPersonnel = (e)=>{
          var value = e.target.value;
          if(value.trim() != ""){
              value = value.toLowerCase()
              var filtered = personnels.filter(x=>{
                  if(x.fName.toLowerCase().includes(value) || x.mName.toLowerCase().includes(value) || x.lName.toLowerCase().includes(value) || x.armyNumber.toLowerCase().includes(value)){
                      return true;
                  }
                  else{
                      return false;
                  }
              });
              setAllPersonnels(filtered);
          }
          else{
             setAllPersonnels(personnels);
          }
      } 


    
     

     return (
         
        <div className="container-fluid">
            <div className="page-header-container">
                   <h2 className="action-title">All Personnel</h2>
                   <div style={{width: '30%'}}>
                      <div className='input-group'>
                           <span className='input-group-text'>Filter by Name</span>
                           <input type='text' placeholder='search name' onChange={handleSearchPersonnel} className='form-control' />
                      </div>
                      
                   </div>
            </div>
            <hr />
            {
                isPersonnelLoading 
                ? <h1>loading....</h1>
                :<div className="page-content-continer">
                    <table class="table table-bordered table-responsive">
                    <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Army No</th>
                                <th>Rank</th>
                                <th colSpan="2"></th>
                            </tr>
                    </thead>
                    <tbody>
                        {
                            
                            allPersonnels ? allPersonnels.map((x,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <img src={x.image} style={{height:100,width: 100}}/>
                                        </td>
                                        <td>{x.fName+' '+x.mName+' '+x.lName }</td>
                                        <td>{x.armyNumber}</td>
                                        <td>{x.rank}</td>
                                        <td>
                                            <button className='btn btn-warning' onClick={()=>navigate(`/dashboard/Personnels/update-Personnel/${x.id}`)}>
                                                <i className='ph ph-feather'></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={()=>showDeleteDialog(x.id)}>
                                                <i className='ph ph-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            : null
                        }
                    </tbody>
                    </table>

                    <DialogComponent 
                       onReplyChanged={(e)=>setDialogResp(e.target.value)} 
                       title="Are you sure you want to delete" 
                       message="type delete in the textbox and submit"
                       show={showDialog} 
                       onCancel={()=>setShowDialog(false)}
                       onSubmit={handleDeleteSubmit}
                    />
                </div>
            }
        </div>
     );

};

export default  ViewPersonnels;
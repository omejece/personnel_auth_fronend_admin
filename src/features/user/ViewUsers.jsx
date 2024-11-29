




import 'react-notifications/lib/notifications.css';
import { useSelector, useDispatch } from "react-redux";
import { useGetUsersQuery,useDeleteUserMutation } from "./userApiSlice";
import { useRef,useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { setUsers} from './userSlice';

import DialogComponent from '../../components/DialogComponent';



const ViewUsers = (props)=>{
     const [allUsers,setAllUsers] = useState([]);
     const [showDialog,setShowDialog] = useState(false);
     const [dialogResp,setDialogResp] = useState(false);
     const [currentUser,setCurrentUser] = useState(null);
     const { data:Users,isError:isUserFetchError, isLoading: isUserLoading,isSuccess:isUserSucces, refetch: reloadUsers } = useGetUsersQuery();
     const [deleteUser,{isLoading: isUserDeleted}] = useDeleteUserMutation();
     const dispatch = useDispatch();
     const navigate = useNavigate();

     useEffect(() => {
        if (isUserSucces) {
            setAllUsers(Users);
            dispatch(setUsers(Users));
        }

        if(isUserFetchError){
        }

      }, [isUserSucces,isUserFetchError, Users]);

      useEffect(()=>{
          reloadUsers();
      },[]);

      const handleDeleteSubmit = async (e)=>{
          if(dialogResp == "delete"){
               try{ 
                   const id = currentUser?._id;
                   const result = await deleteUser({id});
                   reloadUsers();
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
            const selectedUser = allUsers.find(x=>x._id === id);
            if(selectedUser){
                setCurrentUser(selectedUser);
                setShowDialog(true);
            }
      }




      const handleSearchUser = (e)=>{
          var value = e.target.value;
          if(value.trim() != ""){
              value = value.toLowerCase()
              var filtered = Users.filter(x=>{
                  if(x.fName.toLowerCase().includes(value) || x.mName.toLowerCase().includes(value) || x.lName.toLowerCase().includes(value) || x.armyNumber.toLowerCase().includes(value)){
                      return true;
                  }
                  else{
                      return false;
                  }
              });
              setAllUsers(filtered);
          }
          else{
             setAllUsers(Users);
          }
      } 


    
     

     return (
         
        <div className="container-fluid">
            <div className="page-header-container">
                   <h2 className="action-title">All User</h2>
                   <div style={{width: '30%'}}>
                      <div className='input-group'>
                           <span className='input-group-text'>Filter by Name</span>
                           <input type='text' placeholder='search name' onChange={handleSearchUser} className='form-control' />
                      </div>
                      
                   </div>
            </div>
            <hr />
            {
                isUserLoading 
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
                            
                            allUsers ? allUsers.map((x,i)=>{
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
                                            <button className='btn btn-warning' onClick={()=>navigate(`/dashboard/Users/update-User/${x.id}`)}>
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

export default  ViewUsers;
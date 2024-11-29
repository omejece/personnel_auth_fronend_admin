import { useSelector, useDispatch } from "react-redux";
import { Outlet,Link,useNavigate } from "react-router-dom";
import { UseStore } from "react-redux";
import { selectAllUsers } from "./userSlice";




const User = (props)=>{
    const navigate = useNavigate();
    const users = useSelector(selectAllUsers);

    return(
        <div class="page-header ">
            <div class="page-block card mb-0" style={{marginTop: "70px",height:"90vh",overflow:"auto"}}>
              <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-12">
                        <div class="page-header-title border-bottom pb-2 mb-2"> 
                            <button className="btn btn-primary" onClick={()=>navigate("/users/all-user")}>
                                 <i className="ph ph-eye"></i> View Users
                            </button>
                            <button className="btn btn-danger" onClick={()=>navigate("/users/new-user")}>
                                <i className="ph ph-plus"></i> Add User
                            </button>
                        </div>
                    </div>
                    <div class="col-md-12 subpage-content-container" >
                        <Outlet />
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default User;
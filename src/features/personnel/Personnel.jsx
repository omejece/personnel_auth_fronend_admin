import { useSelector, useDispatch } from "react-redux";
import { Outlet,Link,useNavigate } from "react-router-dom";
import { UseStore } from "react-redux";
import { selectAllPersonnels } from "./personnelSlice";




const Personnel = (props)=>{
    const navigate = useNavigate();
    const devices = useSelector(selectAllPersonnels);

    return(
        <div class="page-header ">
            <div class="page-block card mb-0" style={{marginTop: "70px",height:"90vh"}}>
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-12">
                        <div class="page-header-title border-bottom pb-2 mb-2"> 
                            <button className="btn btn-primary" onClick={()=>navigate("/dashboard/Personnels")}>
                                 <i className="ph ph-eye"></i> View Personnel
                            </button>
                            <button className="btn btn-danger" onClick={()=>navigate("/dashboard/Personnels/new-Personnel")}>
                                <i className="ph ph-plus"></i> Add Personnel
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

export default Personnel;
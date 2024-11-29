import { useRef } from "react";
import avarterImage from "../statics/images/user/avatar-2.jpg";
import logoImage from "../statics/images/logo-white.svg";


const HeadComponent = (props)=>{
     const ref = useRef();
     const handleDropDown = (dropDownName)=>{
           var dropDown = document.getElementById(dropDownName);
           if(!dropDown.style.display){
               dropDown.style.display = "block";
           }
           else{
               dropDown.style.display = "";
           }   
     }

     return (
        <div className="pc-header" style={{backgroundColor:'#43491A'}}>
            <div className="m-header" style={{backgroundColor:'#43491A'}}>
                <h5 style={{color:'white',fontStyle:'italic',fontWeight: 'bold'}}>PMA</h5>
            </div>
            <div className="header-wrapper" style={{backgroundColor:'#43491A'}}>
                <div className="me-auto pc-mob-drp">
                <ul className="list-unstyled">
                    <li className="pc-h-item pc-sidebar-collapse" onClick={props.onColapsed}>
                        <a href="#" className="pc-head-link ms-0" id="sidebar-hide">
                            <i className="ph ph-list" />
                        </a>
                    </li>
                    <li className="pc-h-item pc-sidebar-popup">
                        <a href="#"  className="pc-head-link ms-0" id="mobile-collapse">
                            <i className="ph ph-list" />
                        </a>
                    </li>
                    <li className="dropdown pc-h-item">
                    <a
                        className="pc-head-link dropdown-toggle arrow-none m-0"
                        onClick={()=>handleDropDown("search-form-dropdown")}
                        href="#"
                        role="button"
                        aria-haspopup="false"
                        aria-expanded="false"
                    >
                        <i className="ph ph-magnifying-glass" />
                    </a>
                    <div id="search-form-dropdown" className="dropdown-menu  pc-h-dropdown drp-search">
                        <form className="px-3">
                        <div className="form-group mb-0 d-flex align-items-center">
                            <input
                            type="search"
                            className="form-control border-0 shadow-none"
                            placeholder="Search here. . ."
                            />
                            <button className="btn btn-light-secondary btn-search">
                            Search
                            </button>
                        </div>
                        </form>
                    </div>
                    </li>
                </ul>
                </div>
                <div className="ms-auto">
                <ul className="list-unstyled">
                    <li className="dropdown pc-h-item header-user-profile">
                    <a
                        className="pc-head-link dropdown-toggle arrow-none me-0"
                        onClick={()=>handleDropDown("dropdown-user-profile")}
                        href="#"
                        role="button"
                        aria-haspopup="false"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                    >
                        <img
                        src={avarterImage}
                        alt="user-image"
                        className="user-avtar"
                        />
                    </a>
                    <div id="dropdown-user-profile" className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                        <div className="dropdown-body">
                        <div
                            className="profile-notification-scroll position-relative"
                            style={{ maxHeight: "calc(100vh - 225px)" }}
                        >
                            <ul className="list-group list-group-flush w-100">
                                <li className="list-group-item">
                                    <a href="#" className="dropdown-item">
                                    <span className="d-flex align-items-center">
                                        <i className="ph ph-user-circle" />
                                        <span>Edit profile</span>
                                    </span>
                                    </a>
                                    <a href="#" className="dropdown-item">
                                    <span className="d-flex align-items-center">
                                        <i className="ph ph-bell" />
                                        <span>Notifications</span>
                                    </span>
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        <span className="d-flex align-items-center">
                                            <i className="ph ph-gear-six" />
                                            <span>Settings</span>
                                        </span>
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="#" className="dropdown-item">
                                        <span className="d-flex align-items-center">
                                            <i className="ph ph-plus-circle" />
                                            <span>Add account</span>
                                        </span>
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        <span className="d-flex align-items-center" onClick={props.onLogout}>
                                            <i className="ph ph-power" />
                                            <span>Logout</span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
        </div>
     );
}

export default HeadComponent;

import "../statics/fonts/tabler-icons.min.css";
import "../statics/fonts/feather.css";
import "../statics/fonts/fontawesome.css";
import "../statics/fonts/material.css";
import "../statics/fonts/material.css";
import "../statics/css/style.css";
import "../statics/css/style-preset.css";
import "../statics/dashboard.css";
import 'react-notifications/lib/notifications.css';



import { useSelector,useDispatch } from "react-redux";
import { selectCurrentUser, selectCurrentAccessToken } from "../features/auth/authSlice";
import { Link , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import LoaderComponent from "../components/LoaderComponent";
import NavSideBarComponent from "../components/NavSideBarComponent";
import HeadComponent from "../components/HeadComponent";
import ContentComponent from "../components/ContentComponent";
import FooterComponent from "../components/FooterComponent";
import { logOut } from "../features/auth/authSlice";
import { sideBarData } from "../data/pagesData";

const Dahboard = (props)=>{
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const user = useSelector(selectCurrentUser);
      var sideBar = document.getElementById("sidebar-content");
      var mainContent = document.getElementById("dashboard-main-content");
      if(sideBar && mainContent){
            sideBar.style.width = "18%";
            mainContent.style.width = "82%";
            mainContent.style.marginLeft = "18%"
      }
      
      useEffect(()=>{
           setTimeout(()=>{
               sideBar = document.getElementById("sidebar-content");
               mainContent = document.getElementById("dashboard-main-content");
               sideBar.style.width = "18%";
               mainContent.style.width = "82%";
               mainContent.style.marginLeft = "18%"
           },1000);
      },[])
      
      const handleLogout = (e)=>{
            dispatch(logOut());
            navigate("/");
      }
      


      const handleColapse = (e)=>{
            sideBar = document.getElementById("sidebar-content");
            mainContent = document.getElementById("dashboard-main-content");
            if(sideBar.offsetWidth == 0){
                 sideBar.style.width = "18%";
                 mainContent.style.width = "82%";
                 mainContent.style.marginLeft = "18%"
            }
            else{
                 sideBar.style.width = "0%";
                 mainContent.style.width = "100%";
                 mainContent.style.marginLeft = "0%"
            }
      }

      

      return (
            <div className="container-fluid">
                 <LoaderComponent  />
                 <NavSideBarComponent data={sideBarData} />
                 <HeadComponent onLogout={handleLogout} onColapsed={handleColapse}  />
                 <ContentComponent />
                 <FooterComponent />
            </div>
      )
}

export default Dahboard;
import { Outlet } from "react-router-dom";

const ContentComponent = (props)=>{
    return(
      <div id="dashboard-main-content">
            <Outlet />
      </div>
    );
}

export default ContentComponent;
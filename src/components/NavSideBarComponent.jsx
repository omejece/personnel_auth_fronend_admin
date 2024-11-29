
import { Outlet,Link } from "react-router-dom";


const NavSideBarComponent = (props)=>{
    return (
        <nav className="pc-sidebar" id="sidebar-content">
            <div className="navbar-wrapper">
                <div className="m-header">
                <a href="/dashboard" className="b-brand text-primary">
                    <img src="assets/images/logo-white.svg" alt="logo image" className="logo-lg" />
                </a>
                </div>
                <div className="navbar-content">
                <ul className="pc-navbar">
                    <li className="pc-item pc-caption">
                        <label className="sidebar-title">{props.data.title}</label>
                    </li>
                    <hr/>
                    {
                        props.data.items.map(x=>{
                            return(
                                <li className="pc-item ">
                                    <Link to={x.link} className="pc-link">
                                        <span className="pc-micon"><i className={x.icon}></i></span>
                                        <span className="pc-mtext">{x.name}</span>
                                    </Link>
                                    <hr />
                                </li>
                                
                            )
                        })
                    }

                </ul>
             </div>
         </div>
      </nav>
    );
}

export default NavSideBarComponent;
import { useSelector, useDispatch } from "react-redux";
import { Outlet,Link,useNavigate } from "react-router-dom";
import { UseStore } from "react-redux";
import InfoBox from "../../components/InfoBox";
import { infoBoxData } from "../../data/pagesData";



const Home = (props)=>{
    const navigate = useNavigate();

    return(
        <div className="page-header ">
            <div className="page-block card mb-0" style={{marginTop: "70px",height:"90vh"}}>
                <div className="card-body">
                     
                    <div className="row">
                        {
                          infoBoxData.map((x,y)=><InfoBox key={y} data={x} />)
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Home;
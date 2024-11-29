
import "../statics/modal.css"
import { useState , useEffect} from "react";

const ModalComponent = (props)=>{
    const [width,setWidth] = useState("40%");
    const [height,setHeight] = useState("400px");
    const [show,setShow] = useState(props.show);
    let modal;
    
    useEffect(()=>{
        modal = document.getElementsByClassName("modal-container")[0];
    },[show]);
     

    if(props.height){
        setHeight(props.height);
    }

    if(props.width){
        setWidth(props.width);
    }

    window.onclick = function(e){
        modal.style.display = "none"
    }

    return (
       props.show
       ?<div className="modal-container">
          <div className="modal-content"  style={{width: width,height: height}}>
              
          </div>
       </div>
       : ""
    );
}

export default ModalComponent;
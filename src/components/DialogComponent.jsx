
import "../statics/dialog.css"
import { useState , useEffect} from "react";

const DialogComponent = (props)=>{
    const [width,setWidth] = useState("40%");
    const [height,setHeight] = useState("400px");
    const [show,setShow] = useState(props.show);
 

    if(props.height){
        setHeight(props.height);
    }

    if(props.width){
        setWidth(props.width);
    }
    
    useEffect(()=>{
        setShow(props.show)
    },[props.show]);


   

    return (
        show ?
         <div className="dialog-container">
            <div className="dialog-content"  style={{width: width,height: height}}>
                <div className="dialog-body">
                    <h2 >{props?.title}</h2><br/>
                    <h4>{props?.message}</h4><br/>
                    <input type="text" onChange={props.onReplyChanged} className="form-control" />
                </div>
                <div className="dialog-footer">
                    <button onClick={props.onCancel} className="btn btn-danger" style={{position: "absolute",right:100,bottom:10}}>Cancel</button>
                    <button onClick={props.onSubmit} className="btn btn-primary" style={{position: "absolute",right:10,bottom:10}}>Submit</button>
                </div>
            </div>
       </div>
       : ""
    );
}

export default DialogComponent;





const InfoBox = (props)=>{
    
     return (
        <div className="col-md-6 col-xl-3">
            <div className={'card '+props.data.color+' order-card'}>
                <div className="card-body">
                <h6 className="text-white">{props.data.title}</h6>
                <h2 className="text-end text-white"><i className={props.data.icon+' float-start'}></i><span>{props.data.value1}</span>
                </h2>
                <p className="m-b-0">{props.data.detail}<span className="float-end">{props.data.value2}</span></p>
                </div>
            </div>
        </div>
     );
}

export default InfoBox;
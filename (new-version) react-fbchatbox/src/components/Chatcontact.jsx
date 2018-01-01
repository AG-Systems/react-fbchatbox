import React from 'react';

const Card = ({ 
    id, 
    text, 
    executor,
    online,
    img,
    onChangeClick,
    onRemoveClick
}) => {
    let online_status;
    if(online === "TRUE")
    {
        online_status = <img height="8px" width="8px" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Ski_trail_rating_symbol-green_circle.svg" />;
    }
    else
    {
        online_status = <span>{online}</span>;
    }
    return (
        <div className="project-card" onClick={() => onChangeClick(id)}>
            <p className="card-text"><img src={img} height="35" width="35" style={{ marginRight: "5px"}}/>{text} <span style={{ float: "right"}}>{online_status} </span></p> 
            {/* <span className="card-executor">{executor}</span> */}
            <span className="card-remove" onClick={() => onRemoveClick(id)}>-</span>
        </div>
    );
};

export default Card;
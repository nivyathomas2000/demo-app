import React from "react";

function Content(prop){
    console.log(prop.item.content, 'prop.item.content')
    let content=prop.item.content ? prop.item.content:"No Data Available"
     return (
        <div className="content-main col-6 col-md-10 col-lg-10">
            {/* <p>{prop.item.content ? prop.item.content:"No Data Available"}</p> */}
            
            <pre dangerouslySetInnerHTML={{ __html: content }}></pre>            
        </div>
    );
}

export default Content;
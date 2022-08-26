import React, { useState } from "react";
import "../css/App.css";

function GoogleRedirect(props){
    
    const search = window.location.search;
    const params = new URLSearchParams(decodeURIComponent(search));
    const displayName = params.get('displayName'); // bar
    const email = params.get('email');
    
    return(
        
        <div>asd</div>
    );

}

export default GoogleRedirect;
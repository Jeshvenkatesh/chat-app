import React from "react";
import Axios from 'axios';
import classes from "./Topbar.module.css";

class Topbar extends React.Component {

    handleLogout=()=>{
        const uname="";
        const email="";
        this.props.handleLoginPage();
        this.props.handleAccDetails(uname,email);

    }
    render(){
        return(
            <div className={classes.TopbarWrapper}>
                <div className={classes.heading}>
                <h3>Chat App</h3>
                </div>
                <div className={classes.detailsWrapper}>
                      <p>{this.props.userName}</p>
                      <p>{this.props.email}</p>
                      {
                          this.props.isUserLogin===true? 
                          <button type="button"  onClick={this.handleLogout}>Logout</button>
                          :
                          null
                      }
                </div>

            </div>
        )
    }
}
export default Topbar;
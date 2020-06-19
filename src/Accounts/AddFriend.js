import React from "react";
import Axios from 'axios';
import classes from "./Accounts.module.css";

class AddAccount extends React.Component {

      state={ }

    
      handleSubmitForm=(e)=>{
         e.preventDefault();
         const data={
            email:e.target.email.value,
            userName:e.target.userName.value,
            imageUrl:"https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144855718.jpg"

         }
         const API="https://5e0a2be192b6410014c29fb3.mockapi.io/accounts/"
         Axios.post(API, data)
         .then((response) => {
            this.props.handleFunctions();
            console.log(response)
         })
         .catch((err) => {
             console.log(err)
            
         })
         console.log(data);
          
      }

    render(){
        return(
            <section>
            <section>
                <div className={classes.AddAccountBackWrapper} onDoubleClick={this.props.cancelAddFrdPopUp}></div>
            </section>
            <div className={classes.AddAccountWrapper}>
                <form onSubmit={this.handleSubmitForm}>
                    <div>
                        <p>User Name:</p>
                        <input type="text" name="userName" required/>
                    </div>
                    <div>
                        <p>Email:</p>
                        <input type="email" name="email" required/>
                    </div>
                    <div className={classes.AddAccBtnWrapper}>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.props.cancelAddFrdPopUp}>Cancel</button>
                    </div>
                    
                </form>
            </div>
            </section>
        )
    }
}
export default AddAccount;
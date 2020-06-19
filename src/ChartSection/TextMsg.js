import React from "react";
import Axios from 'axios';
import classes from "./TextMsg.module.css";


class Conversation extends React.Component {

     state={
      chartData:[],
     }

     onSubmitClick=(e)=>{
           e.preventDefault();
           if(this.props.userName){
           const data={
            text:e.target.textMsg.value,
            userName:this.props.userName
           }
           const API="https://5e0a2be192b6410014c29fb3.mockapi.io/chartData/"
           Axios.post(API, data)
           .then((response) => {
              console.log(response)
              this.getChartData()
           })
           .catch((err) => {
               console.log(err)
              
           })
          }
          else{
            alert("Please select Friend to chat by double click")
          }
           e.target.reset();
     }
     handledelete=(pos)=>{
          const dataid=this.state.chartData[pos].id;

            const API = "https://5e0a2be192b6410014c29fb3.mockapi.io/chartData/";
            Axios.delete(API + dataid)
                .then((response) => {
                    this.getChartData();
                })
                .catch((err) => {
                    console.log(err)
                })
    }
     getChartData() {
      const API = "https://5e0a2be192b6410014c29fb3.mockapi.io/chartData";
      Axios.get(API)
          .then((response) => {
              console.log(response.data)
              this.setState({chartData:[...response.data]})
          })
          .catch((err) => {
              console.log(err)
          })
  }

     componentDidMount(){
      this.getChartData();
     }

   render(){

         const generateCharts=this.state.chartData=== null ? [] :this.state.chartData.map((item,pos)=>{
                   return(
                      <div key={item.id} className={classes.textMessage}>
                        <p onClick={()=>this.handledelete(pos)} className={classes.crossMark}> X</p>
                      <p>{"To"+ " " + item.userName}</p>
                      <p>{item.text}</p>
                      </div>
                   )
         })
       return(
               <div className={classes.mainWrapper} >
                   <div className={classes.TextArea}>
                      <div className={classes.subTextArea}>
                       <div className={classes.textMessage}>
                       <p>Note:</p>
                       <p>Double click to chat with friend</p>
                       <p>Single click to delete friend and chat</p>
                       </div>
                       {generateCharts}
                     </div>
                  </div>
                   <div className={classes.InputTextField}>
                       <form onSubmit={this.onSubmitClick}>
                       <i class="far fa-smile"></i>
                       <input type="text" name="textMsg"></input>
                       <i class="fas fa-camera"></i>
                       </form>
                       
                   </div>
               </div>
        
       )
   }
}

export default Conversation;
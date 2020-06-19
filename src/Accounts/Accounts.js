import React from "react";
import Axios from 'axios';
import classes from "./Accounts.module.css";
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css';
import AddAccount from "./AddFriend";
import Loader from "../Utilities/Loader";

class Accounts extends React.Component {

    state={
        accountsdata:[],
        query: '',
        data: [],
        searchString:[],
        filterArry:[],
        AddFrd:false,
        getRowPosFromTable:0,
        AddFrdStatus:false,
        isLoaderShow:true,
    }

    handleAddMessage=()=>{
        this.setState({AddFrdStatus:true})
    }
    handleMessage=()=>{
        this.setState({AddFrdStatus:false})
    }
    
    handleFunctions=()=>{
        this.cancelAddFrdPopUp();
        this.getAccountsData();
        this.handleAddMessage();
    }
    handleAddFrdPopUp=()=>{
        this.setState({AddFrd:true})
    }
    cancelAddFrdPopUp=()=>{
        this.setState({AddFrd:false})
    }

    handleInputChange = (event) => {
        this.setState({
            query: event.target.value
        },()=>{
      this.filterArray();
    })
    }

    filterArray = () => {
        let searchString = this.state.query;
        let responseData = this.state.data;
        if(searchString.length > 0){
            const filteredData = responseData.filter((item)=>{
                const name=item.userName.toLowerCase();
                if(name.startsWith(searchString.toLowerCase()) ){

                    return true;

                }else{
                    return false;
                }
            })           
            this.setState({filterArry:filteredData})
        }else{
            this.setState({filterArry:responseData})
        }
    }
    handleAccId=(pos)=>{
        const id = this.state.filterArry[pos].userName;
        const mail=this.state.filterArry[pos].email;
       this.props.handleAccDetails(id,mail);

    }
    handelDeleteFrd=(pos)=>{
        const uname="";
        const email="";
        const id = this.state.filterArry[pos].id;
        const confirmDelete = window.confirm('Do you want to delete ?');
        console.clear();
        if (confirmDelete) {
            const API = "https://5e0a2be192b6410014c29fb3.mockapi.io/accounts/";
            Axios.delete(API + id)
                .then((response) => {
                    this.getAccountsData();
                    this.props.handleAccDetails(uname,email);
                    this.setState({isLoaderShow:true})
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    getAccountsData() {
        const API = "https://5e0a2be192b6410014c29fb3.mockapi.io/accounts";
        Axios.get(API)
            .then((response) => {
                this.setState({accountsdata:[...response.data]})
                this.setState({
                    data:[...response.data],
                    searchString:[...response.data],
                    filterArry:[...response.data],
                    isLoaderShow:false,
                })
                this.handleMessage();
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount(){
        this.getAccountsData();
    }
    render(){
        const generateAccounts = this.state.filterArry === null ? [] : this.state.filterArry.map((item,pos)=>{
               
            return(
                {
                    name:<div className={classes.accountsTableWrapper} >
                           <div>
                           <img src={item.imageUrl}/>
                           </div>
                           <div>
                           <p>{item.userName}</p>
                           </div>
                           <div className={classes.iconWrapper} onClick={()=>this.handelDeleteFrd(pos)}>
                           <i className="fas fa-trash-alt"></i>
                           </div>
                             </div>
                }
            )
        })

        const data = [...generateAccounts]
        const columns = [
            {
                Header: "Sort friend", //  column th
                accessor: "name", // td
                sortable: true,
                center: true,
                className: classes.react_tbl_text_left,
                headerClassName: classes.headerClassAccounts,
            }
        ]
        return(
            <div className={classes.reactTable}>
                {this.state.AddFrdStatus===true?
                    <p className={classes.addMessage}>SuccessFully added!</p>
                    : null
                }
                {
                    this.state.AddFrd === true ? <AddAccount handleFunctions={this.handleFunctions} cancelAddFrdPopUp={this.cancelAddFrdPopUp} /> : null
                }
                
                <button className={classes.btnWrapper} type="button" onClick={this.handleAddFrdPopUp}> Invite friend</button>
                <div className={classes.searchWrapper}>
                    <input type="text" placeholder="Search friend" onInput={this.handleInputChange} />
                </div>
                {
                    this.state.isLoaderShow===true?<Loader/>:
                    <ReactTable data={data} columns={columns} defaultPageSize={10} 
                 getTdProps={(state, rowInfo, column, instance) => {
                     return {
                             onDoubleClick: (e) => {
                                    if(rowInfo){
                                     this.setState({getRowPosFromTable:rowInfo.index});
                                     this.handleAccId(rowInfo.index)

                                    }
                                 }
                         }}} />
                }
                
            </div>
        )
    }
}
export default Accounts;
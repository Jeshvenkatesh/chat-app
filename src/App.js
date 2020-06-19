import React from 'react';
import logo from './logo.svg';
import './App.css';
import Accounts from './Accounts/Accounts';
import Topbar from "./Utilities/Topbar";
import Conversation from "./ChartSection/TextMsg";
import LoginPage from "./Utilities/Login";


class App extends React.Component {

  state = {
    userName: "",
    email: "",
    id: "",
    isUserLogin: false,
  }
  handleAccDetails = (id, mail) => {
    this.setState({ userName: id, email: mail })
  }
  handleLoginPage = () => {
    this.setState({ isUserLogin: !this.state.isUserLogin })
  }

  render() {
    return (
      <div>
        <Topbar userName={this.state.userName} email={this.state.email} handleAccDetails={this.handleAccDetails} handleLoginPage={this.handleLoginPage} isUserLogin={this.state.isUserLogin} />
        {
          this.state.isUserLogin === true ?
            <section className="MainWrapper">
              <Accounts handleAccDetails={this.handleAccDetails} />
              <Conversation userName={this.state.userName} />
            </section>
            :
            <LoginPage handleLoginPage={this.handleLoginPage} />
        }
      </div>
    );
  }
}

export default App;

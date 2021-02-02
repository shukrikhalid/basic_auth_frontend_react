import React, { Component } from "react";
// import _ from 'lodash'

import UserService from "../services/user.service";

const ListUser = (props) => {
  let data = props.users.map((user,id)=>{
    return (
      <tr>
        <th scope="row" key={id} >{id+1}</th>
        <td>{user.id}</td>
        <td>{user.email}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.createdAt}</td>
       </tr>
    )
  })
  return data
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      error: null
    };

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    
  }

  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value
    });
    const search = e.target.value
    UserService.getUsers(search).then(
      response => {
        this.setState({
          content: response.data.result
        });
      },
      error => {
        this.setState({
          error:
            error.response.data.error
        });
      }
    );
    console.log("asdasd",  e.target.value)
  }

  componentDidMount() {
    UserService.getUsers().then(
      response => {
        this.setState({
          content: response.data.result
        });
      },
      error => {
        this.setState({
          error:
            error.response.data.error
        });
      }
    );
  }

  

  render() {
    const errorMsg = this.state.error;
    console.log("errorMsg ",errorMsg)
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>User List</h3>
        </header>
        <div>
          {errorMsg == null ? (
            <div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onChangeFirstName}
                  placeholder="Search"
                />
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">DateTime SignUp</th>
                  </tr>
                </thead>
                <tbody>
                  <ListUser users={this.state.content} /> 
                </tbody>
              </table>
            </div>
            
          ):(
            <p>Unauthorized - {errorMsg}</p>
          )}
        </div>
        
      </div>
    );
  }
}
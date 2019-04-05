import React from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';


const url = process.env.REACT_APP_API_URL;

class UserList extends React.Component {
  
    constructor(props) {
  
        super(props);
  
        this.state = {

          // Array
          users: [],
  

          isLoggedIn: false,
  
      department: '',
  
    }
  }

  componentDidMount() {
  
    // Auth part

    this.authenticate();
  }


  authenticate = () => {
  
    const token = localStorage.getItem('sscert');
  
    if (token) {
  
        const options = {
  
            headers: {
  
                authorization: token,
  
        },
      }
      axios
  
  
      // Get USers
      .get(`${url}/api/users`, options)
  
      .then(response => {
  
  
            this.setState({
  

                
            users: response.data.users,
            
            department: response.data.department,
  
            
            isLoggedIn: true,
          })
        })
   
        .catch(err => {
        })
    }
  }
  render() {
   
    if (!this.state.isLoggedIn) {
   
        return (<div className='users'><h2>Check To See If You Are Logined In </h2><h2>
            
             Please <Link to='/signin'>
             Login</Link><Link to='/signup'>
             Register</Link></h2></div>
             )
    }
    return (
   
   <div className='users'>
   
    {this.state.users.length > 0 ? 
    <h4>Listing The {this.state.department} department:</h4>
     
     :
     <h4>Please Wait...</h4>}
   
    {this.state.users.map(user => {
   

   return <p key={user.id}>{user.username}</p>
   
   })}
   
    </div>
    )
  }
}
export default UserList;
import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    
  constructor(props) {
     
      super(props);
     
      this.state = {
     
        user: { ...newUser },
     
        message: '',
      }
    }
  
    inputHandler = event => {
  
      const { name, value } = event.target;
  
      this.setState({ user: { ...this.state.user, [name]: value }})
    }
  
    submitHandler = event => {
      
      event.preventDefault();
      
      axios
      
      .post(`${url}/api/login`, this.state.user)
      
      .then(response => {
      
        if (response.status === 200 && response.data) {
      
          localStorage.setItem('sscert', response.data.token)
      
          this.setState({
      
            message: 'Login Good to Go',
      
              user: { ...newUser },
            })
      
            this.props.history.push('/home');
      
          } else {
      
            throw new Error();
          }
        })
        .catch(err => {
          
          this.setState({
            
            message: 'Login error',
            
            user: { ...newUser },
          
          })
        
        })
    }
    render() {
      
      return (
      
      <div>
     
        <h3> Login</h3>
            type='text'
            id='username'
            name='username'
            value={this.state.user.username}
            onChange={this.inputHandler}
          />
            
            type='password'
            id='password'
            name='password'
            value={this.state.user.password}
            onChange={this.inputHandler}
          />
        
        { this.state.message && (<h3>{this.state.message}</h3>) }
      </div>
      )
    }
  }
  
  const newUser = {
    
    username: '',
    
    password: '',
 


    department: '',
  
  }
  



  export default Login;
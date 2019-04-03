import React from 'react';
import RegSuccess from './RegSuccess';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const initialUser = {
  username: '',
  
  password: '',
  
  department: '',
}


class Register extends React.Component {
  
    constructor(props) {
  
        super(props);
  
        this.state = {
  
            user: { ...initialUser },
  
            message: '',
  
            wasSuccessful: false,
  
        }
  }

  inputHandler = event => {
    const { name, value } = event.target;
  
    this.setState({ user: { ...this.state.user, [name]: value }})
  }

  goToLogin = event => {
  
    this.props.history.push('/signin');
  }

  submitHandler = event => {
    event.preventDefault();
  
    axios
  
    .post(`${url}/api/register`, this.state.user)
  
    .then(response => {
  
        if (response.status === 201) {
  
            this.setState({
  
                wasSuccessful: true,
  
                user: { ...initialUser },
  
            })
  
        } else {
  
            throw new Error();
        }
  
  
    })
  
    .catch(err => {
  
        this.setState({
  
            message: 'Registration failed.',
  
            user: { ...initialUser },
  
        })
  
    })
  }
  render() {
  
    if (this.state.wasSuccessful) {
  
  
        return <RegSuccess goToLogin={this.goToLogin} />
    }
  
    return (
      <div>
      
      <h3>Register</h3>
    
    </div>
    
    )
  }
}

export default Register;
import React, {Component} from 'react';
import axios from 'axios';

class Student extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            student_id:0,
            student_name:''
        }
    }

    async componentDidMount(){
        if (this.state.student_name === ''){
            let a = await axios.get('/student/get-student');
            console.log('a.data:',a.data)
        }
    }

    componentDidUpdate(){

    }

    async login(){
        let a = await axios.post('/student/login',{student_name:this.state.name,student_password:this.state.password});
        console.log('a.data:',a.data)
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    displayLogin(){
        if (this.state.student_name===''){
            return (
                <div>
                    <h2>Name:<input name='name' onChange={e=>this.handleChange(e)}/></h2>
                    <h2>Password:<input name='password' onChange={e=>this.handleChange(e)}/></h2>
                    <button onClick={()=>this.login()}>Log In</button>
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                Student
                {this.displayLogin()}
            </div>
        )
    }
}

export default Student;
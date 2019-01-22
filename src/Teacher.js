import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Teacher extends Component{
    constructor(props){
        super(props);

        this.state={
            name:'',
            teacherInfo:''
        }
    }

    componentDidMount(){

    }

    componentDidUpdate(){

    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    async getClass(name){
        console.log('in function')
        let a = await axios.get(`/teacher/get-class-i-teach/${name}`);
        this.setState({teacherInfo:a.data});
        console.log('this.state.teacherInfo:',this.state.teacherInfo)
    }

    displayClass(){
        if (this.state.teacherInfo!==''){
            return (
                <h1>Class: {this.state.teacherInfo.class_name}</h1>
            )
        }
    }

    render(){
        return (
            <div>
                <h1><Link to='/'><button>Navigate to Student Page</button></Link></h1>
                <h3>Teacher</h3>
                <input name='name' onChange={e=>this.handleChange(e)}/><button onClick={()=>this.getClass(this.state.name)}>get class of teacher</button>
                {this.displayClass()}
            </div>
        )
    }
}

export default Teacher;
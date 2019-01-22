import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setTeacher} from './dux/reducer.js';
import DisplayTeacher from './DisplayTeacher.js';

class Student extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            student_id:0,
            student_name:'',
            all_roles:[],
            myClasses:[]
        }

        this.setMyState=this.setMyState.bind(this);
    }

    async componentDidMount(){
        let b = await axios.get('/student/get-my-classmates/');
        this.setState({all_roles:b.data});
        if (this.state.student_name === ''){
            let a = await axios.get('/student/get-student');
            console.log('a.data:',a.data)
            if (a.data.student_name){
                this.setState({student_name:a.data.student_name,student_id:a.data.student_id});
                
            }
        }
        if (this.state.student_name!==''){
            let c = await axios.get(`/student/get-my-classes/${this.state.student_name}`);
            this.setState({myClasses:c.data});
            let d = [];
            this.state.myClasses.forEach((element,index,arr)=>{d[index] = element.class_teacher});
            console.log('d:',d)
            this.props.setTeacher(d);
            setTimeout(()=>{
                console.log('this.props.teachers:',this.props.teachers)
            },1000)
        }
    }

    async componentDidUpdate(prevProps,prevState){
        if (this.state.student_name !== prevState.student_name){
            if (this.state.student_name===''){
                this.setState({myClasses:[]})
            }
            if (this.state.student_name!==''){
                let c = await axios.get(`/student/get-my-classes/${this.state.student_name}`);
                this.setState({myClasses:c.data});
                let d = [];
                this.state.myClasses.forEach((element,index,arr)=>{d[index] = element.class_teacher});
                this.props.setTeacher(d);
            }
        }
        // if (this.props.teachers.length != prevProps.teachers.length){
        //     let c = await axios.get(`/student/get-my-classes/${this.state.student_name}`);
        //     this.setState({myClasses:c.data});
        // }
    }

    async login(){
        let a = await axios.post('/student/login',{student_name:this.state.name,student_password:this.state.password});
        if (a.data.student_name){
            this.setState({student_name:a.data.student_name,student_id:a.data.student_id});
        }
    }

    async logout(){
        let a = await axios.delete('/student/logout');
        this.setState({student_name:'',student_id:0});
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

    displayLogout(){
        if (this.state.student_name!==''){
            return (
                <div>
                    <button onClick={()=>this.logout()}>Log Out</button>
                </div>
            )
        }
    }

    displayAllRoles(){
        if (this.state.student_name===''){
            return this.state.all_roles.map((element,index,arr)=>{
                return (
                    <h3>Class: {element.class_name} Student: {element.student_name}</h3>
                )
            })
        }
    }

    addClass = async (className) =>{
        let a = await axios.post('/class/add-class',{student_name:this.state.student_name,class_name:className});
        this.setState({myClasses:a.data});
        let d = [];
        this.state.myClasses.forEach((element,index,arr)=>{d[index] = element.class_teacher});
        await this.props.setTeacher(d);
    }

    editClass = async (newClassName,className) => {
        let a = await axios.put('/class/edit-class',{student_name:this.state.student_name,new_class_name:newClassName,class_name:className});
        this.setState({myClasses:a.data});
        let d = [];
        this.state.myClasses.forEach((element,index,arr)=>{d[index] = element.class_teacher});
        await this.props.setTeacher(d);
    }

    deleteClass = async (className) => {
        let a = await axios.delete(`/class/delete-class/${className}/${this.state.student_name}`);
        this.setState({myClasses:a.data})
        let d = [];
        this.state.myClasses.forEach((element,index,arr)=>{d[index] = element.class_teacher});
        await this.props.setTeacher(d);
    }

    async setMyState(a){
       this.setState({myClasses:a.data})
       let d = [];
       this.state.myClasses.forEach((element,index,arr)=>{d[index] = element.class_teacher});
       await this.props.setTeacher(d);
    }

    displayAddClass = ()=>{
        if (this.state.student_name!==''){
            return (
                <div><button onClick={()=>this.addClass('adivinations')}>Add Adivinations</button>
                <button onClick={()=>this.addClass('potions')}>Add Potions</button>
                <button onClick={()=>this.addClass('transfiguration')}>Add Transfiguration</button>
                <button onClick={()=>this.addClass('Defense Against The Dark Arts')}>Add Defense Against The Dark Arts</button>
                <button onClick={()=>this.addClass('Care Of Magical Creatures')}>Add Care Of Magical Creatures</button></div>
            )
        }
    }

    displayMyClasses(){
        if (this.state.student_name!==''){
            return this.state.myClasses.map((element,index,arr)=>{
                return (
                    <h3>Class ID: {element.class_id} Class Name: {element.class_name} Class Teacher: {element.class_teacher}
                    <button onClick={()=>this.editClass('adivinations',element.class_name)}>Edit To Adivinations</button>
                    <button onClick={()=>this.editClass('potions',element.class_name)}>Edit To Potions</button>
                    <button onClick={()=>this.editClass('transfiguration',element.class_name)}>Edit To Transfiguration</button>
                    <button onClick={()=>this.editClass('Defense Against The Dark Arts',element.class_name)}>Edit To Defense Against The Dark Arts</button>
                    <button onClick={()=>this.editClass('Care Of Magical Creatures',element.class_name)}>Edit To Care Of Magical Creatures</button>
                    <button onClick={()=>this.deleteClass(element.class_name)}>Delete</button></h3>
                )
            })
        }
    }

    displayDisplayTeacher(){
        if (this.state.student_name!==''){
            return (
                <div>
                    <DisplayTeacher student_name={this.state.student_name} setMyState={this.setMyState}/>
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                <h1><Link to='/teacher'><button>Navigate to Teacher Page</button></Link></h1>
                Student
                {this.displayLogin()}
                {this.displayLogout()}
                {this.displayAllRoles()}
                {this.displayAddClass()}
                {this.displayMyClasses()}
                {this.displayDisplayTeacher()}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{setTeacher})(Student);
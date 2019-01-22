import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setTeacher} from './dux/reducer.js';
import axios from 'axios';

class DisplayTeacher extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        setTimeout(()=>{
            console.log('this.props.teachers:',this.props.teachers)
        },2000)
    }

    displayTeachers(){
        return this.props.teachers.map((element,index,arr)=>{
            return (
                <div>
                    <h1>{index} {element}</h1>
                </div>
            )
        })
    }

    async disintegrateFiftyPercentOfTeachers(){
        let half = this.props.teachers.length % 2 === 1?(this.props.teachers.length-1)/1:this.props.teachers.length/2;
        let a = 0;
        for (let i = 0; i < half; i++){
            a = Math.floor(Math.random()*this.props.teachers.length-1);
            let a = await axios.delete(`/class/delete-class/${this.props.teachers[a]==='snape'?'potions':this.props.teachers[a]==='hagrid'?'Care Of Magical Creatures':this.props.teachers[a]==='mcgonagall'?'transfiguration':this.props.teachers[a]==='trelawney'?'adivinations':'Defense Against The Dark Arts'}/${this.props.student_name}`);
            await this.props.setMyState(a);
        }
    }

    render(){
        return (
            <div>
                <h1>Here are your teachers</h1>
                {this.displayTeachers()}
                <button onClick={()=>this.disintegrateFiftyPercentOfTeachers()}>Disintegrate 50% of My Teachers</button>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps,{setTeacher})(DisplayTeacher);
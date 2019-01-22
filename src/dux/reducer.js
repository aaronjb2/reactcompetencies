let initialState = {
    teachers:[]
}

const UPDATE_TEACHERS = 'UPDATE_TEACHERS';

export default function reducer(state=initialState,action){
    switch(action.type){
        case UPDATE_TEACHERS:
        return {
            teachers:action.teachers
        }
        default:
        return state;
    }
}

export function setTeacher(teachers){
    return {teachers,type:UPDATE_TEACHERS}
}
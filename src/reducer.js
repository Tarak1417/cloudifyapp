const count=0

export default function reducer(state=count,action){
    const {type}=action 
    switch (type){
        case "INCREMENT":
            return state+1;

        case "Decrement":
            return state-1;
        default:
            return state;
    }
}


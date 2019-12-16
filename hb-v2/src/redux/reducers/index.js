const initialState ={
    professor:{
        name: "Agus W. Soehadi",
        school: "Universitas Prasetya Mulya",
        overallRating: 4,
        numberOfReviews: 2
    }
}
export default function rootReducer(state = initialState, action){
    return state;
}
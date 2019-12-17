const initialState ={
    professor:{
        name: "Agus W. Soehadi",
        school: "Universitas Prasetya Mulya",
        overallRating: 4,
        numberOfReviews: 2,
        professorId: 1,
        reviews:[
            {
                review:"Prof agus sangat baik dalam mengajar kelas bisnis dasar! Ulangannya pake pilgan semua!",
                courseName:"Brand Management 101",
                rating:{
                    overall:4,
                    recommendation:5,
                    difficulty: 1
                },
                yearTaken:2010,
                vote:{
                    up:25,
                    down: 2
                }
            },
            {
                review:"Prof agus sangat baik dalam mengajar kelas bisnis dasar! Ulangannya pake pilgan semua!",
                courseName:"Brand Management 101",
                rating:{
                    overall:4,
                    recommendation:5,
                    difficulty: 1
                },
                yearTaken:2010,
                vote:{
                    up:25,
                    down: 2
                }
            }
        ]
    }
}
export default function rootReducer(state = initialState, action){
    return state;
}
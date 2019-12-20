import React from "react";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from "react-redux";
import Reviews from "./Reviews";

const mockStore = configureMockStore();
describe("Reviews component", () =>{
    let initialState;
    let component;
    let store;
    beforeEach(() =>{
        initialState = {
            professor: {
                "name": "Timothy Bryan",
                "school": "Universitas Indonesia",
                "reviews": [
                    {
                        "review": "He is the best!",
                        "courseName": "UX 101",
                        "overallRating": 4,
                        "recommendationRating": 4.5,
                        "difficultyRating": 2,
                        "yearTaken": 2019,
                        "helpfulUpVote": 0,
                        "helpfulDownVote": 0,
                        "reviewId": "5dfc72dd4178bc4e185dbe8f"
                    },
                    {
                        "review": "Attendance is required! Tips: give him starbucks.",
                        "courseName": "Design 101",
                        "overallRating": 4,
                        "recommendationRating": 5,
                        "difficultyRating": 2.5,
                        "yearTaken": 2018,
                        "helpfulUpVote": 0,
                        "helpfulDownVote": 0,
                        "reviewId": "5dfc733a4178bc4e185dbe91"
                    }
                ],
                "userId": "5dfc72dd4178bc4e185dbe8e",
                "numberOfReviews": 2,
                "overallRating": 4,
                "recommendationRating": 4.75,
                "difficultyRating": 2.25
            }
        }
        store = mockStore(initialState);
        component = shallow(
        <Provider store={store}>
            <Reviews/>
        </Provider>)
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
})
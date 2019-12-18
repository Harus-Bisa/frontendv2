import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from "react-redux";
import Review from "./Review";

const mockStore = configureMockStore();
describe("Review component", () =>{
    let initialState;
    let component;
    let store;
    let mockPush = jest.fn();
    beforeEach(() =>{
        initialState = {
            professor:{
                name: "Agus W. Soehadi",
                school: "Universitas Prasetya Mulya",
                overallRating: 4,
                numberOfReviews: 1,
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
                    }
                ]
            }
        }
        store = mockStore(initialState);
        component = mount(
        <Provider store={store}>
            <Review history={{push:mockPush}}/>
        </Provider>)
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
    it("Navigate to add Review page", () =>{
        let addReviewButton = component.find("#addReview").at(0)
        expect(mockPush).not.toHaveBeenCalled();
        addReviewButton.simulate("click")
        expect(mockPush).toHaveBeenCalled();
    })
})
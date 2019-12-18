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
            professor:{
                numberOfReviews:1,
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
        component = shallow(
        <Provider store={store}>
            <Reviews/>
        </Provider>)
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
})
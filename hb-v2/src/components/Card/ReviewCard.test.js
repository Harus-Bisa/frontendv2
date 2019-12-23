import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from "react-redux";
import ReviewCard from "./ReviewCard";
import { mockInitialState } from "../../redux/constants/mock";

const mockStore = configureMockStore();
describe("ReviewCard component", () =>{
    let initialState;
    let component;
    let store;
    beforeEach(() =>{
        initialState = mockInitialState
        store = mockStore(initialState);
        component = mount(
        <Provider store={store}>
            <ReviewCard id={0}/>
        </Provider>)
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
})
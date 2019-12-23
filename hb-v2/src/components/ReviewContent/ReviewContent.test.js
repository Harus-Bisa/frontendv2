import React from "react";
import {shallow} from "enzyme";
import configureMockStore from "redux-mock-store";
import '../../test-config';
import {Provider} from "react-redux";
import ReviewContent from "./ReviewContent";
import { mockInitialState } from "../../redux/constants/mock";

const mockStore = configureMockStore();
describe("Review Content component", () =>{
    let initialState;
    let component;
    let store;
    beforeEach(() =>{
        initialState = mockInitialState
        store = mockStore(initialState);
        component = shallow(
        <Provider store={store}>
            <ReviewContent/>
        </Provider>)
    })

    it("Matches snapshot", () =>{
        expect(component.html()).toMatchSnapshot();
    })
})
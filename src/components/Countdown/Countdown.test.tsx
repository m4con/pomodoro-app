import React from "react";
import {shallow} from "enzyme";
import Countdown from "./Countdown";


it('should render without crashing', () => {
    const wrapper = shallow(<Countdown />)
    expect(wrapper.find('div')).toHaveLength(1)
})

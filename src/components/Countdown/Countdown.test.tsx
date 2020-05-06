import React from "react";
import {shallow} from "enzyme";
import Countdown from "./Countdown";


it('should render without crashing', () => {
    const wrapper = shallow(<Countdown count={1} isRunning={false} />)
    expect(wrapper.find('div')).toHaveLength(1)
})

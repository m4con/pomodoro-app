import React from "react";
import {mount, ReactWrapper, shallow, ShallowWrapper} from "enzyme";
import Counter from "./Counter";


let wrapper: ShallowWrapper<React.Component["props"], React.Component["state"], React.Component>;
let wrapper2: ReactWrapper;



it("should render without crashing", () => {
    wrapper = shallow(<Counter count={0} updateCounter={(value) => {}} />);
    expect(wrapper.find('button')).toHaveLength(2)
    expect(wrapper.find('input')).toHaveLength(1)
})


it("should reflect the startCount in the input", () => {
    wrapper = shallow(<Counter count={5} updateCounter={(value) => {}} />);
    expect(wrapper.find('input').props().value).toBe(5)
})

it("should increase from 2 to 3 by clicking on increase-button", () => {
    wrapper2 = mount(<Counter count={parseInt('2')} updateCounter={(value) => {}} />);
    expect(wrapper2.find('input').props().value).toBe(2)
    wrapper2.find('#increaseCounter').simulate('click')
    wrapper2.setProps({count: 3})
    expect(wrapper2.find('input').props().value).toBe(3)
    wrapper2.unmount()
})

it("should decrease from 5 to 4 by clicking on decrease-button", () => {
    wrapper2 = mount(<Counter count={5} updateCounter={(value) => {}} />);
    expect(wrapper2.find('input').props().value).toBe(5)
    wrapper2.find('#decreaseCounter').simulate('click')
    wrapper2.setProps({count: 4})
    expect(wrapper2.find('input').props().value).toBe(4)
    wrapper2.unmount()
})

it("should change the input value if a new value is typed into", () => {
    wrapper2 = mount(<Counter count={5} updateCounter={(value) => {}} />)
    wrapper2.find('input').simulate('change', {target: {value: 9}})
    wrapper2.setProps({count: 9})
    expect(wrapper2.find('input').props().value).toBe(9)
    wrapper2.unmount()
})

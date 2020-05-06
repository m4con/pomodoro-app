import React from 'react';
import App from './App';
import {mount, ReactWrapper} from "enzyme";
import Counter from "./components/Counter/Counter";
import Countdown from "./components/Countdown/Countdown";

let wrapper: ReactWrapper<React.Component["props"], React.Component["state"], React.Component>;

describe("App", () => {
    beforeEach(() => {
        wrapper = mount(<App/>);
    })

    afterEach(() => {
        wrapper.unmount();
    })

    it('should render App without crashing', () => {
        expect(wrapper.find('.App')).toHaveLength(1);
    });

    it('should have two Counter Components', () => {
        wrapper = mount(<App/>);
        expect(wrapper.find(Counter).length).toEqual(2);
    });

    it('should have one Countdown Component', () => {
        wrapper = mount(<App/>);
        expect(wrapper.find(Countdown).length).toEqual(1);
    });
})


describe('countdown', () => {
    jest.useFakeTimers();

    beforeEach(() => {
        wrapper = mount(<App/>);
        wrapper.setState({
            sessionLength: 20,
            currentSessionLength: 20
        });
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllTimers();
        // have to call clearAllMocks() to reset the internal counter of setInterval was called
        jest.clearAllMocks();
    });


    it('should count down the Session Time every second till it is zero', () => {
        expect(wrapper.state("currentSessionLength")).toEqual(20);
        wrapper.find('.start').simulate('click')
        expect(setInterval).toHaveBeenCalledTimes(1);
        for (let i = 20; i > 0; i--) {
            jest.advanceTimersByTime(1001);
            expect(wrapper.state("currentSessionLength")).toEqual(i - 1);
        }
    });

    it('should start the countdown clicking "ok" button ', () => {
        expect(wrapper.state("currentSessionLength")).toEqual(20);
        wrapper.find('.start').simulate('click');
        expect(setInterval).toHaveBeenCalledTimes(1);
    });

    it('should have count down to 13 after 7 seconds', () => {
        wrapper.find('.start').simulate('click');
        jest.advanceTimersByTime(7001);
        expect(wrapper.state("currentSessionLength")).toEqual(13);
    });

    it('should have count down to 0 after 20 seconds', () => {
        wrapper.find('.start').simulate('click');
        jest.advanceTimersByTime(20000);
        expect(wrapper.state("currentSessionLength")).toEqual(0);
    });

    it('should call clearTimeout when 0 seconds are reached', () => {
        wrapper.setState({
            currentSessionLength: 1
        });
        wrapper.find('.start').simulate('click')
        jest.advanceTimersByTime(2001);
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });
});

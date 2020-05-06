import React, {Component} from 'react';
import './App.css';
import Counter from "./components/Counter/Counter";
import Countdown from "./components/Countdown/Countdown";


type AppState = {
    workSessionLength: number;
    breakSessionLength: number;
    isCounterRunning: boolean;
    currentSessionLength: number;
    currentSessionType: SESSION_TYPE
}

enum SESSION_TYPE {
    BREAK,
    WORK
}

class App extends Component<{}, AppState> {
    private countdownInterval: NodeJS.Timeout | undefined;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            workSessionLength: 0,
            breakSessionLength: 0,
            isCounterRunning: false,
            currentSessionLength: 0,
            currentSessionType: SESSION_TYPE.WORK
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any): void {
        if (prevState.currentSessionType !== this.state.currentSessionType) {
            this.resetCountdown();
            this.startCountdown();
        }
    }

    public startAndPauseCountdown = () => {
        if (this.state.isCounterRunning) {
            this.stopCountdown()
        } else {
            this.startCountdown()
        }
    }

    private startCountdown = () => {
        this.countdownInterval = setInterval(this.updateCurrentSessionLength, 1000)
        this.setState({isCounterRunning: true})
    }

    private stopCountdown = () => {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = undefined;
        }
        this.setState({isCounterRunning: false})
    }

    public resetCountdown = () => {
        if (this.countdownInterval !== undefined) {
            clearInterval(this.countdownInterval);
        }
        this.setState((state) => {
                let sessionLengthBasedOnType = state.workSessionLength
                if (state.currentSessionType === SESSION_TYPE.BREAK) {
                    sessionLengthBasedOnType = state.breakSessionLength
                }
                return {
                    isCounterRunning: false,
                    currentSessionLength: sessionLengthBasedOnType
                }
            }
        )
    }

    updateCurrentSessionLength = () => {
        if (this.state.currentSessionLength > 0) {
            this.setState((state) => ({
                currentSessionLength: state.currentSessionLength - 1
            }))
        } else if (this.state.currentSessionLength === 0) {
            this.setState((state) => {
                let newSessionType = SESSION_TYPE.BREAK
                if (state.currentSessionType === SESSION_TYPE.BREAK) {
                    newSessionType = SESSION_TYPE.WORK
                }
                return {
                    currentSessionType: newSessionType
                }
            })
        } else {
            throw new Error('Session Length is < 0! Something went terribly wrong!')
        }
    }

    setBreakSessionLength = (value: number) => {
        this.setState({breakSessionLength: value});
    }

    setWorkSessionLength = (value: number) => {
        this.setState({workSessionLength: value})
    }

    setCurrentSessionLength = (value: number) => {
        this.setState({currentSessionLength: value})
    }

    render() {

        return (
            <div className="App">
                <div>
                    <h3>Break Length</h3>
                    <Counter count={this.state.breakSessionLength / 60} updateCounter={(minutes) => {
                        this.setBreakSessionLength(minutes * 60)
                    }
                    }/>
                </div>

                <div>
                    <h3>Session Length</h3>
                    <Counter count={this.state.workSessionLength / 60} updateCounter={(minutes) => {
                        this.setWorkSessionLength(minutes * 60)
                    }
                    }/>
                </div>

                <div>
                    <h3>Session</h3>
                    <Countdown count={this.state.currentSessionLength} isRunning={this.state.isCounterRunning}/>
                </div>
                <button className="start" onClick={this.startAndPauseCountdown}>Start/Pause</button>
                <button className="stop" onClick={this.resetCountdown}>Reset</button>
            </div>
        );
    }
}

export default App;

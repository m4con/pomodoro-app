import React, {ChangeEvent} from 'react';

type Props = {
    count: number;
    updateCounter: (value: number) => void
}

const initialProps: Props = {
    count: 0,
    updateCounter: (value) => {
    }
}


const Counter = (props: Props = initialProps) => {

    function increaseCount() {
        props.updateCounter(props.count + 1)
    }

    function decreaseCount() {
        props.updateCounter(props.count - 1)
    }

    function changeInput(event: ChangeEvent<HTMLInputElement>) {
        props.updateCounter(parseInt(event.target.value))
    }

    return (
        <div>
            <button id="decreaseCounter" onClick={decreaseCount}>-</button>
            <input type="number" id="" value={props.count} onChange={changeInput}/>
            <button id="increaseCounter" onClick={increaseCount}>+</button>
        </div>
    );
};

export default Counter;

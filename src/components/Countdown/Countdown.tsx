import React from 'react';

type Props = {
    count: number;
    isRunning: boolean;
}


const Countdown = (props: Props) => {
    return (
        <div>
            {props.count}
        </div>
    );
};

export default Countdown;

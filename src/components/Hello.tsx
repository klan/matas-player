import React from 'react';

export default function Hello(props): JSX.Element {
    const { text } = props;

    function handleClick() {
        console.log('click');
    }

    return <button onClick={handleClick}>Hello: {text}</button>;
}


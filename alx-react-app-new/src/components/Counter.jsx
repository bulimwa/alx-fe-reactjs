import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ textAlign: 'center', margin: '2rem' }}>
            <p style={{ fontSize: '1.5rem' }}>Current Count: {count}</p>
            <button onClick={() => setCount(count + 1)} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Increment</button>
            <button onClick={() => setCount(count - 1)} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Decrement</button>
            <button onClick={() => setCount(0)} style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}>Reset</button>
        </div>
    );
}

export default Counter;

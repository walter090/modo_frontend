import React from 'react'

class FrostedGlassFilter extends React {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="blur">
                        <feGaussianBlur stdDeviation="5"/>
                    </filter>
                </defs>
            </svg>
        );
    }
}

export default FrostedGlassFilter;

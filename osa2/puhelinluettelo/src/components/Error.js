import React from 'react';

const Error = ({ message, severity }) => {
    let errorClass = "notification"
    if (severity > 1) errorClass = "error"
    if (message === null) {
        return null
    }

    return (
        <div className={errorClass}>
            {message}
        </div>
    );
};

export default Error;
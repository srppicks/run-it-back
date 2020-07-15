import React from 'react';

import classes from './Button.module.css'

const button = ( { className, purpose, name, children }) => (
    <button
        className={className}
        onClick={() => purpose(name)}>{children}</button>
);

export default button;

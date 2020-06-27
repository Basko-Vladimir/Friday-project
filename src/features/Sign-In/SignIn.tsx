import React from 'react';
import {Input} from '../../main/UI/common/Input/Input';
import {Button} from '../../main/UI/common/Button/Button';

export const SignIn = () => {
    return (
        <>
            <h1>Sign In</h1>
            <Input value={''}
                   changeInput={() => console.log('input changed')}
                   error={''} />
            <Button title={'Button'}/>
        </>
    )
};
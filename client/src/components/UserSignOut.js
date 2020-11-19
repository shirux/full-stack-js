import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = ({ context }) => {

    // On render
    useEffect(() => context.actions.signOut())

    return (
        <Redirect to="/"/>
    )
}

export default UserSignOut;
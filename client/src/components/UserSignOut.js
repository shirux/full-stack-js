import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {

    // On render
    useEffect(() => context.actions.signOut())

    return (
        <Redirect to="/"/>
    )
}
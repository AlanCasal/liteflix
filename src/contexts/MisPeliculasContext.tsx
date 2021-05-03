import React, { useContext, createContext, useState } from 'react';

export const MisPeliculasContext = createContext( null );

export const MisPeliculasContextProvider = ( { children } ) => {
    const [ misPeliculasState, setMisPeliculasState ] = useState( [] );

    const values = React.useMemo( () => (
            { misPeliculasState, setMisPeliculasState } 
        ),
        [ misPeliculasState ] 
    );

    return (
        <MisPeliculasContext.Provider value={ values }>
            { children }
        </MisPeliculasContext.Provider>
    );
}

export function useMisPeliculasContext () {
    const context = useContext( MisPeliculasContext );

    return !context
        ? console.error( 'Error deploying App Context!!!' )
        : context;
}

export default useMisPeliculasContext;

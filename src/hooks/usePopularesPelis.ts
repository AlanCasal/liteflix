import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';

export default () => {
    const [popularesPelis, setPopularesPelis] = useState([]);

    useEffect(() => {
        getPopularesPelis();
    }, []);

    const getPopularesPelis = async () => {
        try {
            const { data: { results } } = await movieDB.get('/3/movie/popular');
            
            const pelis = results
                .slice(0, 4)
                .map( peli => peli.backdrop_path );
                
            setPopularesPelis( pelis );
        }
        
        catch (err) {
            console.error('[ERROR !!!]', err);
            return err;
        }
    };

    return [ popularesPelis ];
};

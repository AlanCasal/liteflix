import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';

export default () => {
    const [proximasPelis, setProximasPelis] = useState([]);

    useEffect(() => {
        getProximasPelis();
    }, []);

    const getProximasPelis = async () => {
        try {
            const { data: { results } } = await movieDB.get('/3/movie/upcoming');

            const pelis = results
                .slice(0, 4)
                .map(peli => peli.backdrop_path);
                
            setProximasPelis( pelis );
        }
        
        catch (err) {
            console.error('[ERROR !!!]', err);
            return err;
        }
    };

    return [ proximasPelis ];
};

import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';

export default () => {
    const [peliDestacada, setPeliDestacada] = useState({});

    useEffect(() => {
        getPeliDestacada();
    }, []);

    const getPeliDestacada = async () => {
        try {
            const {
                data: { results },
            } = await movieDB.get('/3/movie/now_playing');

            const peli = results.reduce((ultimaPeli, peli) => (Date.parse(ultimaPeli.release_date) < Date.parse(peli.release_date) ? peli : ultimaPeli));

            setPeliDestacada(peli);
        }
        
        catch (err) {
            console.error('[ERROR !!!]', err);
            
            // return err;
        }
    };

    return [ peliDestacada ];
};

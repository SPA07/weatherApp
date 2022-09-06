import React, { useEffect, useState } from 'react';

const Loader = () => {

    const [ loading, setLoading ] = useState(true)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default Loader;
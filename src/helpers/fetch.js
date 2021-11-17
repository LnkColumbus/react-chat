// Peticiones sin Token
const baseURL = process.env.REACT_APP_API_URL;
export const fetchWithOutToken = async( endpoint, data, method = 'GET' ) => {
    
    const url = `${ baseURL }/auth/${ endpoint }`;

    if ( method === 'GET' ) {
        const res = await fetch( url );
        return await res.json();
    } else {
        const res = await fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await res.json();
    }
}

export const fetchWithToken = async( endpoint, data, method = 'GET' ) => {
    
    const url = `${ baseURL }/auth/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) {
        const res = await fetch( url, {
            headers: {
                'x-token': token
            }
        });
        return await res.json();
    } else {
        const res = await fetch( url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });

        return await res.json();
    }
}
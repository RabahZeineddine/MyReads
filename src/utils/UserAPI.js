
const api = "http://localhost:3001"



const headers = {
    'Accept': 'application/json',
}

export const login = (user) =>
    fetch(`${api}/login`,{
        method: 'POST',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then( res => res.json())

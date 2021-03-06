const api = "https://myreadsbackend.mybluemix.net"

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

export const signup = (user) =>
    fetch(`${api}/signup`,{
        method: 'POST',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then( res => res.json() )

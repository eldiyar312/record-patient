


export const get = async ( url: string ) => {

  return fetch(`https://rocky-refuge-77020.herokuapp.com${url}`)
    .then( res => res.json() )
}
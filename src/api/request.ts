
export const request = async ( url: string, method = 'GET', body: object ) => {

  url = `https://rocky-refuge-77020.herokuapp.com${url}`

  const form = new FormData()

  Object.entries( body ).map(([ key, val ]: any) => {
    form.append( key, val )
  })

  return await fetch( url, { method, body: form } )
    .then( async res => {
      if( !res.ok ){
        const { message }: any = await res.json()
        return { severity: 'error', message }
      }
      return res.json()
    })
}
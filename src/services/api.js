import AsyncStorage from '@react-native-community/async-storage'
import BASE from './base'

const setRole = (role) => {
    if (role === 1) return 'produtor'
    else if (role === 2) return 'responsavel'
    else if (role === 3) return 'laticinio'
    else if (role === 4) return 'tecnico'
    else return
}

export default {

    checkToken: async () => { },

    onSignIn: async (email, password) => {
        const request = await fetch(`${BASE.API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        return request
    },

    getGeneric: async (link) => {
        const request = await fetch(`${BASE.API}/${link}`)
        const response = await request.json()
        return response
    },

    getUser: async () => {
        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const request = await fetch(`${BASE.API}/${setRole(user.perfil)}/${user.id}`)
        const response = await request.json()
        return response
    },

    editUser: async (
        nome, apelido, cep, localidade, uf, bairro, logradouro, complemento
    ) => {

        const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user'))

        const headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Accept", 'application/json')

        const data = {
            nome: nome,
            apelido: apelido,
            cep: cep,
            localidade: localidade,
            uf: uf,
            bairro: bairro,
            logradouro: logradouro,
            complemento: complemento
        }

        await fetch(`${BASE.API}/${setRole(user.perfil)}/${user.id}`,
            {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            }
        )
    },

    //Pega a lista de tanques
    getTanks: async () => {
        const request = await fetch(`${BASE.API}/tanque`)
        const response = await request.json()
        return response
    },

    getCep: async (cep) => {
        const request = await fetch(`${BASE.CEP_API}/${cep}/json`)
        return request
    }
}
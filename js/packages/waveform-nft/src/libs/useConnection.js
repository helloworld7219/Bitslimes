import { Connection, clusterApiUrl } from '@solana/web3.js'
import { ref } from 'vue'

export const currentConnection = ref({
  connection: null,
  env: ''
})

export const ENDPOINTS = [

  {
    name: 'testnet',
    endpoint: clusterApiUrl('testnet')
  },
  {
    name: 'devnet',
    endpoint: clusterApiUrl('devnet')
  },
  {
    name: 'mainnet-beta',
    endpoint: 'https://api.metaplex.solana.com/'
  }
]

const getEndpointByName = (name) => {
  const ep = ENDPOINTS.find(_ep => _ep.name === name)

  return ep || ENDPOINTS[0]
}

export const initConnection = () => {
  // @TODO - USE ENV VAR
  const { name, endpoint } = getEndpointByName('testnet')

  currentConnection.value.env = name
  currentConnection.value.connection = new Connection(endpoint, 'recent')
}

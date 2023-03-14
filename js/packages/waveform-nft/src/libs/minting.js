/* eslint-disable */

import { mintNFT, Creator } from '@oyster/just-minting'

import { useSteps } from './useSteps'
import { currentConnection } from './useConnection'
import { useWallet } from './useWallet'

const stepsStorage = useSteps()

const createMetadata = (wallet) => {
  const { name, description } = stepsStorage.textData.value

  return {
    name,
    description,
    symbol: '',
    creators: [
      new Creator({
        address: wallet.publicKey.toBase58(),
        verified: true,
        share: 100
      })
    ],
    sellerFeeBasisPoints: 0,
    image: stepsStorage.waveFile.name,
    attributes: [],
    external_url: '',
    properties: {
      files: [
        {
          uri: stepsStorage.waveFile.name,
          type: 'image/jpeg'
        }
      ],
      category: 'image'
    }
  }
}

export const mintWaveNFT = () => {
  // return new Promise((resolve) => {
  //   setTimeout (()=> {
  //     resolve(true)
  //   }, 10 * 1000)
  // })

  const wallet = useWallet()
  const metaData = createMetadata(wallet)
  const { connection, env } = currentConnection.value

  const files = [stepsStorage.waveFile]

  const maxSupply = 1

  return mintNFT(connection, wallet, env, files, metaData, maxSupply)
}

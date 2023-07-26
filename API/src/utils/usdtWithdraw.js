const {ethers} = require('ethers') //importo ethers.js para interactuar con el ecosistema
const USDTABI = require('../files/usdtABI.json') // import el ABI del contrato USDT BSC TESNET

const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-2-s1.binance.org:8545') //RPC de la bsc testnet
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY

const usdtContractAddress = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd' // Direccion del contrato USDT BSC TESTNET
const usdtContractAbi = USDTABI

const usdtWithdraw = async (amount, recipientAddress) => {
  try {
    const wallet = new ethers.Wallet(walletPrivateKey, provider)
    const usdtContract = new ethers.Contract(
      usdtContractAddress,
      usdtContractAbi,
      wallet
    )

    const decimals = await usdtContract.decimals() // Obtengo los decimales del token USDT, en este caso 6
    const amountWithDecimals = ethers.utils.parseUnits(
      amount.toString(),
      decimals
    ) // Convierto el monto en su version decimales

    const gasPrice = await provider.getGasPrice() // Obtener el precio de gas actual

    const gasLimit = await usdtContract.estimateGas.transfer(
      recipientAddress,
      amountWithDecimals,
      { gasLimit: 300000 }
    ) // Definir gas maximo a usar entre el estimado y el maximo

    const tx = await usdtContract.transfer(
      recipientAddress,
      amountWithDecimals,
      { gasPrice, gasLimit }
    ) // Establecer el precio de gas en la transacción
    await tx.wait()
    console.log('Transacción exitosa:', tx.hash)
    return tx.hash
  } catch (error) {
    if (
      error.reason ===
      'execution reverted: BEP40: transfer amount exceeds balance'
    ) {
      console.log('Saldo de la wallet latam insuficientes')
    } else {
      console.error('Error en la transacción:', error)
    }
  }
}

module.exports = { usdtWithdraw }

const validateWithdrawUsdt = (walletAddressReceiver, amount) => {
  if (!walletAddressReceiver) {
    return {
      containErrors: true,
      message: 'This field is required, please enter a BSC wallet address.',
    }
  }
  if (typeof walletAddressReceiver !== 'string') {
    return {
      containErrors: true,
      message: 'Invalid BSC wallet address. Please provide a valid string.',
    }
  }

  // Longitud de la dirección
  if (
    walletAddressReceiver.length !== 42 ||
    !walletAddressReceiver.startsWith('0x')
  ) {
    return {
      containErrors: true,
      message:
        "Invalid BSC wallet address format. It should start with '0x' and have a length of 42 characters.",
    }
  }

  // Caracteres hexadecimales
  const addressBody = walletAddressReceiver.slice(2).toLowerCase(); // Convertir a minúsculas y eliminar el prefijo "0x"
  const hexChars = '0123456789abcdef';
  for (const char of addressBody) {
    if (!hexChars.includes(char)) {
      return {
        containErrors: true,
        message:
          'Invalid BSC wallet address format. It contains non-hexadecimal characters.',
      };
    }
  }

  if (!amount) {
    return {
      containErrors: true,
      message: 'This field is required, please enter an amount.',
    }
  }
  if (typeof amount !== 'number') {
    return {
      containErrors: true,
      message: 'The amount must be of type number.',
    }
  }

  return {
    containErrors: false,
  }
}

module.exports = validateWithdrawUsdt

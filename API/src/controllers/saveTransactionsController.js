const prisma = require("../db");

const saveTransaction = async (walletid, transactionsType, amount, email, walletAddress) =>{
    try {

        const data = {
          walletid: walletid,
          type: transactionsType,
          amount: amount,
        };

        if (email) {
          data.toEmail = email;
        }
    
        if (walletAddress) {
          data.toWalletAddress = walletAddress;
        }
    
        const transaction = await prisma.transaction.create({
          data: data,
        });
    
        return transaction;
      } catch (error) {
        console.log(error)
      }
}

const getTransactionsByWalletId = async (walletid, limit=null) =>{
    try {
        const queryOptions = {
            where: {
              walletid: walletid,
            },
            orderBy: {
                createdAt: 'desc', // Ordenar por mas recientes primero segun fecha de creacion
              }
          };
        
          if (limit !== null && limit !== undefined && limit !=="all") {
            queryOptions.take = limit;
          }
        
          const transactions = await prisma.transaction.findMany(queryOptions);
          return transactions;
      } catch (error) {
        console.log(error);
      }
}

module.exports = {saveTransaction, getTransactionsByWalletId}
async function validateTransferByEmail(email, amount){
    console.log("validando transferencia usuario a usuario por email")
    if(!email){
        return {
            containErrors: true,
            message: "This field is required, please enter an e-mail address.",
          };
    }
    if(!amount){
        return {
            containErrors: true,
            message: "This field is required, please enter an amount.",
          };
    }
    if(typeof amount !="number"){
        return {
            containErrors: true,
            message: "The amount must be of type number.",
          };
    }
    return {
        containErrors: false
      }
}

async function validateTransferById(id, amount){
    console.log("validando transferencia usuario a usuario por email")
    if(!id){
        return {
            containErrors: true,
            message: "This field is required, please enter an user id.",
          };
    }
    if(!amount){
        return {
            containErrors: true,
            message: "This field is required, please enter an amount.",
          };
    }
    if(typeof amount !="number"){
        return {
            containErrors: true,
            message: "The amount must be of type number.",
          };
    }

    return {
        containErrors: false
      }
}

module.exports = {validateTransferByEmail, validateTransferById}
export const getTransactionErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 4001:
      return {
        title: "User Rejection",
        description: "Transaction was not completed. Please try again."
      };
    default:
      return {
        title: "Unknown Error",
        description: "An error occurred during the transaction. Try again later."
      }
  }
}
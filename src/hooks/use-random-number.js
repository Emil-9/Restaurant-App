const useRandomNumber = () => {
  let randomNumber = Math.random() * 100000000;
  randomNumber = Math.floor(randomNumber);
  return {
    randomNumber,
  };
};
export default useRandomNumber;

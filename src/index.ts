import "./style.scss";

const { ethereum } = window;
const metamaskButton = document.getElementById("connect-metamask");
const coinBaseButton = document.getElementById("connect-coinbase");
console.log(metamaskButton);

const onClickConnect = async (provider:any) => {
  try {
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    if (accounts[0]) {
      return accounts[0];
    } else throw new Error();
  } catch (error) {
    console.error(error);
  }
};

const connectMetamaskByClick = async () => {
  let metamaskProvider = ethereum.providers?.find(
    (p: { isMetaMask?: true }) => p.isMetaMask
  );
  if (!metamaskProvider) {
    metamaskProvider = ethereum.isMetaMask ? ethereum : undefined;
  }
  if (!metamaskProvider) {
    alert("Metamask is not installed!");
  }
  const acccount = await onClickConnect(metamaskProvider);
  console.log(acccount);
};

const connectCoinbaseByClick = async () => {
  let coinbaseProvider = ethereum.providers?.find(
    (p: { isCoinbaseWallet?: true }) => p.isCoinbaseWallet
  );
  if (!coinbaseProvider) {
    coinbaseProvider = ethereum.isCoinbaseWallet ? ethereum : undefined;
  }
  if (!coinbaseProvider) {
    alert("Coinbase is not installed!");
  }
  const acccount = await onClickConnect(coinbaseProvider);
  console.log(acccount);
};

metamaskButton.addEventListener("click", connectMetamaskByClick);

coinBaseButton.addEventListener("click", connectCoinbaseByClick);

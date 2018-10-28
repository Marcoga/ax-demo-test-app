export default function getExchangeRate(currencyCode) {
  return new Promise(resolve => {
    fetch(
      "https://forex.1forge.com/1.0.3/quotes?/svc/&pairs=EURUSD,EURJPY,EURAUD,EURCHF,EURCAD&api_key=zDXQWwZM1WfAOSxtm1989a55z1cNn09e",
      {
        mode: "cors"
      }
    )
      .then(r => r.json())
      .then(jsonResponse => {
        resolve(jsonResponse);
      });
  });
}

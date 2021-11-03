export let odgovor;
const pitanja = ["Dobar dan", "Kako si", "Doviđenja"];
const odgovori = ["Pozdrav", "Dobro, hvala!", "Do idućeg susreta"];

document.addEventListener("DOMContentLoaded", () => {
  const botun = document.getElementById("chat-submit");
  botun.addEventListener("click", dohvatiPoruku);
});

function dohvatiPoruku() {
  const poljeUnos = document.getElementById("unos");
  let unos = poljeUnos.value;
  rezultat(unos);
}

function rezultat(unos) {
  let brPitanja = usporedi(unos);
  if (brPitanja > -1) {
    odgovor = odgovori[brPitanja];
  } else {
    odgovor = "Ne razumijem pitanje";
  }
}

function usporedi(ulaz) {
  let brPitanja = -1;
  for (let i = 0; i < pitanja.length; i++) {
    if (ulaz == pitanja[i]) {
      brPitanja = i;
      break;
    }
  }
  return brPitanja;
}
export let odgovor;
const pitanja = ["dobar dan", "kako si", "doviđenja"];
const odgovori = ["Pozdrav!", "Dobro, hvala!", "Do idućeg susreta"];

document.addEventListener("DOMContentLoaded", () => {
    const botun = document.getElementById("chat-submit");
    botun.addEventListener("click", dohvatiPoruku);
});

function dohvatiPoruku() {
    const poljeUnos = document.getElementById("unos");
    let unos = poljeUnos.value;
    let unos_pravi = unos.toLowerCase();
    rezultat(unos_pravi);
}

function rezultat(unos_pravi) {
    let brPitanja = usporedi(unos_pravi);
    if (brPitanja > -1) {
        odgovor = odgovori[brPitanja];
    } else {
        odgovor = "Ne razumijem pitanje.";
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

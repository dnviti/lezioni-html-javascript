// Attenzione! alla ricarica della pagina NON si resetta tutto!

// Imposta la variabile per il totale del salvadanaio
var piggyBankValue = parseFloat(localStorage.getItem("piggyBankValue") ?? 0);
var piggyBankBroken = localStorage.getItem("piggyBankBroken") === "true";

// funzione per incrementare il valore del salvadanaio
function addMoneyToPiggyBank(moneyValue) {
    if (piggyBankBroken) {
        alert("Il salvadanaio è rotto, non puoi più inserire monete!");
        return;
    }
    piggyBankValue += moneyValue / 100;
    localStorage.setItem("piggyBankValue", Math.round(piggyBankValue * 100) / 100);
}

function checkPiggyBankValue() {
    var piggyBankImg = document.getElementById("piggy-bank-img");
    var piggyBankLabel = document.getElementById("piggy-bank-label");
    if (!piggyBankBroken) {
        piggyBankLabel.innerHTML = "Il salvadanaio è ancora intatto";
        piggyBankImg.src = "img/piggy_bank_new.jpg";
        return;
    }
    if (piggyBankValue == 0) {
        piggyBankLabel.innerHTML = "Hai rotto il salvadanaio ed è vuoto!";
        piggyBankImg.src = "img/piggy_bank_empty.jpg";
    }
    else {
        piggyBankLabel.innerHTML = "Hai rotto il salvadanaio e hai trovato " + piggyBankValue + " euro!";
        piggyBankImg.src = "img/piggy_bank_full.jpg";
    }
}

function updatePiggyBank(destroy) {
    if (destroy && piggyBankBroken) {
        alert("Salvadanaio già rotto in precedenza!")
        return;
    }
    if (destroy == undefined) {
        // Se non parte rotto
        checkPiggyBankValue();
    }
    // Se non lo rompo lascio il tutto come sta
    if (!destroy) { return; }
    if (destroy && !confirm("Rompere il salvadanaio e scoprire il valore accumulato?")) { return; }

    // Se lo rompo
    piggyBankBroken = destroy;
    localStorage.setItem("piggyBankBroken", piggyBankBroken);

    piggyBankValue = Math.round(piggyBankValue * 100) / 100;

    checkPiggyBankValue();
}

function resetPiggyBank() {
    piggyBankValue = 0;
    piggyBankBroken = false;
    localStorage.setItem("piggyBankValue", piggyBankValue);
    localStorage.setItem("piggyBankBroken", piggyBankBroken);
    checkPiggyBankValue();
}

function setDateTime() {
    var date = new Date();
    var title = document.getElementById("title");
    title.innerHTML = "I miei risparmi dell'anno " + date.getFullYear();
    var datetime = document.getElementById("datetime");
    datetime.innerHTML = date.toLocaleDateString("it-IT",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
}

function showTextMoneyOnOver(id, text) {
    var elemLabel = document.getElementById(id);
    elemLabel.innerHTML = text;
}

// Codice da eseguire al termine del caricamento del layout
function onReady() {
    setDateTime();
    // Aggiorna la data ora una volta ogni 100 millisecondi
    setInterval(setDateTime, 100);
    updatePiggyBank();
}

document.addEventListener("DOMContentLoaded", onReady);
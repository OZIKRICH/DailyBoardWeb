console.log("dailyboard siap dijalankan");

// Mengambil main
const app = document.getElementById("app");



const judul = document.createElement("h2");
judul.textContent = "Selemat datang di dailyboard";
judul.style.color = "#87CEEB";
app.appendChild(judul);

const areaTema = document.createElement("div");
areaTema.id = "area-tema";

const tombolTema = document.createElement("button");
tombolTema.textContent = "Ganti Tema";
tombolTema.id = "toggle-tema";

areaTema.appendChild(tombolTema);
app.appendChild(areaTema);
    
const toggleTema = document.getElementById("toggle-tema");

//section tugas
import { semuaTugas } from "./tugas.js";
const secTugas = semuaTugas();
app.appendChild(secTugas);

//section catatan
import { semuaCatatan } from "./catatan.js";
const secCatatan = semuaCatatan();
app.appendChild(secCatatan);

// Section Quotes

import { semuaAPI } from "./api.js";
const secAPI = semuaAPI();
app.appendChild(secAPI);

//Section Cuaca


//Ganti Tema


toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeAktif = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", modeAktif ? "gelap" : "terang");
});
    
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "gelap") {
        document.body.classList.add("dark-mode");
    }
});
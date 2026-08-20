console.log("dailyboard siap dijalankan");

// Mengambil main
const app = document.getElementById("app");

let nextId = 1;

let daftarCatatan = [];

let daftarTugas = [];

let pindahItem = null;

const items = document.querySelectorAll(".tugas-item");


// Penyimpanan
function simpanKeStorage() {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

function simpanCatatanKeStorage() {
    localStorage.setItem("catatan", JSON.stringify(daftarCatatan));
}

function muatDariStorage() {
    const data = localStorage.getItem("daftarTugas");
    daftarTugas = data ? JSON.parse(data) : [];
    const dataCatatan = localStorage.getItem("catatan");
    daftarCatatan = dataCatatan ? JSON.parse(dataCatatan) : [];
}

muatDariStorage();

const judul = document.createElement("h2");
judul.textContent = "Selemat datang di dailyboard";
judul.style.color = "#87CEEB";
app.appendChild(judul);

//input search
const inputSearch = document.createElement("input");
inputSearch.id = "input-search";
app.appendChild(inputSearch);
inputSearch.addEventListener("input", (e) => {
    const all = document.querySelectorAll(".tugas-item");

    const keyWord = inputSearch.value.toLowerCase();

    all.forEach((a) => {
        const anakPertama = a.firstChild.textContent.toLowerCase();

        if (anakPertama.includes(keyWord)) {
            a.classList.remove("hide");
        }
        else {
            a.classList.add("hide");
        }
    });
});

const tombol = document.createElement("button");
tombol.textContent = "Tambah";
const tombolSemua = document.createElement("button");
tombolSemua.textContent = "Semua";
tombolSemua.addEventListener("click", () => {
    renderTugas("semua");
});
const tombolSelesai = document.createElement("button");
tombolSelesai.textContent = "Selesai";
tombolSelesai.addEventListener("click", () => {
    renderTugas("selesai");
});
const tombolBelumSelesai = document.createElement("button");
tombolBelumSelesai.textContent = "Belum Selesai";
tombolBelumSelesai.addEventListener("click", () => {
    renderTugas("belum");
});
const input = document.createElement("input");

app.appendChild(input);
app.appendChild(tombol);
app.appendChild(tombolSemua);
app.appendChild(tombolSelesai);
app.appendChild(tombolBelumSelesai);

//Section Tugas
const sectionTugas = document.createElement("div");
sectionTugas.id = "section-tugas";
app.appendChild(sectionTugas);

function tambahTugas(id) {
    daftarTugas.push({id: nextId++, nama: nama, selesai: false});
    simpanKeStorage();
    renderTugas();
}

function hapusTugas(id) {
    daftarTugas = daftarTugas.filter((t) => t.id !== id);
    simpanKeStorage();
    renderTugas();
}

function renderTugas(filter = "semua") {
    const list = document.getElementById("section-tugas");
    list.innerHTML = "";

    input.addEventListener("input", (e) => {
        console.log(input.value.trim());
    });

    const ulist = document.createElement("ul");
    list.appendChild(ulist);

    const tugasTersaring = daftarTugas.filter((t) => {
        if (filter === "selesai") return t.selesai;
        if (filter === "belum") return !t.selesai;
        return true;
    })

    tugasTersaring.forEach((tugas) => {
        const li = document.createElement("li");

        li.dataset.id = tugas.id;
        li.className = "tugas-item";
        li.textContent = tugas.nama;
        li.style.textDecoration = tugas.selesai ? "line-through" : "none";
        li.addEventListener("click", () => toggleSelesai(tugas.id));
        li.addEventListener("dblclick", () => editTugas(tugas.id));

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";

        li.setAttribute("draggable", true);

        li.addEventListener("dragstart", (e) => {
            
            pindahItem = li;
        });

        tombolHapus.addEventListener("click", (e) => {
            e.stopPropagation();
            hapusTugas(tugas.id);
        });

        li.appendChild(tombolHapus);
        ulist.appendChild(li);
    });

    list.addEventListener("dragover", (e) => e.preventDefault());
    list.addEventListener("drop", (e) => {
        e.preventDefault();

        const dropTarget = e.target.closest(".tugas-item");

        if (pindahItem !== dropTarget) {
            dropTarget.before(pindahItem);
            muatDariStorage();
        }
    });
}

tombol.addEventListener("click", () => {
    const isiInput = input.value.trim();
    tambahTugas(isiInput)
});

function editTugas(id) {
    const tugas = daftarTugas.find((t) => t.id === id);

    if (!tugas) return;

    const namaBaru = prompt("Masukkan nama tugas baru:", tugas.nama);

    if (namaBaru === null) return;

    if (!validasiInputNilai(namaBaru)) return;

    daftarTugas = daftarTugas.map((t) =>
        t.id === id ? {...t, nama: namaBaru} : t
    );
        
    simpanKeStorage();
    renderTugas();
}

function validasiInputNilai(nilai) {
    if (nilai.trim() === "") {
        alert("Input Tidak boleh kosong");
        return false;
    }
    if (nilai.length > 100) {
        alert("Input maksimal 100 karakter");
        return false;
    }
    return true;
}

function toggleSelesai(id) {
    daftarTugas = daftarTugas.map((t) => t.id === id ? {...t, selesai: !t.selesai} : t);
    renderTugas();
    simpanKeStorage();
}

renderTugas();

//section catatan
const sectionCatatan =document.createElement("div");
sectionCatatan.id = "section-catatan";
app.appendChild(sectionCatatan);

function tambahCatatan(isi) {
    daftarCatatan.push({id: Date.now(), isi, tanggal: new Date().toLocaleDateString()});
    simpanCatatanKeStorage();
    renderCatatan();
}

function hapusCatatan(id) {
    daftarCatatan = daftarCatatan.filter((t) => t.id !== id);
    simpanKeStorage();
    renderCatatan();
}

function renderCatatan() {
    const container = document.getElementById("section-catatan");
    container.innerHTML = "";

    container.appendChild(textCatatan);
    container.appendChild(tombolTambahCatatan);

    daftarCatatan.forEach((catatan) => {
        const div = document.createElement("div");
        const tombolHapusCatatan = document.createElement("button");
        tombolHapusCatatan.textContent = "Hapus";

        div.className = "catatan-item";

        div.innerHTML = `
            <p>${catatan.isi}</p>
            <small>${catatan.tanggal}</small>
        `;

        div.addEventListener("dblclick", () => {
            editCatatan(catatan.id);
        });

        tombolHapusCatatan.addEventListener("click", (e) => {
            e.stopPropagation();
            hapusCatatan(catatan.id);
        });


        container.appendChild(div);
        container.appendChild(tombolHapusCatatan);
    });
}

const textCatatan = document.createElement("textarea");

const tombolTambahCatatan = document.createElement("button");
tombolTambahCatatan.textContent = "Tambah Catatan";


textCatatan.addEventListener("input", (isi) => {
    console.log(textCatatan.value)
});

tombolTambahCatatan.addEventListener("click", () => {
    const isiCatatan = textCatatan.value;
    tambahCatatan(isiCatatan);
});

function editCatatan(id) {
    const catatan = daftarCatatan.find((c) => c.id === id);

    if (!catatan) return;

    const isiBaru = prompt(
        "Masukkan isi catatan baru:", catatan.isi
    );

    if (isiBaru === null) return;

    if (!validasiInputNilai(isiBaru)) return;

    daftarCatatan = daftarCatatan.map((c) =>
        c.id === id ? {...c, isi: isiBaru.trim()} : c
    );

    simpanCatatanKeStorage();
    renderCatatan();
}

renderCatatan();

// Section Quotes
const sectionQuotes = document.createElement("div");

const centerQuotes = document.createElement("center");
const textPembawaQuotes = document.createElement("h2");
textPembawaQuotes.textContent ="Quotes Harian";
sectionQuotes.id = "section-quotes";

app.appendChild(centerQuotes);
centerQuotes.appendChild(textPembawaQuotes);
centerQuotes.appendChild(sectionQuotes);

async function ambilKutipan() {
    try {
        const res = await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");
        const data = await res.json();
        document.getElementById("section-quotes").textContent = data.quote;
    } catch (error) {
        console.log("gagal mengambil kutipan:", error);
    }
}

ambilKutipan();

//Section Cuaca
const sectionCuaca = document.createElement("div");

const centerCuaca = document.createElement("center");

const textPembawaCuaca = document.createElement("h2");
textPembawaCuaca.textContent = "Cuaca Saat Ini";
sectionCuaca.id = "section-cuaca";

app.appendChild(centerCuaca);
centerCuaca.appendChild(textPembawaCuaca);
centerCuaca.appendChild(sectionCuaca);

const inputKota = document.createElement("input");
const tombolKota = document.createElement("button");
tombolKota.textContent = "Tampilkan Cuaca";

inputKota.addEventListener("input", () => {
    console.log(inputKota.value);
})

tombolKota.addEventListener("click", () => {
    const hasilKota = inputKota.value;
    ambilCuaca(hasilKota);
})

sectionCuaca.appendChild(inputKota);
sectionCuaca.appendChild(tombolKota);

async function ambilCuaca(kota) {
    const apiKey = "e9f99fb8b341d6cced64cec1e91a10ce";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${apiKey}&units=metric`;

    try {
        const resCuaca = await fetch(url);
        if (!resCuaca.ok) throw new Error("Kota tidak ditemukan");
        const dataCuaca = await resCuaca.json();

        document.getElementById("section-cuaca").innerHTML = `
        <p>${dataCuaca.name}; ${dataCuaca.main.temp}°C</p>
        <p>${dataCuaca.weather[0].description}</p>
        `;
    } catch (error) {
        document.getElementById("section-cuaca").textContent = error.message;
    }
}

//Load Semua Widget
const statusWidget = document.createElement("h1");
statusWidget.id = "status";

async function muatSemuawidget() {
    document.getElementById("status").textContent = "Memuat data...";

    await Promise.all([ambilKutipan(), ambilCuaca("Jakarta")]);

    document.getElementById("status").textContent = "Data berhasil dimuat";
}

app.appendChild(statusWidget);
window.addEventListener("DOMContentLoaded", muatSemuawidget());

//Ganti Tema
const tombolTema = document.createElement("button");
tombolTema.textContent = "Ganti Tema";
tombolTema.id = "toggle-tema";
app.appendChild(tombolTema);
    
const toggleTema = document.getElementById("toggle-tema");

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




//pencarian tugas

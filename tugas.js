import { simpanKeStorage, muatTugasDariStorage } from "./storage.js";

function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export function semuaTugas() {

    const sectionTugas = document.createElement("div");
    sectionTugas.id = "section-tugas";

    const judulTugas = document.createElement("h2");
    judulTugas.textContent = "Tugas";

    const kontrolTugas = document.createElement("div");
    kontrolTugas.id = "kontrol-tugas";

    const inputAreaTugas = document.createElement("div");
    inputAreaTugas.id = "input-area-tugas";

    const containerTugas = document.createElement("div");
    containerTugas.id = "container-tugas";

    const filterTugas = document.createElement("div");
    filterTugas.id = "filter-tugas";
    
    let daftarTugas = muatTugasDariStorage();

    let pindahItem = null;

    let nextId = daftarTugas.length > 0 ? Math.max(...daftarTugas.map(t => t.id)) + 1 : 1;
    
    const items = document.querySelectorAll(".tugas-item");

    //input search
    const inputSearch = document.createElement("input");
    inputSearch.id = "input-search";
    sectionTugas.appendChild(inputSearch);

    function cariTugas(keyword) {

        const all = document.querySelectorAll(".tugas-item");

        keyword = keyword.toLowerCase().trim();

        all.forEach((tugas) => {

            const namaTugas =
                tugas.firstChild.textContent.toLowerCase();

            if (namaTugas.includes(keyword)) {

                tugas.classList.remove("hide");

            } else {

                tugas.classList.add("hide");

            }

        });
    }


    const cariDenganDebounce = debounce(cariTugas, 300);


    inputSearch.addEventListener("input", () => {

        cariDenganDebounce(inputSearch.value);

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
    const inputTugas = document.createElement("input");

    filterTugas.appendChild(tombolSemua);
    filterTugas.appendChild(tombolSelesai);
    filterTugas.appendChild(tombolBelumSelesai);

    inputAreaTugas.appendChild(inputTugas);
    inputAreaTugas.appendChild(tombol);

    kontrolTugas.appendChild(inputAreaTugas);
    kontrolTugas.appendChild(inputSearch);

    sectionTugas.appendChild(judulTugas);
    sectionTugas.appendChild(kontrolTugas);
    sectionTugas.appendChild(containerTugas);
    sectionTugas.appendChild(filterTugas);

    //Section Tugas
    sectionTugas.appendChild(containerTugas);

    function tambahTugas(nama) {

        if (!validasiInputNilai(nama)) {
            return;
        }

        daftarTugas.push({
            id: nextId++,
            nama: nama.trim(),
            selesai: false
        });

        simpanKeStorage(daftarTugas);

        renderTugas();

        inputTugas.value = "";
    }

    function hapusTugas(id) {
        daftarTugas = daftarTugas.filter((t) => t.id !== id);
        simpanKeStorage(daftarTugas);
        renderTugas();
    }

    function simpanUrutan() {
        const semuaItem = containerTugas.querySelectorAll(".tugas-item");

        const urutanBaru = [];

        semuaItem.forEach((item) => {

            const id = Number(item.dataset.id);

            const tugas = daftarTugas.find((t) => t.id === id);

            if (tugas) {
                urutanBaru.push(tugas);
            }
        });

        daftarTugas = urutanBaru;

        simpanKeStorage(daftarTugas);
    }

    function renderTugas(filter = "semua") {
        const list = containerTugas;
        list.innerHTML = "";

        inputTugas.addEventListener("input", (e) => {
            console.log(inputTugas.value.trim());
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

            if (!dropTarget || !pindahItem) {
                return;
            }

            if (pindahItem === dropTarget) {
                return;
            }

            const rect = dropTarget.getBoundingClientRect();

            const posisiMouse = e.clientY - rect.top;

            const setengahTinggi = rect.height / 2;

            if (posisiMouse < setengahTinggi) {

                dropTarget.before(pindahItem);

            } else {

                dropTarget.after(pindahItem);

            }


            simpanUrutan();

            pindahItem = null;
        });
    }

    tombol.addEventListener("click", () => {
        const isiInput = inputTugas.value.trim();
        tambahTugas(isiInput)
        inputTugas.value = "";
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
            
        simpanKeStorage(daftarTugas);
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
        simpanKeStorage(daftarTugas);
    }

    renderTugas();

    return sectionTugas;
}
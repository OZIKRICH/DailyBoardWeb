import {
    simpanCatatanKeStorage,
    muatCatatanDariStorage
} from "./storage.js";

export function semuaCatatan() {

    let daftarCatatan = muatCatatanDariStorage();

    const sectionCatatan = document.createElement("div");
    sectionCatatan.id = "section-catatan";

    const judulCatatan = document.createElement("h2");
    judulCatatan.textContent = "Catatan";

    const inputAreaCatatan = document.createElement("div");
    inputAreaCatatan.id = "input-area-catatan";

    const containerCatatan = document.createElement("div");
    containerCatatan.id = "container-catatan";

    const textCatatan = document.createElement("textarea");

    textCatatan.placeholder = "Tulis catatan baru...";


    const tombolTambahCatatan = document.createElement("button");

    tombolTambahCatatan.textContent = "Tambah";

    inputAreaCatatan.appendChild(textCatatan);
    inputAreaCatatan.appendChild(tombolTambahCatatan);

    sectionCatatan.appendChild(judulCatatan);
    sectionCatatan.appendChild(inputAreaCatatan);
    sectionCatatan.appendChild(containerCatatan);

    function tambahCatatan(isi) {

        if (!validasiInputNilai(isi)) {
            return;
        }

        daftarCatatan.push({
            id: Date.now(),
            isi: isi.trim(),
            tanggal: new Date().toLocaleDateString()
        });

        simpanCatatanKeStorage(daftarCatatan);

        textCatatan.value = "";

        renderCatatan();
    }


    tombolTambahCatatan.addEventListener("click", () => {

        tambahCatatan(textCatatan.value);

    });

    function hapusCatatan(id) {

        daftarCatatan =
            daftarCatatan.filter((catatan) => catatan.id !== id);

        simpanCatatanKeStorage(daftarCatatan);

        renderCatatan();
    }

    function renderCatatan() {

        containerCatatan.innerHTML = "";


        daftarCatatan.forEach((catatan) => {

            const div = document.createElement("div");

            div.className = "catatan-item";

            const isi = document.createElement("p");

            isi.textContent = catatan.isi;

            const tanggal = document.createElement("small");

            tanggal.textContent = catatan.tanggal;

            const tombolHapusCatatan =
                document.createElement("button");

            tombolHapusCatatan.textContent = "Hapus";

            div.appendChild(isi);
            div.appendChild(tanggal);
            div.appendChild(tombolHapusCatatan);

            div.addEventListener("dblclick", () => {

                editCatatan(catatan.id);

            });

            tombolHapusCatatan.addEventListener("click", (e) => {

                e.stopPropagation();

                hapusCatatan(catatan.id);

            });

            containerCatatan.appendChild(div);

        });

    }

    function editCatatan(id) {

        const catatan =
            daftarCatatan.find((c) => c.id === id);

        if (!catatan) return;


        const isiBaru = prompt(
            "Masukkan isi catatan baru:",
            catatan.isi
        );


        if (isiBaru === null) {
            return;
        }


        if (!validasiInputNilai(isiBaru)) {
            return;
        }


        daftarCatatan = daftarCatatan.map((c) => {

                if (c.id === id) {

                    return {
                        ...c,
                        isi: isiBaru.trim()
                    };

                }

                return c;

            });


        simpanCatatanKeStorage(daftarCatatan);

        renderCatatan();

    }

    function validasiInputNilai(nilai) {

        if (nilai.trim() === "") {

            alert("Catatan tidak boleh kosong");

            return false;
        }


        if (nilai.length > 500) {

            alert("Catatan maksimal 500 karakter");

            return false;
        }


        return true;
    }

    renderCatatan();

    return sectionCatatan;
}
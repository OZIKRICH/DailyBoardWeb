export function semuaAPI() {

    const containerAPI = document.createElement("div");
    containerAPI.id = "container-api";

    const sectionQuotes = document.createElement("div");
    sectionQuotes.id = "section-quotes";

    const isiQuotes = document.createElement("p");

    const tombolReset = document.createElement("button")
    tombolReset.textContent = "Reset";

    const textPembawaQuotes = document.createElement("h2");
    textPembawaQuotes.textContent = "Quotes Harian";

    sectionQuotes.appendChild(textPembawaQuotes);
    sectionQuotes.appendChild(isiQuotes);
    sectionQuotes.appendChild(tombolReset);
    containerAPI.appendChild(sectionQuotes);


    async function ambilKutipan() {

        try {

            const res = await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");

            if (!res.ok) {
                throw new Error("Gagal mengambil quote");
            }

            const data = await res.json();

            isiQuotes.textContent = data.quote;

        } catch (error) {

            console.log("Gagal mengambil kutipan:", error);

            isiQuotes.textContent = "Gagal mengambil quotes";
        }
    }

    tombolReset.addEventListener("click", () => {
        ambilKutipan();
    });

    // Cuaca

    const sectionCuaca = document.createElement("div");
    sectionCuaca.id = "section-cuaca";

    const judulCuaca = document.createElement("h2");
    judulCuaca.textContent = "Cuaca Saat Ini";

    const pilihanCuaca = document.createElement("div");

    const tombolGPS = document.createElement("button");
    tombolGPS.textContent = "Gunakan Lokasi GPS";

    const tombolKota = document.createElement("button");
    tombolKota.textContent = "Masukkan Kota";

    const formKota = document.createElement("div");

    const inputKota = document.createElement("input");
    inputKota.placeholder = "Masukkan nama kota";

    const tombolCari = document.createElement("button");
    tombolCari.textContent = "Cari";

    const hasilCuaca = document.createElement("div");


    // Masukkan ke DOM
    sectionCuaca.appendChild(judulCuaca);

    sectionCuaca.appendChild(pilihanCuaca);

    pilihanCuaca.appendChild(tombolGPS);
    pilihanCuaca.appendChild(tombolKota);

    sectionCuaca.appendChild(formKota);

    formKota.appendChild(inputKota);
    formKota.appendChild(tombolCari);

    sectionCuaca.appendChild(hasilCuaca);

    containerAPI.appendChild(sectionCuaca);

    formKota.style.display = "none";

    // Cuaca berdasarkan kota

    async function ambilCuacaKota(kota) {

        const apiKey = "e9f99fb8b341d6cced64cec1e91a10ce";

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(kota)}&appid=${apiKey}&units=metric`;

        try {

            hasilCuaca.textContent = "Memuat cuaca...";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Kota tidak ditemukan");
            }

            const data = await response.json();

            tampilkanCuaca(data);

        } catch (error) {

            hasilCuaca.textContent = error.message;
        }
    }

    // Ambil lokasi user (kalau pake GPS)

    function ambilLokasiGPS() {

        if (!navigator.geolocation) {

            hasilCuaca.textContent = "Browser tidak mendukung GPS.";
            return;
        }


        hasilCuaca.textContent = "Meminta lokasi GPS...";

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                await ambilCuacaGPS(
                    latitude,
                    longitude
                );

            },

            (error) => {

                if (error.code === 1) {

                    hasilCuaca.textContent ="Izin lokasi ditolak.";
                } else if (error.code === 2) {

                    hasilCuaca.textContent ="Lokasi tidak tersedia.";
                } else {

                    hasilCuaca.textContent ="Gagal mendapatkan lokasi.";
                }

            }
        );
    }

    // Cuaca berdasarkan GPS

    async function ambilCuacaGPS(latitude, longitude) {

        const apiKey = "e9f99fb8b341d6cced64cec1e91a10ce";


        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        try {

            hasilCuaca.textContent = "Mengambil cuaca berdasarkan lokasi...";

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Gagal mengambil data cuaca.");
            }

            const data = await response.json();

            tampilkanCuaca(data);


        } catch (error) {

            hasilCuaca.textContent = error.message;
        }
    }

    // Tampilkan cuaca

    function tampilkanCuaca(data) {

        hasilCuaca.innerHTML = `
            <p>
                <strong>${data.name}</strong>
            </p>

            <p>
                ${data.main.temp}°C
            </p>

            <p>
                ${data.weather[0].description}
            </p>

            <p>
                Kelembapan: ${data.main.humidity}%
            </p>

            <p>
                Angin: ${data.wind.speed} m/s
            </p>
        `;
    }



    // pendengaran event pertombolan

    tombolGPS.addEventListener("click", () => {

        formKota.style.display = "none";

        ambilLokasiGPS();

    });

    tombolKota.addEventListener("click", () => {

        formKota.style.display = "block";

        inputKota.focus();

    });

    tombolCari.addEventListener("click", () => {

        const kota = inputKota.value.trim();


        if (kota === "") {

            alert("Masukkan nama kota");
            return;
        }

        ambilCuacaKota(kota);
        inputKota.value = "";
    });

    const statusWidget = document.createElement("h3");

    statusWidget.id = "status";

    statusWidget.textContent = "Memuat data...";

    containerAPI.appendChild(statusWidget);



    async function muatSemuawidget() {

        statusWidget.textContent = "Memuat data...";

        await ambilKutipan();

        statusWidget.textContent = "Data berhasil dimuat";
    }


    muatSemuawidget();

    return containerAPI;
}
// Penyimpanan
export function simpanKeStorage(daftarTugas) {
    localStorage.setItem("daftarTugas", JSON.stringify(daftarTugas));
}

export function simpanCatatanKeStorage(daftarCatatan) {
    localStorage.setItem("catatan", JSON.stringify(daftarCatatan));
}

export function muatTugasDariStorage() {
  const dataTugas = localStorage.getItem("daftarTugas");
  return dataTugas ? JSON.parse(dataTugas) : [];
}

export function muatCatatanDariStorage() {
  const dataCatatan = localStorage.getItem("catatan");
  return dataCatatan ? JSON.parse(dataCatatan) : [];
}
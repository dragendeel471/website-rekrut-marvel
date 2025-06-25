document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rekrutForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nama = document.getElementById("nama");
        const usia = document.getElementById("usia");
        const kota = document.getElementById("kota");
        const instagram = document.getElementById("instagram");
        const whatsapp = document.getElementById("whatsapp");
        const motivasi = document.getElementById("motivasi");

        const regexHuruf = /^[A-Za-z\s]+$/;
        const regexAngka = /^[0-9]+$/;

        let isValid = true;

        // Nama: hanya huruf
        if (!regexHuruf.test(nama.value.trim())) {
            document.getElementById("error-nama").innerText = "Nama hanya boleh huruf dan spasi.";
            isValid = false;
        } else {
            document.getElementById("error-nama").innerText = "";
        }

        // Usia: harus diisi
        if (!usia.value.trim()) {
            document.getElementById("error-usia").innerText = "Usia wajib diisi.";
            isValid = false;
        } else {
            document.getElementById("error-usia").innerText = "";
        }

        // Kota: hanya huruf
        if (!regexHuruf.test(kota.value.trim())) {
            document.getElementById("error-kota").innerText = "Kota hanya boleh huruf dan spasi.";
            isValid = false;
        } else {
            document.getElementById("error-kota").innerText = "";
        }

        // Instagram: tambahkan '@' kalau belum ada
        if (instagram.value.trim() && !instagram.value.startsWith("@")) {
            instagram.value = "@" + instagram.value.trim();
        }
        document.getElementById("error-instagram").innerText = "";

        // WhatsApp: hanya angka
        if (!regexAngka.test(whatsapp.value.trim())) {
            document.getElementById("error-whatsapp").innerText = "Nomor WA hanya boleh angka.";
            isValid = false;
        } else {
            document.getElementById("error-whatsapp").innerText = "";
        }

        // Motivasi
        if (!motivasi.value.trim()) {
            document.getElementById("error-motivasi").innerText = "Tulis motivasi kamu.";
            isValid = false;
        } else {
            document.getElementById("error-motivasi").innerText = "";
        }

        if (!isValid) {
            document.getElementById("notif").style.display = "block";
            return;
        }

        // Redirect ke WhatsApp jika valid
        const waNumber = whatsapp.value.trim();
        const waMessage = `Halo! Saya ${nama.value}, usia ${usia.value}, dari ${kota.value}. Instagram saya ${instagram.value}. Saya tertarik join karena: ${motivasi.value}`;

        const encodedMessage = encodeURIComponent(waMessage);
        window.location.href = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    });
});

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

        // Validasi Nama
        if (!regexHuruf.test(nama.value.trim())) {
            document.getElementById("error-nama").innerText = "Nama hanya boleh huruf dan spasi.";
            isValid = false;
        } else {
            document.getElementById("error-nama").innerText = "";
        }

        // Validasi Usia
        if (!usia.value.trim()) {
            document.getElementById("error-usia").innerText = "Usia wajib diisi.";
            isValid = false;
        } else {
            document.getElementById("error-usia").innerText = "";
        }

        // Validasi Kota
        if (!regexHuruf.test(kota.value.trim())) {
            document.getElementById("error-kota").innerText = "Kota hanya boleh huruf dan spasi.";
            isValid = false;
        } else {
            document.getElementById("error-kota").innerText = "";
        }

        // Format Instagram
        if (instagram.value.trim() && !instagram.value.startsWith("@")) {
            instagram.value = "@" + instagram.value.trim();
        }
        document.getElementById("error-instagram").innerText = "";

        // Validasi WhatsApp
        if (!regexAngka.test(whatsapp.value.trim())) {
            document.getElementById("error-whatsapp").innerText = "Nomor WA hanya boleh angka.";
            isValid = false;
        } else {
            document.getElementById("error-whatsapp").innerText = "";
        }

        // Validasi Motivasi
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

        // Kirim ke Google Form
        const formData = new FormData();
        formData.append("entry.2089161601", nama.value);       // Nama
        formData.append("entry.996133752", usia.value);         // Usia
        formData.append("entry.1317904197", kota.value);        // Kota
        formData.append("entry.723704522", instagram.value);    // Instagram
        formData.append("entry.1167887959", whatsapp.value);    // WA
        formData.append("entry.567287603", motivasi.value);     // Motivasi

        fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSd7BnccJxOuFhss3Uc87ZT8-bXpFQ-1gE3JPK4vB9eCvo7UbA/formResponse", {
            method: "POST",
            mode: "no-cors",
            body: formData
        }).then(() => {
            const waMessage = `Halo! Saya ${nama.value}, usia ${usia.value}, dari ${kota.value}. Instagram saya ${instagram.value}. Saya tertarik join karena: ${motivasi.value}`;
            const encoded = encodeURIComponent(waMessage);
            window.location.href = `https://wa.me/${whatsapp.value}?text=${encoded}`;
        }).catch(() => {
            alert("Gagal kirim data ke Google Form. Coba ulangi.");
        });
    });
});


document.getElementById('rekrutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const usia = document.getElementById('usia').value.trim();
    const kota = document.getElementById('kota').value.trim();
    const instagram = document.getElementById('instagram').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const motivasi = document.getElementById('motivasi').value.trim();

    let valid = true;

    const fields = [
        { id: 'nama', value: nama },
        { id: 'usia', value: usia },
        { id: 'kota', value: kota },
        { id: 'whatsapp', value: whatsapp },
        { id: 'motivasi', value: motivasi },
    ];

    document.getElementById('notif').style.display = 'none';
    fields.forEach(field => {
        const errorElement = document.getElementById('error-' + field.id);
        if (!field.value) {
            errorElement.textContent = "Tolong isi data ini";
            valid = false;
        } else {
            errorElement.textContent = "";
        }
    });

    if (!valid) {
        document.getElementById('notif').style.display = 'block';
        return;
    }

    const formData = new FormData();
    formData.append("entry.664818392", nama);
    formData.append("entry.972541376", usia);
    formData.append("entry.1089763777", kota);
    formData.append("entry.2067304660", instagram);
    formData.append("entry.630701239", whatsapp);
    formData.append("entry.507833687", motivasi);

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSeslOdIv7aJykg4cVP_qfGuiJNQpwJCmZ-6kEi4cq01wBQ9vA/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
    });

    const pesanWA = `Halo! Saya ${nama}, usia ${usia} dari ${kota}. IG: ${instagram || '-'} | WA: ${whatsapp}. Alasan saya tertarik join: ${motivasi}`;
    const linkWA = `https://wa.me/${whatsapp.replace(/^0/, '62')}?text=${encodeURIComponent(pesanWA)}`;
    setTimeout(() => {
        window.location.href = linkWA;
    }, 300);
});

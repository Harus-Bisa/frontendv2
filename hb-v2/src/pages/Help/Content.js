import React from "react"
import { Link } from "react-router-dom";
const content = {
    "faqs":[
        {
            "question": "Bagaimana apabila tidak ada nama Dosen saya disini?",
            "answer": (
                <React.Fragment>
                    <p>Anda bisa menambahkan nama dosen baru dengan cara:</p>
                    <ol>
                        <li>Masukan nama dan universitas dosen ke kotak pencarian di halaman utama dan tekan logo kaca pembesar.</li>
                        <li>Klik “Jadilah Penulis Pertama”</li>
                    </ol>
                </React.Fragment>
            )
        },
        {
            "question": "Cara membuat review",
            "answer": (
                <React.Fragment>
                    <ol>
                        <li>Masuk ke halaman Dosen yang Anda mau review</li>
                        <li>Klik penilaian anda di kotak “Tulis Review Anda”. Ini terletak di sisi atas-kiri di setiap halaman Dosen</li>
                        <li>Isi review Anda</li>
                        <li>Kirim Review Anda</li>
                    </ol>
                </React.Fragment>
            )
        },
        {
            "question": "Bagaimana cara menghitung penilaian overall?",
            "answer": <p>Penilaian yang tercantum pada setiap halaman Dosen merupakan rata-rata dari semua nilai yang telah diberikan oleh mahasiswa yang menuliskan review.</p>
        },
        {
            "question": "Bagaimana cara tahu penulis review?",
            "answer": <p>Review diberikan secara anonimus. Tolong lihat kembali ke halaman <Link to="/info/privacypolicy">Kebijakan Privasi</Link>.</p>
        }
    ]
}

export default content;
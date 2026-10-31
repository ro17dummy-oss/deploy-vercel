# Graphify Report — Nox Aion 4.8 Multi-Page Frontend Framework

## Summary
- **Total Nodes**: 11 (6 HTML Multi-Page Views, 1 Shared JS Engine, 2 CSS Modules, 2 AION 4.8 MySQL Schemas)
- **Architecture Pattern**: Multi-Page Etalase Publik + Auth-Gated Credit & Profile Panel (`localStorage` shared session state untuk simulasi frontend sebelum integrasi backend Laravel).

## God Nodes (Central Hubs)
1. **`assets/aion20/nox-app.js`** — Mengelola sesi login lintas halaman, visibilitas saldo Credit (`#headerCreditBtn[hidden]` saat guest), pembelian Marketplace, aktivasi Prestige Pack, filter Rank List, preview hash SHA-1 Base64 di `register.html`, serta manajemen karakter & Unstuck di `account.html`.
2. **`assets/aion20/styles/nox-modules.css`** — Menyediakan komponen UI Dark Fantasy untuk subpage hero, auth-notice banner, katalog Marketplace, kartu Prestige Pack, tabel Abyss Rank, halaman Register 2-kolom, dan dashboard Profile Panel.

## Page Routing & Auth Flow
| Halaman | File | Akses Guest (Sebelum Login) | Akses Member (Setelah Login) |
|---|---|---|---|
| **Beranda** | `index.html` | Penuh (Hero Video, Player Online Telemetry, Ringkasan Fitur, Unduh Client) | Penuh + Pill Saldo Credit & tombol Profile Panel di Header |
| **Marketplace** | `marketplace.html` | **Etalase Publik**: Bisa filter kategori, cari item, & lihat tooltip stat database; klik **Beli** diarahkan ke Login | **Transaksi Aktif**: Klik **Beli via Credit** langsung memotong saldo Credit & mengirim Express Mail ke karakter aktif |
| **Prestige Pack** | `prestige.html` | **Etalase Publik**: Bisa melihat 3 tier VIP & tabel perbandingan benefit; klik **Aktifkan** diarahkan ke Login | **Aktivasi Langsung**: Klik **Aktifkan** memotong Credit & meng-upgrade tier `account_data.membership` |
| **Rank List** | `ratings.html` | **Publik**: Filter Elyos/Asmodian, urutkan GP/AP/PvP Kills, cari karakter/legion | Sama seperti publik |
| **Buat Akun** | `register.html` | Formulir registrasi akun baru + live preview SHA-1 Base64 + klaim ◈ 500 Credit awal | Otomatis masuk sesi member setelah submit |
| **Profile Panel** | `account.html` | Menampilkan Form Login + tombol **⚡ Masuk Instan Akun Demo** | Menampilkan **Profile Panel Daeva** (Dompet Credit, Pilihan Karakter Penerima Item, Unstuck, Riwayat Transaksi, Ganti Password) |

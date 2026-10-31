/* ============================================================
   NOX AION 4.8 — Multi-Page Frontend Engine & Mock API Adapter
   Pages: index.html, marketplace.html, prestige.html,
          ratings.html, register.html, account.html
   ============================================================ */
(function () {
  'use strict';

  // shortcut: localStorage mock store until AION 4.8 backend API is built, set useMock = false and configure baseUrl when backend is ready
  const API_CONFIG = {
    useMock: true,
    baseUrl: '/api/v1',
    endpoints: {
      status: '/server/status',
      register: '/auth/register',
      login: '/auth/login',
      marketplace: '/marketplace/items',
      buyItem: '/marketplace/buy',
      prestige: '/prestige/subscribe',
      rankings: '/rankings/abyss',
      topup: '/credit/topup'
    }
  };

  /* -------------------- INITIAL MOCK DATA (AION 4.8 SCHEMA) -------------------- */
  const INITIAL_MARKET_ITEMS = [
    {
      id: 100210001,
      name: "Beritra's Phantom Greatsword",
      category: "weapon",
      categoryLabel: "Senjata",
      grade: "mythic",
      gradeLabel: "Mythic",
      enchant: "+15",
      qty: 1,
      price: 1850,
      seller: "Web Shop [Official]",
      icon: "assets/aion20/assets/items/1.jpg",
      levelReq: 65,
      stats: ["Attack: 482 - 510", "PvP Attack: +12.5%", "Crit Strike: +140", "Attack Speed: +19%"],
      manastones: ["Crit Strike +19", "Crit Strike +19", "Attack +6", "Attack +6", "Accuracy +30", "Crit Strike +19"],
      godstone: "Godstone: Kaisinel's Fantasy (2% peluang 3,760 Water Damage)"
    },
    {
      id: 187000149,
      name: "Sayap Kaisar Balaurea (Wings of Resplendence)",
      category: "armor",
      categoryLabel: "Armor & Sayap",
      grade: "mythic",
      gradeLabel: "Mythic",
      enchant: "+15",
      qty: 1,
      price: 1400,
      seller: "Web Shop [Official]",
      icon: "assets/aion20/assets/items/3.jpg",
      levelReq: 65,
      stats: ["Flight Time: +85", "Max HP: +680", "Strike Resist: +95", "PvP Defense: +4.2%"],
      manastones: ["HP +105", "HP +105", "Crit Spell +17", "Magic Suppression +50"],
      godstone: "Efek Set: Kecepatan Terbang Maksimum di Kaldor & Levinshor"
    },
    {
      id: 110900812,
      name: "Seraph Breastplate Set (Governor 4.8)",
      category: "armor",
      categoryLabel: "Armor & Sayap",
      grade: "mythic",
      gradeLabel: "Mythic",
      enchant: "+15",
      qty: 1,
      price: 2200,
      seller: "Broker: Mirinda",
      icon: "assets/aion20/assets/items/4.jpg",
      levelReq: 65,
      stats: ["Physical Def: 1,890", "Magic Supp: 840", "PvP Defense: +18.4%", "Enmity Boost: +14%"],
      manastones: ["Attack +5 / Crit +8", "Attack +5 / Crit +8", "HP +105", "HP +105", "Block +29", "Block +29"],
      godstone: "Abyss Rank Req: 2-Star Officer atau lebih tinggi"
    },
    {
      id: 114001205,
      name: "Sepatu Tahabata's Swift Greaves",
      category: "armor",
      categoryLabel: "Armor & Sayap",
      grade: "eternal",
      gradeLabel: "Eternal",
      enchant: "+15",
      qty: 1,
      price: 650,
      seller: "Broker: Kaelen",
      icon: "assets/aion20/assets/items/2.jpg",
      levelReq: 65,
      stats: ["Speed: +22%", "Physical Def: 540", "Evasion: +184", "PvP Defense: +3.8%"],
      manastones: ["Crit Strike +17", "Crit Strike +17", "Attack +5", "Attack +5", "Accuracy +29"],
      godstone: "Tradeable via Web Broker Escrow"
    },
    {
      id: 120015022,
      name: "Anting Kunax's Conqueror Earring",
      category: "armor",
      categoryLabel: "Aksesoris",
      grade: "mythic",
      gradeLabel: "Mythic",
      enchant: "+5",
      qty: 2,
      price: 920,
      seller: "Web Shop [Official]",
      icon: "assets/aion20/assets/items/5.jpg",
      levelReq: 65,
      stats: ["PvP Attack: +4.8%", "Magic Accuracy: +88", "Accuracy: +145", "Max HP: +410"],
      manastones: ["Tempering Level +5 (+7.5% PvP Attack)"],
      godstone: "Paket isi 2 pcs (Kiri & Kanan)"
    },
    {
      id: 122014409,
      name: "Cincin Archdaeva Abyssal Ring",
      category: "armor",
      categoryLabel: "Aksesoris",
      grade: "eternal",
      gradeLabel: "Eternal",
      enchant: "+5",
      qty: 2,
      price: 540,
      seller: "Broker: Vaelor",
      icon: "assets/aion20/assets/items/6.jpg",
      levelReq: 65,
      stats: ["Magic Boost: +112", "Magic Crit: +28", "PvP Attack: +3.6%", "MP: +520"],
      manastones: ["Tempering Level +5 (Magic Boost +65)"],
      godstone: "Cocok untuk Sorcerer / Spiritmaster / Songweaver"
    },
    {
      id: 166030005,
      name: "Omega Enchantment Stone Bundle",
      category: "consumable",
      categoryLabel: "Consumable",
      grade: "fabled",
      gradeLabel: "Fabled",
      enchant: "",
      qty: 10,
      price: 450,
      seller: "Web Shop [Official]",
      icon: "assets/aion20/assets/items/11.jpg",
      levelReq: 1,
      stats: ["Success Rate Enchant: +35% untuk Mythic", "Aman digunakan hingga +15", "Bisa digabung dengan Suppl. Mythic"],
      manastones: ["Bundle isi 10 batu Omega"],
      godstone: "Dikirim langsung ke In-game Mail karakter"
    },
    {
      id: 162000107,
      name: "Superior Recovery Serum & Courage Scroll Pack",
      category: "consumable",
      categoryLabel: "Consumable",
      grade: "fabled",
      gradeLabel: "Fabled",
      enchant: "",
      qty: 200,
      price: 180,
      seller: "Web Shop [Official]",
      icon: "assets/aion20/assets/items/14.jpg",
      levelReq: 50,
      stats: ["200x Superior Recovery Serum", "200x Greater Courage Scroll (+9% Attack Speed)", "200x Greater Running Scroll (+30% Speed)"],
      manastones: ["Siap tempur untuk Siege Katalam / Kaldor"],
      godstone: "Instan masuk kotak surat karakter"
    }
  ];

  const PRESTIGE_PACKAGES = [
    {
      id: "prestige_1",
      tier: 1,
      badge: "Membership Level 1",
      name: "Daeva Starter Pass",
      duration: "7 Hari",
      price: 350,
      featured: false,
      perks: [
        "<b>+30% EXP & Drop Rate</b> di seluruh map Balaurea",
        "<b>+15% Abyss Points (AP)</b> dari PvP & Fortress Siege",
        "Cooldown Instance berkurang <b>25%</b>",
        "Bonus harian <b>20 Credit (Toll)</b> saat login",
        "Bebas pajak komisi Broker In-game"
      ]
    },
    {
      id: "prestige_2",
      tier: 2,
      badge: "Paling Populer · VIP Level 2",
      name: "Archon Prestige Pack",
      duration: "30 Hari",
      price: 1150,
      featured: true,
      perks: [
        "<b>+60% EXP, Drop Rate & Kinah</b>",
        "<b>+30% Abyss Points (AP) & +20% Glory Points (GP)</b>",
        "Reset Instance Ekstra (+1x Sauro, Danuar, Runadium)",
        "Bonus harian <b>45 Credit (Toll)</b> + 5x Ceramium Medal",
        "Buff Atreian Blessing (HP +500, Speed +5%) permanen",
        "Title Eksklusif: <b>[Protector of Atreia]</b>"
      ]
    },
    {
      id: "prestige_3",
      tier: 3,
      badge: "Supreme · VIP Level 3",
      name: "Siel's Supreme Patronage",
      duration: "90 Hari",
      price: 2900,
      featured: false,
      perks: [
        "<b>+100% EXP & Drop Rate</b> + Prioritas Antrian Login",
        "<b>+40% Abyss Points (AP) & +30% Glory Points (GP)</b>",
        "Akses Buff Command <b>.buff</b> kapan saja di luar PvP",
        "Bonus harian <b>75 Credit (Toll)</b> + Kotak Manastone Kuno",
        "Bebas biaya Soul Healing & Teleportasi seluruh map",
        "Mount Mythic Permanen: <b>Spectral Kirin</b>"
      ]
    }
  ];

  const INITIAL_RANKINGS = [
    { pos: 1, name: "Mirinda", legion: "Sovereign", race: "elyos", classKey: "spiritmaster", className: "Spiritmaster", level: 65, rankTitle: "Supreme Commander", gp: 48920, ap: 14820400, kills: 9412, winrate: 81 },
    { pos: 2, name: "Kaelen", legion: "Nocturne", race: "asmodian", classKey: "gladiator", className: "Gladiator", level: 65, rankTitle: "Supreme Commander", gp: 46510, ap: 13910200, kills: 11204, winrate: 78 },
    { pos: 3, name: "Vaelor", legion: "Sovereign", race: "elyos", classKey: "sorcerer", className: "Sorcerer", level: 65, rankTitle: "Commander", gp: 42180, ap: 11240000, kills: 8340, winrate: 76 },
    { pos: 4, name: "Nyxia", legion: "Crimson Dawn", race: "asmodian", classKey: "assassin", className: "Assassin", level: 65, rankTitle: "Great General", gp: 39450, ap: 10850300, kills: 12085, winrate: 74 },
    { pos: 5, name: "Aetherion", legion: "Aegis", race: "elyos", classKey: "templar", className: "Templar", level: 65, rankTitle: "Great General", gp: 37900, ap: 9640100, kills: 6190, winrate: 79 },
    { pos: 6, name: "Seraphina", legion: "Sovereign", race: "elyos", classKey: "priest", className: "Cleric", level: 65, rankTitle: "General", gp: 35120, ap: 8920500, kills: 4820, winrate: 84 },
    { pos: 7, name: "Draven", legion: "Nocturne", race: "asmodian", classKey: "ranger", className: "Ranger", level: 65, rankTitle: "General", gp: 33840, ap: 8410000, kills: 8910, winrate: 71 },
    { pos: 8, name: "Lyra", legion: "Crimson Dawn", race: "asmodian", classKey: "chanter", className: "Chanter", level: 65, rankTitle: "5-Star Officer", gp: 31200, ap: 7650900, kills: 5430, winrate: 73 },
    { pos: 9, name: "Zephyr", legion: "Aegis", race: "elyos", classKey: "assassin", className: "Assassin", level: 65, rankTitle: "5-Star Officer", gp: 29850, ap: 7120400, kills: 7890, winrate: 69 },
    { pos: 10, name: "Morgath", legion: "Oblivion", race: "asmodian", classKey: "sorcerer", className: "Sorcerer", level: 65, rankTitle: "5-Star Officer", gp: 28400, ap: 6890000, kills: 6720, winrate: 68 },
    { pos: 11, name: "Caelum", legion: "Aegis", race: "elyos", classKey: "gladiator", className: "Gladiator", level: 65, rankTitle: "4-Star Officer", gp: 26110, ap: 6120000, kills: 5980, winrate: 66 },
    { pos: 12, name: "Sylvana", legion: "Oblivion", race: "asmodian", classKey: "priest", className: "Cleric", level: 65, rankTitle: "4-Star Officer", gp: 24900, ap: 5840300, kills: 3910, winrate: 75 }
  ];

  const INITIAL_NEWS = [
    {
      id: "news_1",
      category: "update",
      tagClass: "update",
      tagLabel: "Patch 4.8 Upheaval",
      date: "29.10.2026",
      readTime: "4 Menit Baca",
      image: "assets/aion20/assets/hero-bg.jpg",
      title: "Peluncuran Resmi Nox Aion 4.8: Kontinen Balaurea Baru, Siege Kaldor & Web Marketplace",
      excerpt: "Selamat datang di era baru Atreia! Pembaruan 4.8 menghadirkan peta Levinshor & Kaldor, sistem Stigma Vision baru, serta sinkronisasi penuh Web Marketplace dan Credit.",
      content: `
        <p>Para Daeva yang terhormat, server <b>Nox Aion 4.8 (Upheaval)</b> kini resmi beroperasi penuh dengan arsitektur database real-time yang menghubungkan in-game server dengan portal komunitas.</p>
        <h4>Sorotan Pembaruan Patch 4.8</h4>
        <ul>
          <li><b>Revolusi Sistem Stigma &amp; Vision Stigma:</b> Slot stigma kini lebih ramping dengan pembukaan otomatis <b>Vision Stigma</b> ketika seluruh kombinasi stigma terpasang.</li>
          <li><b>Zona Pertempuran Levinshor &amp; Kaldor:</b> Perebutkan benteng Anoha dan Wealhtheow's Keep bersama Legion Anda untuk mengklaim medali Ceramium dan Glory Points (GP).</li>
          <li><b>Integrasi Web Marketplace &amp; Express Mail:</b> Belanja senjata Mythic, sayap, dan consumable langsung dari website; item terkirim otomatis ke karakter pilihan Anda dalam hitungan detik.</li>
        </ul>
      `
    },
    {
      id: "news_2",
      category: "pvp",
      tagClass: "pvp",
      tagLabel: "Event Siege & PvP",
      date: "28.10.2026",
      readTime: "3 Menit Baca",
      image: "assets/aion20/assets/advantages-bg.jpg",
      title: "Jadwal Fortress Siege Kaldor, Katalam & Pangaea — Perebutkan 2x Glory Points Akhir Pekan",
      excerpt: "Siapkan aliansi Elyos dan Asmodian Anda! Setiap Jumat hingga Minggu malam, seluruh Fortress Siege memberikan 2x lipat Glory Points (GP) dan kotak Ceramium ekstra.",
      content: `
        <p>Pertempuran memperebutkan peringkat <b>Supreme Commander</b> dan <b>Governor</b> di tabel <code>al_server_gs.abyss_rank</code> semakin memanas pekan ini!</p>
        <h4>Jadwal &amp; Hadiah Siege Akhir Pekan</h4>
        <ul>
          <li><b>Jumat (20:00 WIB):</b> Wealhtheow's Keep (Kaldor) — Hadiah Pemenang: <b>+350 GP</b> &amp; 5x Ceramium Medal.</li>
          <li><b>Sabtu (20:00 WIB):</b> Crimson Temple &amp; Sillus Fortress — Hadiah Pemenang: <b>+400 GP</b> &amp; Kotak Manastone Kuno.</li>
          <li><b>Minggu (21:00 WIB):</b> Pertempuran Antar-Fraksi Pangaea — Bonus <b>500 Credit (Toll)</b> untuk 20 kontributor DPS/Heal tertinggi.</li>
        </ul>
      `
    },
    {
      id: "news_3",
      category: "event",
      tagClass: "event",
      tagLabel: "Promo & Event",
      date: "27.10.2026",
      readTime: "2 Menit Baca",
      image: "assets/aion20/assets/launcher-shot.png",
      title: "Hadiah Pendaftaran Akun Baru: Klaim 500 Credit Gratis & Daeva Starter Pass",
      excerpt: "Setiap pendaftar akun baru melalui halaman Register otomatis mendapatkan saldo awal 500 Credit di dompet account_data.toll serta paket perlengkapan Daevanion.",
      content: `
        <p>Untuk menyambut gelombang pemain baru di Nox Aion 4.8, seluruh akun yang dibuat melalui halaman <b>Register</b> akan langsung menerima paket akselerasi awal:</p>
        <h4>Daftar Bonus Pendaftaran</h4>
        <ul>
          <li><b>Saldo Awal ◈ 500 Credit Gratis:</b> Dapat langsung digunakan di halaman Marketplace atau untuk mengaktifkan <b>Daeva Starter Pass</b>.</li>
          <li><b>Set Perlengkapan Daevanion &amp; Sayap Atreia:</b> Dikirim otomatis ke kotak surat karakter pertama yang Anda buat di dalam game.</li>
          <li><b>Bonus +30% EXP Leveling:</b> Mempercepat perjalanan karakter Anda menuju level maksimal 65.</li>
        </ul>
      `
    },
    {
      id: "news_4",
      category: "guide",
      tagClass: "guide",
      tagLabel: "Panduan Daeva",
      date: "25.10.2026",
      readTime: "5 Menit Baca",
      image: "assets/aion20/assets/hero-bg.jpg",
      title: "Panduan Lengkap Instance Runadium, Danuar Sanctuary & Sauro Supply Base",
      excerpt: "Pelajari mekanik boss Grendal the Witch, cara mengumpulkan gear Mythic 65, serta tips mengoptimalkan ekstra entry dari Archon Prestige Pack.",
      content: `
        <p>Memasuki level 65, terdapat tiga instance utama yang wajib Anda taklukkan bersama grup untuk mendapatkan senjata dan armor <b>Mythic</b> terbaik di patch 4.8:</p>
        <h4>Rekomendasi Progres Gear Lv.65</h4>
        <ul>
          <li><b>Sauro Supply Base (1–2 Kunci):</b> Tempat terbaik mengumpulkan aksesoris Eternal/Mythic dan bahan komposit manastone.</li>
          <li><b>Runadium (Grendal):</b> Menjatuhkan senjata <b>Enraged Hyperion / Beritra Mythic</b> dengan stat PvE &amp; PvP tertinggi.</li>
          <li><b>Tips Member Prestige:</b> Gunakan status <b>Archon Prestige Pack (Tier 2)</b> untuk mengurangi waktu tunggu cooldown instance hingga 25%–50%.</li>
        </ul>
      `
    },
    {
      id: "news_5",
      category: "community",
      tagClass: "community",
      tagLabel: "Sistem & Keamanan",
      date: "22.10.2026",
      readTime: "3 Menit Baca",
      image: "assets/aion20/assets/advantages-bg.jpg",
      title: "Pembaruan Sistem Anti-Cheat Launcher & Fitur Unstuck Mandiri di Profile Panel",
      excerpt: "Kami telah mengaktifkan proteksi paket jaringan pada port 2106/7777 serta menghadirkan tombol Unstuck instan di Profile Panel untuk karakter yang tersangkut.",
      content: `
        <p>Kenyamanan dan keadilan bermain di Nox Aion 4.8 adalah prioritas utama kami. Pembaruan infrastruktur minggu ini mencakup:</p>
        <h4>Detail Peningkatan Layanan</h4>
        <ul>
          <li><b>Fitur Unstuck Mandiri:</b> Jika karakter Anda terjebak di koordinat map yang rusak, cukup buka <b>Profile Panel → Karakter &amp; Unstuck</b> dan klik tombol <b>Unstuck</b>.</li>
          <li><b>Enkripsi Akun SHA-1 Base64:</b> Seluruh perubahan password di website langsung tersinkronisasi secara aman dengan tabel <code>al_server_ls.account_data</code>.</li>
        </ul>
      `
    },
    {
      id: "news_6",
      category: "event",
      tagClass: "event",
      tagLabel: "Turnamen Legion",
      date: "19.10.2026",
      readTime: "4 Menit Baca",
      image: "assets/aion20/assets/launcher-shot.png",
      title: "Kompetisi Bulanan Top 10 Abyss Rank: Total Hadiah 25.000 Credit & Title Eksklusif",
      excerpt: "Sepuluh Daeva dengan perolehan Glory Points (GP) dan PvP Kills tertinggi di halaman Rank List setiap akhir bulan akan menerima hadiah Credit berlimpah.",
      content: `
        <p>Tunjukkan dominasi karakter dan Legion Anda di halaman <b>Abyss &amp; PvP Rank List</b>! Pada tanggal 1 setiap bulannya, sistem akan merekap peringkat teratas:</p>
        <h4>Hadiah Peringkat Bulanan</h4>
        <ul>
          <li><b>Peringkat #1 (Elyos &amp; Asmodian):</b> Masing-masing <b>◈ 5.000 Credit</b> + Siel's Supreme Patronage (90 Hari).</li>
          <li><b>Peringkat #2 – #3:</b> Masing-masing <b>◈ 2.500 Credit</b> + Archon Prestige Pack (30 Hari).</li>
          <li><b>Peringkat #4 – #10:</b> Masing-masing <b>◈ 1.000 Credit</b> + 20x Ceramium Medal.</li>
        </ul>
      `
    }
  ];

  /* -------------------- STATE MANAGEMENT -------------------- */
  const STATE_KEY = 'nox_aion_state_v3';

  function loadState() {
    try {
      localStorage.removeItem('nox_aion_state_v2');
    } catch (e) {}
    return {
      user: {
        loggedIn: false, // Default: Guest mode (Credit hidden, Marketplace/Prestige in Public Showcase mode)
        username: "daeva_commander",
        email: "commander@noxaion.com",
        race: "elyos",
        credit: 2500, // al_server_ls.account_data.toll
        membership: 2, // 0 = Regular, 1 = Starter, 2 = Archon Prestige, 3 = Supreme
        membershipLabel: "Archon Prestige Pack (30 Hari)",
        activeChar: "Mirinda",
        characters: [
          { name: "Mirinda", level: 65, classKey: "spiritmaster", className: "Spiritmaster", race: "elyos", legion: "Sovereign", gp: 48920, ap: 14820400, online: true },
          { name: "Aetherion", level: 65, classKey: "templar", className: "Templar", race: "elyos", legion: "Aegis", gp: 37900, ap: 9640100, online: false }
        ],
        transactions: [
          { date: "29.10.2026", desc: "Bonus Selamat Datang Nox Aion", amount: "+2.500 Credit" },
          { date: "28.10.2026", desc: "Aktivasi Archon Prestige Pack (30 Hari)", amount: "-1.150 Credit" }
        ]
      },
      server: {
        onlineTotal: 1428,
        elyosPct: 52,
        asmoPct: 48
      },
      filterMarketCat: "all",
      filterMarketGrade: "all",
      filterMarketQuery: "",
      filterRankRace: "all",
      filterRankSort: "gp",
      filterRankQuery: ""
    };
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function formatNum(n) {
    return Number(n).toLocaleString('id-ID');
  }

  /* -------------------- MULTI-LANGUAGE ENGINE (EN DEFAULT / ID / PH) -------------------- */
  const LANG_KEY = 'nox_aion_lang_v1';
  let currentLang = localStorage.getItem(LANG_KEY) || 'en';

  const I18N = {
    en: {
      code: 'EN',
      nav_home: 'Home',
      nav_news: 'News',
      nav_market: 'Marketplace',
      nav_prestige: 'Prestige Pack',
      nav_rank: 'Rank List',
      nav_reg: 'Register',
      btn_reg: 'Create Account',
      btn_login: 'Sign In',
      hero_cta_reg: 'Create Game Account',
      hero_cta_dl: 'Download Launcher',
      lbl_server_status: 'Status',
      item_price: 'Item Price',
      buy_now: 'Buy Now',
      login_to_buy: 'Login to Buy',
      prestige_active: 'Active (Extend)',
      prestige_buy: 'Activate Prestige',
      prestige_login: 'Login to Activate',
      read_more: 'Read More',
      read_article: 'Read Article →'
    },
    id: {
      code: 'ID',
      nav_home: 'Beranda',
      nav_news: 'News',
      nav_market: 'Marketplace',
      nav_prestige: 'Prestige Pack',
      nav_rank: 'Rank List',
      nav_reg: 'Register',
      btn_reg: 'Daftar Akun',
      btn_login: 'Masuk Akun',
      hero_cta_reg: 'Buat Akun Game',
      hero_cta_dl: 'Unduh Launcher',
      lbl_server_status: 'Status',
      item_price: 'Harga Item',
      buy_now: 'Beli Sekarang',
      login_to_buy: 'Login untuk Beli',
      prestige_active: 'Status Aktif (Perpanjang)',
      prestige_buy: 'Aktifkan Prestige',
      prestige_login: 'Login untuk Aktifkan',
      read_more: 'Baca Selengkapnya',
      read_article: 'Baca Artikel →'
    },
    ph: {
      code: 'PH',
      nav_home: 'Home',
      nav_news: 'Balita',
      nav_market: 'Marketplace',
      nav_prestige: 'Prestige Pack',
      nav_rank: 'Rank List',
      nav_reg: 'Register',
      btn_reg: 'Gawa ng Account',
      btn_login: 'Mag-login',
      hero_cta_reg: 'Gawa ng Game Account',
      hero_cta_dl: 'I-download ang Launcher',
      lbl_server_status: 'Status',
      item_price: 'Presyo ng Item',
      buy_now: 'Bilhin Ngayon',
      login_to_buy: 'Mag-login para Bumili',
      prestige_active: 'Aktibo (Palawigin)',
      prestige_buy: 'I-activate ang Prestige',
      prestige_login: 'Mag-login para I-activate',
      read_more: 'Basahin Pa',
      read_article: 'Basahin ang Artikulo →'
    }
  };

  function t(key) {
    const dict = I18N[currentLang] || I18N.en;
    return dict[key] || I18N.en[key] || key;
  }

  function applyLanguage(lang) {
    if (!I18N[lang]) lang = 'en';
    currentLang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;

    const codeEl = document.getElementById('currentLangCode');
    if (codeEl) codeEl.textContent = I18N[lang].code;

    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set-lang') === lang);
    });

    // Translate top nav links
    const navMap = {
      'index.html': t('nav_home'),
      'news.html': t('nav_news'),
      'marketplace.html': t('nav_market'),
      'prestige.html': t('nav_prestige'),
      'ratings.html': t('nav_rank'),
      'register.html': t('nav_reg'),
      'News': t('nav_news'),
      'Marketplace': t('nav_market'),
      'Prestige Pack': t('nav_prestige'),
      'Rank List': t('nav_rank'),
      'Register': t('nav_reg')
    };
    document.querySelectorAll('.nav-links a').forEach(a => {
      const key = a.getAttribute('data-coming-soon') || a.getAttribute('href');
      if (navMap[key]) a.textContent = navMap[key];
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      el.innerHTML = t(k);
    });

    renderUserHeader();
    renderNews();
    renderMarketplace();
    renderPrestige();
  }

  function initLangSwitcher() {
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selected = btn.getAttribute('data-set-lang');
        applyLanguage(selected);
        const langWrap = document.getElementById('lang');
        const langBtn = document.getElementById('langBtn');
        if (langWrap) langWrap.classList.remove('open');
        if (langBtn) langBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------------------- AUTH-GATED HEADER & GUEST BANNERS -------------------- */
  function renderUserHeader() {
    const u = state.user;
    const creditPill = document.getElementById('headerCreditBtn');
    const regBtn = document.getElementById('headerRegisterBtn');
    const accountBtnTxt = document.getElementById('headerAccountTxt');
    const guestBanner = document.getElementById('guestNoticeBanner');
    const memberBanner = document.getElementById('memberActiveBanner');

    // Credit pill di header selalu disembunyikan (Credit hanya tampil di Profile Panel)
    if (creditPill) creditPill.hidden = true;
    if (regBtn) regBtn.textContent = t('btn_reg');

    if (u.loggedIn) {
      if (regBtn) regBtn.hidden = true;
      if (accountBtnTxt) accountBtnTxt.textContent = `Profile: ${u.username}`;
      if (guestBanner) guestBanner.hidden = true;
      if (memberBanner) {
        memberBanner.hidden = false;
        const charSpan = document.getElementById('activeCharBannerTxt');
        const credSpan = document.getElementById('activeCreditBannerTxt');
        if (charSpan) charSpan.textContent = u.activeChar;
        if (credSpan) credSpan.textContent = `${formatNum(u.credit)} Credit`;
      }
    } else {
      if (regBtn) regBtn.hidden = false;
      if (accountBtnTxt) accountBtnTxt.textContent = t('btn_login');
      if (guestBanner) guestBanner.hidden = false;
      if (memberBanner) memberBanner.hidden = true;
    }
  }

  /* -------------------- LIVE ONLINE & TELEMETRY -------------------- */
  function renderOnlineStatus() {
    const s = state.server;
    const elHeaderCount = document.getElementById('headerOnlineCount');
    const elHeaderEly = document.getElementById('headerElyosPct');
    const elHeaderAsm = document.getElementById('headerAsmoPct');
    const elHeroCount = document.getElementById('heroOnlineCount');
    const elHeroEly = document.getElementById('heroElyosPct');
    const elHeroAsm = document.getElementById('heroAsmoPct');
    const elHeroFill = document.getElementById('heroElyosFill');

    if (elHeaderCount) elHeaderCount.textContent = formatNum(s.onlineTotal);
    if (elHeaderEly) elHeaderEly.textContent = `${s.elyosPct}%`;
    if (elHeaderAsm) elHeaderAsm.textContent = `${s.asmoPct}%`;
    if (elHeroCount) elHeroCount.textContent = formatNum(s.onlineTotal);
    if (elHeroEly) elHeroEly.innerHTML = `<img class="faction-ico-inline" src="assets/aion20/assets/icon-elyos.svg" alt="Elyos" />Elyos ${s.elyosPct}%`;
    if (elHeroAsm) elHeroAsm.innerHTML = `<img class="faction-ico-inline" src="assets/aion20/assets/icon-asmo.svg" alt="Asmodian" />Asmodian ${s.asmoPct}%`;
    if (elHeroFill) elHeroFill.style.width = `${s.elyosPct}%`;
  }

  /* -------------------- AION DB FLOATING TOOLTIP -------------------- */
  const tooltipEl = document.getElementById('aionTooltip');

  function showItemTooltip(item, ev) {
    if (!tooltipEl || !item) return;
    const gradeColorMap = {
      mythic: 'var(--grade-mythic)',
      eternal: 'var(--grade-eternal)',
      fabled: 'var(--grade-fabled)',
      heroic: 'var(--grade-heroic)'
    };
    const col = gradeColorMap[item.grade] || '#ece8ec';

    tooltipEl.innerHTML = `
      <div class="tt-header">
        <img src="${item.icon}" alt="${item.name}" />
        <div>
          <div class="tt-name" style="color:${col}">${item.enchant ? item.enchant + ' ' : ''}${item.name}</div>
          <div class="tt-sub">${item.gradeLabel} · ${item.categoryLabel} · Lv.${item.levelReq}+</div>
        </div>
      </div>
      <div class="tt-body">
        ${item.stats.map(st => `<div class="tt-stat"><span>${st.split(':')[0]}</span><b>${st.split(':')[1] || ''}</b></div>`).join('')}
        <div class="tt-manastones">
          ${item.manastones.map(ms => `<span>◈ ${ms}</span>`).join('')}
        </div>
        <div class="tt-godstone">✦ ${item.godstone}</div>
      </div>
    `;
    tooltipEl.classList.add('visible');
    moveTooltip(ev);
  }

  function moveTooltip(ev) {
    if (!tooltipEl || !tooltipEl.classList.contains('visible')) return;
    const pad = 16;
    let x = ev.clientX + pad;
    let y = ev.clientY + pad;
    if (x + 330 > window.innerWidth) x = ev.clientX - 336;
    if (y + 260 > window.innerHeight) y = ev.clientY - 260;
    tooltipEl.style.left = Math.max(8, x) + 'px';
    tooltipEl.style.top = Math.max(8, y) + 'px';
  }

  function hideItemTooltip() {
    if (tooltipEl) tooltipEl.classList.remove('visible');
  }

  /* -------------------- MARKETPLACE RENDER & BUY -------------------- */
  function renderMarketplace() {
    const grid = document.getElementById('marketGrid');
    if (!grid) return;

    const isHomePreview = grid.getAttribute('data-limit') === '4';
    const q = state.filterMarketQuery.trim().toLowerCase();
    let filtered = INITIAL_MARKET_ITEMS.filter(it => {
      if (!isHomePreview && state.filterMarketCat !== 'all' && it.category !== state.filterMarketCat) return false;
      if (!isHomePreview && state.filterMarketGrade !== 'all' && it.grade !== state.filterMarketGrade) return false;
      if (!isHomePreview && q && !it.name.toLowerCase().includes(q) && !it.seller.toLowerCase().includes(q)) return false;
      return true;
    });

    if (isHomePreview) filtered = filtered.slice(0, 4);

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">Tidak ada item yang cocok dengan filter pencarian Anda.</div>`;
      return;
    }

    const isLogged = state.user.loggedIn;

    grid.innerHTML = filtered.map(it => `
      <article class="market-card" data-grade="${it.grade}" data-item-id="${it.id}">
        <div>
          <div class="mc-top">
            <div class="mc-icon-wrap" tabindex="0" data-tooltip-id="${it.id}" aria-label="Detail ${it.name}">
              <img src="${it.icon}" alt="${it.name}" loading="lazy" />
              ${it.enchant ? `<span class="mc-enchant">${it.enchant}</span>` : ''}
              ${it.qty > 1 ? `<span class="mc-qty">×${it.qty}</span>` : ''}
            </div>
            <div class="mc-info">
              <span class="mc-cat">${it.gradeLabel} · ${it.categoryLabel}</span>
              <h3 class="mc-title grade-${it.grade}" data-tooltip-id="${it.id}">${it.enchant ? it.enchant + ' ' : ''}${it.name}</h3>
              <div class="mc-seller">${it.seller}</div>
            </div>
          </div>
          <div class="mc-stats-preview">
            ${it.stats.slice(0, 3).map(s => `<span class="mc-stat-chip">${s}</span>`).join('')}
          </div>
        </div>
        <div class="mc-footer">
          <div class="mc-price">
            <span class="lbl">${t('item_price')}</span>
            <span class="val">${formatNum(it.price)} Credit</span>
          </div>
          <button type="button" class="btn-buy ${isLogged ? '' : 'guest-lock'}" data-buy-id="${it.id}">
            ${isLogged ? t('buy_now') : t('login_to_buy')}
          </button>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('[data-tooltip-id]').forEach(el => {
      const id = Number(el.getAttribute('data-tooltip-id'));
      const item = INITIAL_MARKET_ITEMS.find(x => x.id === id);
      el.addEventListener('mouseenter', (e) => showItemTooltip(item, e));
      el.addEventListener('mousemove', moveTooltip);
      el.addEventListener('mouseleave', hideItemTooltip);
      el.addEventListener('focus', () => {
        const rect = el.getBoundingClientRect();
        showItemTooltip(item, { clientX: rect.right, clientY: rect.top });
      });
      el.addEventListener('blur', hideItemTooltip);
    });

    grid.querySelectorAll('[data-buy-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-buy-id'));
        handleBuyItem(id);
      });
    });
  }

  function handleBuyItem(itemId) {
    const item = INITIAL_MARKET_ITEMS.find(x => x.id === itemId);
    if (!item) return;

    if (!state.user.loggedIn) {
      showToast('Katalog bersifat publik, namun pembelian wajib Login. Mengarahkan ke halaman Login...');
      setTimeout(() => { window.location.href = 'account.html'; }, 900);
      return;
    }

    if (state.user.credit < item.price) {
      openModal('topupModal');
      showToast(`Saldo Credit tidak cukup (${formatNum(state.user.credit)} / ${formatNum(item.price)}). Silakan isi ulang Credit.`);
      return;
    }

    state.user.credit -= item.price;
    const today = new Date().toLocaleDateString('id-ID');
    state.user.transactions.unshift({
      date: today,
      desc: `Beli Marketplace: ${item.name} -> ${state.user.activeChar}`,
      amount: `-${formatNum(item.price)} Credit`
    });
    saveState();
    renderUserHeader();
    showToast(`Berhasil membeli ${item.name}! Item dikirim ke kotak surat (${state.user.activeChar}).`);
  }

  /* -------------------- PRESTIGE PACKAGE RENDER & SUBSCRIBE -------------------- */
  function renderPrestige() {
    const grid = document.getElementById('prestigeGrid');
    if (!grid) return;

    const isLogged = state.user.loggedIn;

    grid.innerHTML = PRESTIGE_PACKAGES.map(pkg => {
      const isCurrent = isLogged && state.user.membership === pkg.tier;
      let btnLabel = t('prestige_login');
      if (isLogged) {
        btnLabel = isCurrent ? t('prestige_active') : t('prestige_buy');
      }
      return `
        <article class="prestige-card ${pkg.featured ? 'featured' : ''}">
          <div>
            <span class="prestige-badge">${pkg.badge}</span>
            <h3>${pkg.name}</h3>
            <div class="prestige-price">
              <span class="amount">${formatNum(pkg.price)}</span>
              <span class="unit">Credit / ${pkg.duration}</span>
            </div>
            <ul class="prestige-perks">
              ${pkg.perks.map(p => `
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>${p}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <button type="button" class="btn ${pkg.featured ? 'btn-primary' : 'btn-ghost'}" style="width:100%;justify-content:center;" data-prestige-id="${pkg.id}">
            ${btnLabel}
          </button>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('[data-prestige-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-prestige-id');
        handleSubscribePrestige(id);
      });
    });
  }

  function handleSubscribePrestige(pkgId) {
    const pkg = PRESTIGE_PACKAGES.find(x => x.id === pkgId);
    if (!pkg) return;

    if (!state.user.loggedIn) {
      showToast('Silakan masuk ke akun Anda terlebih dahulu untuk mengaktifkan Prestige Package.');
      setTimeout(() => { window.location.href = 'account.html'; }, 900);
      return;
    }

    if (state.user.credit < pkg.price) {
      openModal('topupModal');
      showToast(`Credit Anda kurang untuk paket ${pkg.name}. Silakan Top Up terlebih dahulu.`);
      return;
    }

    state.user.credit -= pkg.price;
    state.user.membership = pkg.tier;
    state.user.membershipLabel = `${pkg.name} (${pkg.duration})`;
    const today = new Date().toLocaleDateString('id-ID');
    state.user.transactions.unshift({
      date: today,
      desc: `Aktivasi ${pkg.name} (membership=${pkg.tier})`,
      amount: `-${formatNum(pkg.price)} Credit`
    });
    saveState();
    renderUserHeader();
    renderPrestige();
    showToast(`${pkg.name} berhasil diaktifkan! Status account_data.membership = ${pkg.tier} telah disinkronkan.`);
  }

  /* -------------------- RANK LIST (ABYSS LEADERBOARD) -------------------- */
  function renderRankings() {
    const tbody = document.getElementById('rankTableBody');
    if (!tbody) return;

    const isHomeLimit = tbody.getAttribute('data-limit') === '5';
    const q = state.filterRankQuery.trim().toLowerCase();
    let rows = INITIAL_RANKINGS.filter(r => {
      if (!isHomeLimit && state.filterRankRace !== 'all' && r.race !== state.filterRankRace) return false;
      if (!isHomeLimit && q && !r.name.toLowerCase().includes(q) && !r.legion.toLowerCase().includes(q) && !r.className.toLowerCase().includes(q)) return false;
      return true;
    });

    rows.sort((a, b) => {
      if (state.filterRankSort === 'ap') return b.ap - a.ap;
      if (state.filterRankSort === 'kills') return b.kills - a.kills;
      return b.gp - a.gp;
    });

    if (isHomeLimit) rows = rows.slice(0, 5);

    if (rows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-state">Tidak ditemukan Daeva yang sesuai filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = rows.map((r, idx) => {
      const rankNum = idx + 1;
      const posClass = rankNum <= 3 ? `top-${rankNum}` : '';
      return `
        <tr>
          <td class="rank-pos ${posClass}"><span class="rank-pos-badge">#${rankNum}</span></td>
          <td>
            <div class="player-cell">
              <img class="class-ico" src="assets/classic/images/class-icon/${r.classKey}.png" alt="${r.className}" />
              <div>
                <span class="player-name">${r.name}</span>
                <span class="player-legion">&lt;${r.legion}&gt; · Lv.${r.level} ${r.className}</span>
              </div>
            </div>
          </td>
          <td><span class="race-badge ${r.race}"><img class="faction-ico-inline" style="width:16px;height:16px;vertical-align:-3px;margin-right:5px;" src="assets/aion20/assets/icon-${r.race === 'elyos' ? 'elyos' : 'asmo'}.svg" alt="" />${r.race === 'elyos' ? 'Elyos' : 'Asmodian'}</span></td>
          <td><span class="abyss-title">${r.rankTitle}</span></td>
          <td class="gp-val col-num">◈ ${formatNum(r.gp)} GP</td>
          <td class="ap-val col-num">${formatNum(r.ap)} AP</td>
          <td class="kills-val col-num"><b>${formatNum(r.kills)}</b> <span style="color:var(--muted);font-size:12px;">(${r.winrate}% W)</span></td>
        </tr>
      `;
    }).join('');
  }

  /* -------------------- REGISTER PAGE (register.html) -------------------- */
  function initRegisterPage() {
    const pageForm = document.getElementById('pageRegisterForm');
    if (!pageForm) return;

    const passInput = document.getElementById('regPagePassword');
    const hashPreview = document.getElementById('sha1HashPreview');
    if (passInput && hashPreview) {
      passInput.addEventListener('input', () => {
        const val = passInput.value;
        if (!val) {
          hashPreview.textContent = 'Menunggu input password...';
          return;
        }
        // Visual representation of Base64 SHA-1 hash for AION 4.8 LoginServer
        const encoded = btoa(unescape(encodeURIComponent(val + '_aion48_salt'))).slice(0, 27) + '=';
        hashPreview.textContent = encoded;
      });
    }

    pageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const uname = document.getElementById('regPageUsername').value.trim();
      const email = document.getElementById('regPageEmail').value.trim();
      const pass = document.getElementById('regPagePassword').value;
      const pass2 = document.getElementById('regPagePasswordConfirm').value;
      const raceEl = document.getElementById('regPageRace');
      const charEl = document.getElementById('regPageCharName');
      const race = raceEl ? raceEl.value : 'elyos';
      const charName = (charEl && charEl.value.trim()) ? charEl.value.trim() : uname;

      if (pass !== pass2) {
        showToast('Konfirmasi password tidak cocok! Silakan periksa kembali.');
        return;
      }

      state.user = {
        loggedIn: true,
        username: uname,
        email: email,
        race: race,
        credit: 500, // Starter bonus credit
        membership: 1,
        membershipLabel: "Daeva Starter Pass (Bonus Daftar)",
        activeChar: charName,
        characters: [
          { name: charName, level: 10, classKey: "gladiator", className: "Daeva", race: race, legion: "Starter Legion", gp: 0, ap: 1500, online: true }
        ],
        transactions: [
          { date: new Date().toLocaleDateString('id-ID'), desc: "Bonus Pendaftaran Akun Baru", amount: "+500 Credit" }
        ]
      };
      saveState();
      renderUserHeader();
      showToast(`Akun "${uname}" berhasil dibuat! Mengarahkan ke Profile Panel...`);
      setTimeout(() => { window.location.href = 'account.html'; }, 1000);
    });
  }

  /* -------------------- PROFILE PANEL PAGE (account.html) -------------------- */
  function renderProfilePage() {
    const guestLoginBox = document.getElementById('accountGuestView');
    const memberPanelBox = document.getElementById('accountMemberView');
    if (!guestLoginBox || !memberPanelBox) return;

    const u = state.user;
    if (!u.loggedIn) {
      guestLoginBox.hidden = false;
      memberPanelBox.hidden = true;
      return;
    }

    guestLoginBox.hidden = true;
    memberPanelBox.hidden = false;

    // Populate user info
    const elAvatar = document.getElementById('profAvatarInitial');
    const elName = document.getElementById('profUsername');
    const elEmail = document.getElementById('profEmail');
    const elCredit = document.getElementById('profCreditVal');
    const elVip = document.getElementById('profVipVal');
    const elVipSub = document.getElementById('profVipSub');
    const elCharCount = document.getElementById('profCharCount');
    const elActiveChar = document.getElementById('profActiveChar');

    const shortTierMap = {
      0: 'Regular',
      1: 'Starter VIP',
      2: 'Archon VIP',
      3: 'Supreme VIP'
    };

    if (elAvatar) elAvatar.textContent = (u.username[0] || 'D').toUpperCase();
    if (elName) elName.textContent = u.username;
    if (elEmail) elEmail.textContent = u.email;
    if (elCredit) elCredit.textContent = `◈ ${formatNum(u.credit)}`;
    if (elVip) elVip.textContent = shortTierMap[u.membership] || 'Archon VIP';
    if (elVipSub) elVipSub.textContent = `Membership Tier ${u.membership || 0} · Aktif`;
    if (elCharCount) elCharCount.textContent = `${u.characters.length} Karakter`;
    if (elActiveChar) elActiveChar.textContent = u.activeChar;

    // Populate Overview metadata grid
    const infoName = document.getElementById('infoAccountName');
    const infoEmail = document.getElementById('infoAccountEmail');
    const infoTier = document.getElementById('infoAccountTier');
    const infoChar = document.getElementById('infoActiveChar');
    if (infoName) infoName.textContent = u.username;
    if (infoEmail) infoEmail.textContent = u.email;
    if (infoTier) infoTier.textContent = u.membershipLabel || 'Regular Member';
    if (infoChar) infoChar.textContent = u.activeChar;

    // Render characters list (both in Overview and in Characters tab)
    const charCardsHtml = u.characters.map(c => {
      const isSel = c.name === u.activeChar;
      const raceKey = (c.race || 'elyos').toLowerCase().includes('asmo') ? 'asmodian' : 'elyos';
      return `
        <div class="char-card ${isSel ? 'selected' : ''}">
          <div class="char-card-head">
            <div class="player-cell">
              <img class="class-ico" src="assets/classic/images/class-icon/${c.classKey}.png" alt="${c.className}" />
              <div>
                <span class="player-name">${c.name}</span>
                <span class="player-legion">&lt;${c.legion}&gt; · Lv.${c.level} ${c.className}</span>
              </div>
            </div>
            <span class="race-badge ${raceKey}">${raceKey === 'elyos' ? 'Elyos' : 'Asmodian'}</span>
          </div>
          <div class="char-stats-bar">
            <span>Glory: <b style="color:var(--gold);">${formatNum(c.gp)} GP</b></span>
            <span>Abyss: <b style="color:var(--text);">${formatNum(c.ap)} AP</b></span>
          </div>
          <div class="char-actions">
            <button type="button" class="filter-btn ${isSel ? 'active' : ''}" style="flex:1;" data-select-char="${c.name}">
              ${isSel ? '✓ Penerima Aktif' : 'Pilih Penerima Item'}
            </button>
            <button type="button" class="filter-btn" data-unstuck-char="${c.name}" title="Teleport karakter macet ke ibukota">Unstuck</button>
          </div>
        </div>
      `;
    }).join('');

    ['profCharGrid', 'overviewCharGrid'].forEach(gridId => {
      const gridEl = document.getElementById(gridId);
      if (!gridEl) return;
      gridEl.innerHTML = charCardsHtml;

      gridEl.querySelectorAll('[data-select-char]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.user.activeChar = btn.getAttribute('data-select-char');
          saveState();
          renderProfilePage();
          renderUserHeader();
          showToast(`Karakter penerima item Marketplace diubah ke: ${state.user.activeChar}`);
        });
      });

      gridEl.querySelectorAll('[data-unstuck-char]').forEach(btn => {
        btn.addEventListener('click', () => {
          const cname = btn.getAttribute('data-unstuck-char');
          showToast(`Karakter ${cname} berhasil dipindahkan ke Obelisk Sanctum/Pandaemonium!`);
        });
      });
    });

    // Render transactions table
    const txBody = document.getElementById('profTxBody');
    if (txBody) {
      txBody.innerHTML = u.transactions.map(t => `
        <tr>
          <td style="font-family:var(--mono);color:var(--muted);">${t.date}</td>
          <td>${t.desc}</td>
          <td class="col-num" style="font-family:var(--mono);font-weight:600;color:${t.amount.startsWith('+') ? '#4ade80' : 'var(--gold)'};">${t.amount}</td>
          <td><span class="race-badge elyos">Sukses</span></td>
        </tr>
      `).join('');
    }
  }

  function initProfilePageEvents() {
    const loginForm = document.getElementById('pageLoginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const uname = document.getElementById('loginPageUsername').value.trim();
        if (uname) state.user.username = uname;
        state.user.loggedIn = true;
        saveState();
        renderUserHeader();
        renderProfilePage();
        showToast(`Selamat datang kembali, ${state.user.username}! Credit & fitur transaksi telah aktif.`);
      });
    }

    const demoLoginBtn = document.getElementById('btnDemoQuickLogin');
    if (demoLoginBtn) {
      demoLoginBtn.addEventListener('click', () => {
        state.user.loggedIn = true;
        saveState();
        renderUserHeader();
        renderProfilePage();
        showToast('Berhasil masuk dengan Akun Demo Commander! Sekarang Credit muncul di Header.');
      });
    }

    const logoutBtn = document.getElementById('btnProfileLogout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        state.user.loggedIn = false;
        saveState();
        renderUserHeader();
        renderProfilePage();
        showToast('Anda telah keluar. Sekarang tampilan beralih ke mode Tamu (Credit disembunyikan).');
      });
    }

    // Profile Sidebar Tabs
    document.querySelectorAll('[data-prof-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-prof-tab');
        document.querySelectorAll('[data-prof-tab]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('[data-prof-pane]').forEach(pane => {
          pane.hidden = pane.getAttribute('data-prof-pane') !== target;
        });
      });
    });

    // Password change form
    const passForm = document.getElementById('profPassForm');
    if (passForm) {
      passForm.addEventListener('submit', (e) => {
        e.preventDefault();
        passForm.reset();
        showToast('Password akun game (al_server_ls.account_data) berhasil diperbarui!');
      });
    }
  }

  /* -------------------- NEWS PORTAL & ARTICLE READER -------------------- */
  let filterNewsCat = 'all';
  let filterNewsQuery = '';

  function openNewsArticle(newsId) {
    const item = INITIAL_NEWS.find(n => n.id === newsId);
    if (!item) return;
    const modal = document.getElementById('newsArticleModal');
    if (!modal) {
      window.location.href = `news.html?article=${encodeURIComponent(newsId)}`;
      return;
    }
    const tagEl = document.getElementById('newsModalTag');
    const dateEl = document.getElementById('newsModalDate');
    const titleEl = document.getElementById('newsModalTitle');
    const imgEl = document.getElementById('newsModalImg');
    const bodyEl = document.getElementById('newsModalBody');

    if (tagEl) {
      tagEl.className = `tag ${item.tagClass}`;
      tagEl.textContent = item.tagLabel;
    }
    if (dateEl) dateEl.textContent = `${item.date} · ${item.readTime}`;
    if (titleEl) titleEl.textContent = item.title;
    if (imgEl) {
      imgEl.src = item.image;
      imgEl.alt = item.title;
    }
    if (bodyEl) bodyEl.innerHTML = item.content;
    openModal('newsArticleModal');
  }

  function renderNews() {
    // 1. Home Gazette Preview (#homeNewsFeature & #homeNewsList)
    const homeFeature = document.getElementById('homeNewsFeature');
    const homeList = document.getElementById('homeNewsList');
    if (homeFeature && INITIAL_NEWS.length > 0) {
      const f = INITIAL_NEWS[0];
      homeFeature.innerHTML = `
        <a href="news.html?article=${f.id}" class="ph" data-news-open="${f.id}">
          <img src="${f.image}" alt="${f.title}" style="width:100%;height:100%;object-fit:cover;" />
        </a>
        <div class="meta">
          <span class="tag ${f.tagClass}">${f.tagLabel}</span>
          <span class="dot-sep"></span>
          <span class="date">${f.date}</span>
          <span class="dot-sep"></span>
          <span class="date">${f.readTime}</span>
        </div>
        <h3><a href="news.html?article=${f.id}" data-news-open="${f.id}">${f.title}</a></h3>
        <p>${f.excerpt}</p>
        <a class="more" href="news.html?article=${f.id}" data-news-open="${f.id}">
          Baca Selengkapnya
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      `;
    }
    if (homeList && INITIAL_NEWS.length > 1) {
      homeList.innerHTML = INITIAL_NEWS.slice(1, 5).map(n => `
        <a class="news-item" href="news.html?article=${n.id}" data-news-open="${n.id}">
          <div class="it-meta">
            <span class="tag ${n.tagClass}">${n.tagLabel}</span>
            <span class="dot-sep"></span>
            <span class="date">${n.date}</span>
          </div>
          <h4>${n.title}</h4>
          <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      `).join('');
    }

    // 2. Full News Portal Grid (#newsGrid on news.html)
    const newsGrid = document.getElementById('newsGrid');
    if (newsGrid) {
      const q = filterNewsQuery.trim().toLowerCase();
      const rows = INITIAL_NEWS.filter(n => {
        if (filterNewsCat !== 'all' && n.category !== filterNewsCat) return false;
        if (q && !n.title.toLowerCase().includes(q) && !n.excerpt.toLowerCase().includes(q) && !n.tagLabel.toLowerCase().includes(q)) return false;
        return true;
      });

      if (rows.length === 0) {
        newsGrid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">Tidak ada berita atau patch note yang sesuai filter pencarian.</div>`;
      } else {
        newsGrid.innerHTML = rows.map(n => `
          <article class="news-card" data-news-open="${n.id}" tabindex="0" role="button" aria-label="Baca ${n.title}">
            <div>
              <div class="news-card-thumb">
                <img src="${n.image}" alt="${n.title}" loading="lazy" />
              </div>
              <div class="news-card-body">
                <div class="news-card-meta">
                  <span class="tag ${n.tagClass}">${n.tagLabel}</span>
                  <span class="dot-sep"></span>
                  <span class="date">${n.date}</span>
                </div>
                <h3>${n.title}</h3>
                <p>${n.excerpt}</p>
              </div>
            </div>
            <div class="news-card-foot">
              <span>${n.readTime}</span>
              <span>Baca Artikel →</span>
            </div>
          </article>
        `).join('');
      }
    }

    // Bind click to open article reader modal if modal exists on current page
    document.querySelectorAll('[data-news-open]').forEach(el => {
      el.addEventListener('click', (e) => {
        const modal = document.getElementById('newsArticleModal');
        if (modal) {
          e.preventDefault();
          openNewsArticle(el.getAttribute('data-news-open'));
        }
      });
    });
  }

  /* -------------------- TOPUP MODAL -------------------- */
  function openModal(modalId) {
    const backdrop = document.getElementById(modalId);
    if (!backdrop) return;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modalId) {
    const backdrop = document.getElementById(modalId);
    if (!backdrop) return;
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
  }

  /* -------------------- NOTIFICATION TOAST -------------------- */
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('access-toast');
    const body = document.getElementById('toastMessageText');
    if (!toast || !body) return;
    body.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4500);
  }

  /* -------------------- SHARED EVENT BINDINGS -------------------- */
  function initSharedEvents() {
    document.querySelectorAll('[data-coming-soon]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });

    document.querySelectorAll('[data-market-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-market-cat]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filterMarketCat = btn.getAttribute('data-market-cat');
        renderMarketplace();
      });
    });

    const gradeSelect = document.getElementById('marketGradeFilter');
    if (gradeSelect) {
      gradeSelect.addEventListener('change', (e) => {
        state.filterMarketGrade = e.target.value;
        renderMarketplace();
      });
    }

    const marketSearch = document.getElementById('marketSearchInput');
    if (marketSearch) {
      marketSearch.addEventListener('input', (e) => {
        state.filterMarketQuery = e.target.value;
        renderMarketplace();
      });
    }

    document.querySelectorAll('[data-rank-race]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-rank-race]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filterRankRace = btn.getAttribute('data-rank-race');
        renderRankings();
      });
    });

    const rankSort = document.getElementById('rankSortSelect');
    if (rankSort) {
      rankSort.addEventListener('change', (e) => {
        state.filterRankSort = e.target.value;
        renderRankings();
      });
    }

    const rankSearch = document.getElementById('rankSearchInput');
    if (rankSearch) {
      rankSearch.addEventListener('input', (e) => {
        state.filterRankQuery = e.target.value;
        renderRankings();
      });
    }

    document.querySelectorAll('[data-news-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-news-cat]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterNewsCat = btn.getAttribute('data-news-cat');
        renderNews();
      });
    });

    const newsSearch = document.getElementById('newsSearchInput');
    if (newsSearch) {
      newsSearch.addEventListener('input', (e) => {
        filterNewsQuery = e.target.value;
        renderNews();
      });
    }

    document.querySelectorAll('[data-open-topup]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        if (!state.user.loggedIn) {
          showToast('Silakan masuk ke akun Anda terlebih dahulu untuk melakukan Top Up Credit.');
          setTimeout(() => { window.location.href = 'account.html'; }, 900);
          return;
        }
        openModal('topupModal');
      });
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(btn.getAttribute('data-close-modal')));
    });

    document.querySelectorAll('.nox-modal-backdrop').forEach(bd => {
      bd.addEventListener('click', (e) => {
        if (e.target === bd) closeModal(bd.id);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal('topupModal');
        closeModal('newsArticleModal');
        hideItemTooltip();
      }
    });

    let selectedTopupCredit = 1250;
    document.querySelectorAll('[data-topup-amt]').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('[data-topup-amt]').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedTopupCredit = Number(opt.getAttribute('data-topup-amt'));
      });
    });

    const topupForm = document.getElementById('topupForm');
    if (topupForm) {
      topupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const method = document.getElementById('topupMethod').value;
        state.user.credit += selectedTopupCredit;
        state.user.transactions.unshift({
          date: new Date().toLocaleDateString('id-ID'),
          desc: `Top Up via ${method}`,
          amount: `+${formatNum(selectedTopupCredit)} Credit`
        });
        saveState();
        renderUserHeader();
        renderProfilePage();
        closeModal('topupModal');
        showToast(`Top Up +${formatNum(selectedTopupCredit)} Credit (${method}) berhasil ditambahkan ke akun ${state.user.username}!`);
      });
    }
  }

  /* -------------------- BOOTSTRAP -------------------- */
  function init() {
    renderOnlineStatus();
    initLangSwitcher();
    applyLanguage(currentLang);
    renderRankings();
    initRegisterPage();
    renderProfilePage();
    initProfilePageEvents();
    initSharedEvents();

    // Auto-open article modal if ?article=news_X is present in URL
    const params = new URLSearchParams(window.location.search);
    const artId = params.get('article');
    if (artId) openNewsArticle(artId);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'NSQ Academy Admin',
  projectId: 'ugswy94e',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      // 1. HERO / BANNER SETTINGS
      {
        name: 'heroSettings',
        title: '🏠 Hero / Banner Settings',
        type: 'document',
        fields: [
          {
            name: 'topBadge',
            title: 'Teks Badge Atas',
            type: 'string',
            description: 'Contoh: Official Esports Academy • Recognized by KONI',
          },
          {name: 'titleLine1', title: 'Judul Baris 1', type: 'string'},
          {name: 'titleLine2', title: 'Judul Baris 2', type: 'string'},
          {name: 'description', title: 'Deskripsi Paragraf', type: 'text', rows: 3},
          {name: 'stat1Value', title: 'Nilai Statistik 1', type: 'string'},
          {name: 'stat1Label', title: 'Label Statistik 1', type: 'string'},
          {name: 'stat2Value', title: 'Nilai Statistik 2', type: 'string'},
          {name: 'stat2Label', title: 'Label Statistik 2', type: 'string'},
          {name: 'stat3Value', title: 'Nilai Statistik 3', type: 'string'},
          {name: 'stat3Label', title: 'Label Statistik 3', type: 'string'},
          {name: 'stat4Value', title: 'Nilai Statistik 4', type: 'string'},
          {name: 'stat4Label', title: 'Label Statistik 4', type: 'string'},
        ],
      },
      // 2. ABOUT SETTINGS
      {
        name: 'aboutSettings',
        title: 'ℹ️ About / Visi Misi Settings',
        type: 'document',
        fields: [
          {name: 'mainDescription', title: 'Deskripsi Utama', type: 'text', rows: 4},
          {name: 'visionTitle', title: 'Judul Visi', type: 'string'},
          {name: 'visionDesc', title: 'Deskripsi Visi', type: 'text', rows: 2},
          {name: 'missionTitle', title: 'Judul Misi', type: 'string'},
          {name: 'missionDesc', title: 'Deskripsi Misi', type: 'text', rows: 2},
          {name: 'familyTitle', title: 'Judul Family', type: 'string'},
          {name: 'familyDesc', title: 'Deskripsi Family', type: 'text', rows: 2},
          {name: 'prestasiTitle', title: 'Judul Prestasi', type: 'string'},
          {name: 'prestasiDesc', title: 'Deskripsi Prestasi', type: 'text', rows: 2},
        ],
      },
      // 3. DIVISIONS (Menggantikan divisions.js)
      {
        name: 'division',
        title: '🎮 Game Divisions',
        type: 'document',
        fields: [
          {name: 'name', title: 'Nama Tim/Divisi', type: 'string'},
          {name: 'game', title: 'Nama Game', type: 'string'},
          {name: 'description', title: 'Deskripsi Singkat', type: 'text', rows: 3},
          {name: 'image', title: 'Logo/Game Image', type: 'image', options: {hotspot: true}},
        ],
      },
      // 4. PROGRAMS (Menggantikan programs.js)
      {
        name: 'program',
        title: '📚 Academy Programs',
        type: 'document',
        fields: [
          {name: 'title', title: 'Nama Program', type: 'string'},
          {name: 'icon', title: 'Icon (Emoji)', type: 'string', description: 'Contoh: 🎯, 🚀, 🤝'},
          {name: 'description', title: 'Deskripsi Program', type: 'text', rows: 3},
        ],
      },
      // 5. FOOTER SETTINGS
      {
        name: 'footerSettings',
        title: '🦶 Footer / Kontak Settings',
        type: 'document',
        fields: [
          {name: 'address', title: 'Alamat', type: 'string'},
          {name: 'email', title: 'Email', type: 'string'},
          {name: 'phone', title: 'Nomor Telepon', type: 'string'},
          {name: 'instagram', title: 'Link Instagram', type: 'url'},
          {name: 'youtube', title: 'Link YouTube', type: 'url'},
          {name: 'discord', title: 'Link Discord', type: 'url'},
        ],
      },
      // 6. EXISTING SCHEMAS (Player, Achievement, News, Coach)
      {
        name: 'player',
        title: 'Active Player',
        type: 'document',
        fields: [
          {name: 'ign', title: 'In-Game Name (IGN)', type: 'string'},
          {name: 'realName', title: 'Nama Asli (Opsional)', type: 'string'},
          {name: 'role', title: 'Role di Tim', type: 'string'},
          {
            name: 'division',
            title: 'Divisi Game',
            type: 'string',
            options: {
              list: [
                {title: 'Mobile Legends', value: 'Mobile Legends'},
                {title: 'Honor of Kings', value: 'Honor of Kings'},
                {title: 'PUBG Mobile', value: 'PUBG Mobile'},
                {title: 'Free Fire', value: 'Free Fire'},
                {title: 'Lokapala', value: 'Lokapala'},
              ],
            },
          },
          {name: 'image', title: 'Foto Player', type: 'image', options: {hotspot: true}},
          {name: 'isActive', title: '✅ Player Aktif', type: 'boolean', initialValue: true},
        ],
        preview: {select: {title: 'ign', subtitle: 'role', media: 'image'}},
      },
      {
        name: 'achievement',
        title: 'Achievement',
        type: 'document',
        fields: [
          {name: 'title', title: 'Judul Prestasi', type: 'string'},
          {name: 'rank', title: 'Rank/Pencapaian', type: 'string'},
          {name: 'date', title: 'Tanggal', type: 'date'},
          {
            name: 'isPinned',
            title: '📌 Utamakan di Posisi Atas',
            type: 'boolean',
            initialValue: false,
          },
          {
            name: 'category',
            title: 'Kategori Game',
            type: 'string',
            options: {
              list: [
                {title: 'Mobile Legends', value: 'Mobile Legends'},
                {title: 'Honor of Kings', value: 'Honor of Kings'},
                {title: 'PUBG Mobile', value: 'PUBG Mobile'},
                {title: 'Free Fire', value: 'Free Fire'},
                {title: 'Lokapala', value: 'Lokapala'},
                {title: 'Official', value: 'Official'},
              ],
            },
          },
          {name: 'description', title: 'Deskripsi', type: 'text', rows: 4},
          {name: 'image', title: 'Foto Sertifikat/Piala', type: 'image', options: {hotspot: true}},
        ],
        preview: {select: {title: 'title', subtitle: 'rank', media: 'image'}},
      },
      {
        name: 'news',
        title: 'News',
        type: 'document',
        fields: [
          {name: 'title', title: 'Judul Berita', type: 'string'},
          {name: 'date', title: 'Tanggal', type: 'date'},
          {
            name: 'isPinned',
            title: '📌 Utamakan di Posisi Atas',
            type: 'boolean',
            initialValue: false,
          },
          {
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
              list: [
                {title: 'Recruitment', value: 'Recruitment'},
                {title: 'Event', value: 'Event'},
                {title: 'Partnership', value: 'Partnership'},
                {title: 'Update', value: 'Update'},
              ],
            },
          },
          {name: 'description', title: 'Deskripsi', type: 'text', rows: 4},
          {name: 'image', title: 'Foto Berita', type: 'image', options: {hotspot: true}},
        ],
        preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
      },
      {
        name: 'coach',
        title: 'Coach',
        type: 'document',
        fields: [
          {name: 'name', title: 'Nama Coach', type: 'string'},
          {name: 'role', title: 'Jabatan/Role', type: 'string'},
          {name: 'location', title: 'Lokasi', type: 'string'},
          {name: 'image', title: 'Foto Coach', type: 'image', options: {hotspot: true}},
        ],
        preview: {select: {title: 'name', subtitle: 'role', media: 'image'}},
      },
    ],
  },
})

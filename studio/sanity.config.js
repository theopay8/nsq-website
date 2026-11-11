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
      {
        name: 'player',
        title: 'Active Player',
        type: 'document',
        fields: [
          {
            name: 'ign',
            title: 'In-Game Name (IGN)',
            type: 'string',
            description: 'Contoh: Tenyom, ProPlayer99',
          },
          {name: 'realName', title: 'Nama Asli (Opsional)', type: 'string'},
          {
            name: 'role',
            title: 'Role di Tim',
            type: 'string',
            description: 'Contoh: Captain, Exp Laner, IGL, Sniper',
          },
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
          {
            name: 'isActive',
            title: '✅ Player Aktif',
            type: 'boolean',
            description: 'Hilangkan centang jika player sudah tidak aktif/bench',
            initialValue: true,
          },
        ],
        preview: {select: {title: 'ign', subtitle: 'role', media: 'image'}},
      },
      {
        name: 'achievement',
        title: 'Achievement',
        type: 'document',
        fields: [
          {name: 'title', title: 'Judul Prestasi', type: 'string'},
          {
            name: 'rank',
            title: 'Rank/Pencapaian',
            type: 'string',
            description: 'Contoh: 🏆 Juara 1',
          },
          {name: 'date', title: 'Tanggal', type: 'date'}, // ← VALIDASI DIHAPUS
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
          {name: 'date', title: 'Tanggal', type: 'date'}, // ← VALIDASI DIHAPUS
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

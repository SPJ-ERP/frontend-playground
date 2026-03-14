# Frontend Playground ERP

Proyek ini adalah salah satu CONTOH untuk format yang akan digunakan pada frontend dari sistem ERP. Proyek ini dibangun menggunakan Next.js (App Router) dan terintegrasi dengan shared resources perusahaan.

## Panduan Memulai

1. Pastikan Anda telah menginstal Node.js dan package manager (npm / pnpm / yarn).
2. Proyek ini bergantung pada shared asset dari repositori pusat. Ambil resources terbaru terlebih dahulu dengan menjalankan:

   ```bash
   ./update-resources.sh
   ```

3. Modifikasi nama repositori resources pada `update-resources.sh` jika diperlukan.
4. Instalasi dependensi:

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

5. Jalankan development server:

   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda untuk melihat hasilnya.

### Menjalankan dengan Docker (Development)

1. Pastikan Docker Desktop sudah aktif.
2. Jalankan dari root `frontend-playground`:

```bash
docker compose -f docker/development/compose.yaml up --build
```

3. Buka [http://localhost:3000](http://localhost:3000).

Untuk menghentikan container:

```bash
docker compose -f docker/development/compose.yaml down
```

---

## Arsitektur dan Struktur Folder

Kami menggunakan standar struktur folder spesifik untuk menjaga agar base code dapat distandarisasi dan dirawat dengan mudah di setiap modul yang ada:

```text
frontend-playground/
├── app/               # Root routing (Next.js App Router)
├── components/        # Kumpulan komponen UI re-usable (Atomic Design dsb.)
├── constant/          # Nilai konstan atau konfigurasi statis
├── hooks/             # Custom React hooks
├── lib/               # Utility bawaan pihak ketiga (contoh: axios interceptor, prisma client, dsb.)
├── services/          # Fungsi untuk memanggil REST API backend
├── store/             # Global state management (Zustand / Redux / Context)
├── types/             # Deklarasi tipe data TypeScript (interfaces, types)
├── utils/             # Fungsi utility murni (pure functions) internal
├── public/            # File aset statis lokal yang hanya ada di proyek ini (contoh: robots.txt)
└── erp-resources/     # DIREKTORI HASIL CLONE - Berisi shared asset dari repo eksternal
```

_Catatan: Direktori `erp-resources` dihasilkan oleh skrip `update-resources.sh` dan dilarang untuk di-commit ke repositori ini._

## Aturan Penamaan (Naming Conventions)

Pentingnya menjaga konsistensi pada base code, harap perhatikan aturan penamaan berikut:

### 1. File dan Direktori

- Gunakan format "kebab-case" (huruf kecil semua dipisah dengan tanda strip) untuk nama direktori dan file.
  - Benar: `user-profile.tsx`, `date-formatter.ts`, `button-group/`
  - Salah: `UserProfile.tsx`, `dateFormatter.ts`, `ButtonGroup/`
- Khusus untuk file di dalam direktori `app/` ikuti aturan Next.js (seperti `page.tsx`, `layout.tsx`, `route.ts`).

### 2. Komponen React (Function & File)

- Meskipun nama file menggunakan "kebab-case", nama function/komponen di dalamnya **wajib** menggunakan "PascalCase".
  ```tsx
  // Nama file: user-card.tsx
  export default function UserCard() {
    return <div>Card</div>;
  }
  ```

### 3. Fungsi Utility dan Hooks

- Fungsi murni atau logic biasa didefinisikan dengan awalan kata kerja menggunakan "camelCase".
  - Contoh: `formatDate`, `calculateTotal`
- React Hooks didefinisikan dengan awalan "use" menggunakan "camelCase".
  - Contoh: `useAuth`, `useFetchData`

### 4. Konstanta dan Enum

- Nilai konstan atau Enum yang tidak akan pernah berubah (hardcoded) harus menggunakan format "UPPER_SNAKE_CASE".
  - Contoh: `MAX_UPLOAD_SIZE`, `RSC_IMAGE_MAPPING`
- Konstanta diletakkan di dalam folder `constant/`.

### 5. Types dan Interfaces

- Nama interface TypeScript wajib menggunakan "PascalCase". Menambahkan prefix "I" adalah opsional namun harus disepakati secara tim (disarankan tidak memakai prefix "I" di Next.js modern, cukup `User`, `Product`, dll).
- Contoh: `UserDetail`, `TransactionPayload`.

## Shared Resources (ERP Resources)

Aset bersama (logo, font, css global) tidak boleh disimpan secara lokal di dalam folder `public` jika aset tersebut digunakan oleh lebih dari satu modul.

Seluruh asset tersebut harus disimpan di repositori terpisah dan ditarik melalui `update-resources.sh`. Aset kemudian dapat di-import langsung, contohnya:

```tsx
// Melakukan import gambar langsung dari folder sumber
import { RSC_IMAGE_MAPPING } from "@/erp-resources";
import Image from "next/image";

export default function Header() {
  return <Image src={RSC_IMAGE_MAPPING.LOGO} alt="Logo Perusahaan" />;
}
```

_Pastikan konfigurasi Path Aliases (`@/_`) pada file `tsconfig.json` mencakup seluruh root direktori agar import dapat dilakukan dengan rapi.\_

## 6. Format Commit Message

Beberapa konvensi jenis commit yang umum digunakan adalah:

- **`feat:`** Menambahkan fitur baru.
  - _Contoh:_ `feat(api): add user endpoint`
- **`fix:`** Memperbaiki bug.
  - _Contoh:_ `fix(payment): correct calculation error`
- **`docs:`** Mengubah dokumentasi.
  - _Contoh:_ `docs(readme): update setup instructions`
- **`style:`** Perubahan pada format atau gaya kode tanpa mempengaruhi fungsionalitas.
  - _Contoh:_ `style(css): adjust button padding`
- **`refactor:`** Merombak kode tanpa menambah fitur atau memperbaiki bug.
  - _Contoh:_ `refactor(auth): simplify login logic`
- **`test:`** Menambahkan atau mengubah tes.
  - _Contoh:_ `test(api): add tests for user endpoints`
- **`chore:`** Tugas rutin seperti pembaruan build scripts atau konfigurasi.
  - _Contoh:_ `chore(deps): update dependencies`

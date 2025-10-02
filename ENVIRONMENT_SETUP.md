# Configurarea Variabilelor de Mediu

Pentru ca imaginile să se încarce corect în proiectul tău, trebuie să configurezi următoarele variabile de mediu:

## 1. Creează fișierul `.env.local` în rădăcina proiectului

```bash
# Database
DATABASE_URL="your_database_url_here"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key_here"
CLERK_SECRET_KEY="your_clerk_secret_key_here"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Cloudinary Configuration (IMPORTANT pentru imagini!)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name_here"
CLOUDINARY_API_KEY="your_cloudinary_api_key_here"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret_here"

# Stripe
STRIPE_API_KEY="your_stripe_api_key_here"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 2. Configurarea Cloudinary

### Pasul 1: Creează cont Cloudinary
1. Mergi la [cloudinary.com](https://cloudinary.com)
2. Creează un cont gratuit
3. După autentificare, vei vedea Dashboard-ul cu informațiile tale

### Pasul 2: Obține credențialele
Din Dashboard-ul Cloudinary, copiază:
- **Cloud Name** (ex: `dxy123abc`)
- **API Key** (ex: `123456789012345`)
- **API Secret** (ex: `abcdefghijklmnopqrstuvwxyz123456`)

### Pasul 3: Configurează Upload Preset
1. În Dashboard-ul Cloudinary, mergi la **Settings** → **Upload**
2. Creează un nou **Upload Preset**:
   - **Preset Name**: `ecommerce-admin`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `ecommerce-admin`
3. Salvează preset-ul și copiază numele

### Pasul 4: Actualizează componenta ImageUpload
În fișierul `components/ui/image-upload.tsx`, linia 56, înlocuiește:
```typescript
<CldUploadWidget onUpload={onUpload} uploadPreset="oxlo5gvw">
```
cu:
```typescript
<CldUploadWidget onUpload={onUpload} uploadPreset="your_preset_name_here">
```

## 3. Verifică configurația Next.js

În `next.config.ts`, asigură-te că domeniul Cloudinary este configurat:
```typescript
const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com"
    ]
  }
};
```

## 4. Restart aplicația

După ce ai configurat variabilele de mediu:
```bash
npm run dev
```

## 5. Testează încărcarea imaginilor

1. Mergi la `/billboards/new`
2. Încearcă să încarci o imagine
3. Verifică în consolă dacă există erori
4. Verifică dacă imaginea apare în preview

## Probleme comune:

1. **"Cloudinary is not configured"** - Verifică că variabilele de mediu sunt setate corect
2. **"Upload preset not found"** - Verifică că upload preset-ul există în Cloudinary
3. **Imaginile nu se afișează** - Verifică că `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` este setat corect
4. **Eroare CORS** - Verifică că domeniul este configurat în `next.config.ts`

## Debugging:

Pentru a verifica dacă variabilele sunt setate corect, adaugă în componenta ImageUpload:
```typescript
console.log('Cloudinary Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
```

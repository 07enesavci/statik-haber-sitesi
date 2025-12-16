# ABÜ Bilgisayar Bilimleri Topluluğu Haber Sitesi

Modern ve kullanıcı dostu bir haber sitesi. Next.js 14, React ve TypeScript ile geliştirilmiştir.

## 🚀 Özellikler

- 📰 Haber yönetimi (ekleme, düzenleme, silme)
- 📌 Sabit duyurular ve öne çıkan haberler
- 🖼️ Çoklu görsel ve video desteği
- 👤 Admin paneli ile kolay içerik yönetimi
- 📱 Tam responsive tasarım
- 🎨 Modern ve şık arayüz
- 🔐 Güvenli admin girişi (JWT tabanlı)
- 📧 İletişim bilgileri yönetimi
- 🔗 Sosyal medya entegrasyonu

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn

## 🛠️ Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/07enesavci/statik-haber-sitesi.git
cd haber-sitesi
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Ortam değişkenlerini ayarlayın:
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyip `JWT_SECRET` değerini güvenli bir anahtarla değiştirin.

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## 📁 Proje Yapısı

```
haber-sitesi/
├── app/                    # Next.js App Router sayfaları
│   ├── admin/             # Admin paneli sayfaları
│   ├── api/               # API route'ları
│   ├── haber/             # Haber detay sayfaları
│   └── hakkimizda/        # Hakkımızda sayfası
├── components/            # React bileşenleri
├── data/                  # JSON veri dosyaları
├── lib/                   # Yardımcı fonksiyonlar
├── public/                # Statik dosyalar
│   ├── logos/            # Logo dosyaları
│   └── uploads/          # Yüklenen görseller/videolar
└── middleware.ts          # Next.js middleware
```

## 🔐 Varsayılan Admin Bilgileri

İlk kurulumda varsayılan admin bilgileri:
- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`

⚠️ **Önemli:** İlk girişten sonra mutlaka şifrenizi değiştirin!

## 🚀 Production Build

Production için build almak:

```bash
npm run build
npm start
```

## 📝 Kullanım

### Admin Paneli

1. `/admin/login` adresine gidin
2. Admin bilgileriyle giriş yapın
3. Haber ekleyin, düzenleyin veya silin
4. İletişim bilgilerini güncelleyin

### Haber Ekleme

- Başlık, özet ve tam içerik ekleyin
- Görseller yükleyin (çoklu destek)
- Video URL'leri ekleyin
- Sabit duyuru veya öne çıkan olarak işaretleyin

## 🛠️ Teknolojiler

- **Framework:** Next.js 14
- **Dil:** TypeScript
- **UI:** React 18
- **Kimlik Doğrulama:** JWT (jose)
- **Şifreleme:** bcryptjs
- **Stil:** CSS-in-JS (inline styles)

## 📄 Lisans

Bu proje özel ve örnek bir projedir. Tüm hakları saklıdır.

## 🙏 Teşekkürler

Bu projeyi kullandığınız için teşekkürler!


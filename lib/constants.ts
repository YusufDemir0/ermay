export const COMPANY = {
    name: 'Ermay Mobilya',
    fullName: 'ERMAY MOBİLYA',
    slogan: 'Üreticiden Kaliteli Mobilya',
    tagline: "1999'dan Beri Türk Mobilyasına Değer Katıyoruz",
    description:
        "Kocaeli merkezli Ermay Mobilya ile kaliteli ofis ve ev mobilyalarını doğrudan üreticiden keşfedin.",
    foundedYear: 1999,
    productCount: '500+',
    customerCount: '10.000+',
    yearsExperience: 27,
} as const;

export const CONTACT = {
    phone: '0532 419 41 51',
    phoneHref: 'tel:+905324194151',
    email: 'erbayofis@gmail.com',
    emailHref: 'mailto:erbayofis@gmail.com',
    address: 'Kadıköy, Bağdat Cd. No:131, 41050 İzmit/Kocaeli',
    city: 'Kocaeli',
    whatsappUrl: 'https://wa.me/905324194151',
    mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.123!2d29.9!3d40.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ2JzQ4LjAiTiAyOcKwNTQnMDAuMCJF!5e0!3m2!1str!2str!4v1',
    workingHours: [
        { day: 'Pazartesi - Cuma', hours: '08:30 - 18:00' },
        { day: 'Cumartesi', hours: '09:00 - 14:00' },
        { day: 'Pazar', hours: 'Kapalı' },
    ],
} as const;

export const SOCIAL = {
    instagram: 'https://instagram.com/ermaymobilya',
    facebook: 'https://facebook.com/ermaymobilya',
    linkedin: 'https://linkedin.com/company/ermaymobilya',
    youtube: 'https://youtube.com/@ermaymobilya',
} as const;

export const FREE_SHIPPING_THRESHOLD = 500;
export const VAT_RATE = 0.20;

export const DEMO_CREDENTIALS = {
    email: 'demo@ermaymobilya.com',
    password: 'Demo2026!',
} as const;

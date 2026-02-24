export default function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FurnitureStore",
        "name": "Ermay Mobilya",
        "image": "https://ermaymobilya.com/logo.png",
        "@id": "https://ermaymobilya.com",
        "url": "https://ermaymobilya.com",
        "telephone": "+905324194151",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sanayi Mah. Mobilyacılar Sok. No:1",
            "addressLocality": "İzmit",
            "addressRegion": "Kocaeli",
            "postalCode": "41040",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.7654,
            "longitude": 29.9405
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "19:00"
        },
        "sameAs": [
            "https://www.facebook.com/ermaymobilya",
            "https://www.instagram.com/ermaymobilya",
            "https://www.linkedin.com/company/ermaymobilya"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

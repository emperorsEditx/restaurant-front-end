import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { MenuSection } from "@/components/menu-section"
import { LocationSection } from "@/components/location-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"

export default function Home() {
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": "https://foodiewagon.de/#restaurant",
        "name": "The Foodie Wagon",
        "description": "Premium halal burger food truck in Ingolstadt - homemade beef patties, fried chicken, currywurst, and authentic street food",
        "url": "https://foodiewagon.de",
        "telephone": "+49-XXX-XXXXXXX",
        "servesCuisine": ["Burger", "Halal", "Street Food", "Fast Food", "American", "German"],
        "priceRange": "€€",
        "image": "https://foodiewagon.de/graphics/tasty burger.svg",
        "logo": "https://foodiewagon.de/graphics/fooiewagen logo.svg",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ingolstadt",
          "addressRegion": "Bayern",
          "addressCountry": "DE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "48.7665",
          "longitude": "11.4257"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "11:00",
            "closes": "22:00"
          }
        ],
        "paymentAccepted": "Cash, Credit Card",
        "currenciesAccepted": "EUR"
      },
      {
        "@type": "FoodEstablishment",
        "@id": "https://foodiewagon.de/#foodestablishment",
        "name": "The Foodie Wagon",
        "hasMenu": {
          "@type": "Menu",
          "hasMenuSection": [
            {
              "@type": "MenuSection",
              "name": "Beef Burgers",
              "description": "Homemade 140g beef patties, 100% halal",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Cheesy Buffalo",
                  "description": "Brioche bun, 140g beef patty, cheese, burger sauce, cucumber, onion, tomatoes, lettuce",
                  "offers": {
                    "@type": "Offer",
                    "price": "10.50",
                    "priceCurrency": "EUR"
                  },
                  "suitableForDiet": "https://schema.org/HalalDiet"
                },
                {
                  "@type": "MenuItem",
                  "name": "Angry Bull",
                  "description": "Brioche bun, 140g beef patty, cheese, chili cheese sauce, jalapeno",
                  "offers": {
                    "@type": "Offer",
                    "price": "12.00",
                    "priceCurrency": "EUR"
                  },
                  "suitableForDiet": "https://schema.org/HalalDiet"
                }
              ]
            },
            {
              "@type": "MenuSection",
              "name": "Chicken Burgers",
              "description": "Knusprige Chicken Strips, 100% Halal",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Crunchy Chicken",
                  "description": "Brioche bun, chicken strips, cheese, burger sauce, lettuce",
                  "offers": {
                    "@type": "Offer",
                    "price": "8.50",
                    "priceCurrency": "EUR"
                  },
                  "suitableForDiet": "https://schema.org/HalalDiet"
                }
              ]
            },
            {
              "@type": "MenuSection",
              "name": "Fried Chicken",
              "description": "Knuspriges Fried Chicken - Wings & Strips",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Chicken Wings",
                  "description": "Crispy chicken wings - 6, 10, or 20 pieces",
                  "offers": {
                    "@type": "Offer",
                    "price": "7.50",
                    "priceCurrency": "EUR"
                  },
                  "suitableForDiet": "https://schema.org/HalalDiet"
                }
              ]
            }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://foodiewagon.de/#localbusiness",
        "name": "The Foodie Wagon",
        "description": "Mobile food truck for halal burgers and street food in Ingolstadt",
        "slogan": "Where Flavor Hits The Road",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Halal Certification",
          "name": "100% Halal Certified"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://foodiewagon.de/#website",
        "url": "https://foodiewagon.de",
        "name": "The Foodie Wagon",
        "description": "Premium halal burgers and street food in Ingolstadt",
        "publisher": {
          "@id": "https://foodiewagon.de/#restaurant"
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <MenuSection />
        <LocationSection />
        <ContactSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  )
}

/**
 * Structured data for SEO - JSON-LD format
 * Helps search engines understand your portfolio
 */

export const getStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ankit Tiwari',
  url: 'https://ankittiwari.dev',
  image: 'https://ankittiwari.dev/assets/avatar.png',
  description: 'Full-Stack Developer with 2+ years experience building scalable web applications',
  jobTitle: 'Full-Stack Developer',
  sameAs: [
    'https://github.com/ankit-Tiwari2003',
    'https://www.linkedin.com/in/ankit-tiwari-4b8453262',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'MongoDB',
    'PostgreSQL',
    'Full-Stack Development',
    'Web Development',
  ],
  email: 'ankittiwari3690@gmail.com',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance Developer',
    url: 'https://ankittiwari.dev',
  },
});

export const getContactPageData = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Ankit Tiwari',
  url: 'https://ankittiwari.dev#contact',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Work Inquiry',
    email: 'ankittiwari3690@gmail.com',
    availableLanguage: 'English',
  },
});

export const getOrganizationData = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Ankit Tiwari - Development Services',
  description: 'Full-Stack Web Development Services',
  url: 'https://ankittiwari.dev',
  image: 'https://ankittiwari.dev/assets/avatar.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Dehradun',
    addressRegion: 'Uttarakhand',
    postalCode: '',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://github.com/ankit-Tiwari2003',
    'https://www.linkedin.com/in/ankit-tiwari-4b8453262',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Work Inquiry',
    email: 'ankittiwari3690@gmail.com',
    availableLanguage: 'English',
  },
});

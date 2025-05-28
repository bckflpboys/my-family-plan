import { Country, countries } from './countries';

export interface Region {
  id: string;
  name: string;
  countries: Country[];
}

// Define the regions
export const regions: Region[] = [
  {
    id: 'africa',
    name: 'Africa',
    countries: countries.filter(country => [
      'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 
      'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 
      'Congo', 'Congo (Democratic Republic)', 'Côte d\'Ivoire', 'Djibouti', 
      'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 
      'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 
      'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 
      'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 
      'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 
      'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
    ].includes(country.name))
  },
  {
    id: 'asia',
    name: 'Asia',
    countries: countries.filter(country => [
      'Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 
      'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia', 
      'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Korea (North)', 
      'Korea (South)', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 
      'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'Oman', 'Pakistan', 'Palestine', 
      'Philippines', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'Sri Lanka', 
      'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 
      'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'
    ].includes(country.name))
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: countries.filter(country => [
      'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 
      'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 
      'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 
      'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 
      'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia', 'Norway', 'Poland', 
      'Portugal', 'Romania', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 
      'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom', 'Vatican City'
    ].includes(country.name))
  },
  {
    id: 'north_america',
    name: 'North America',
    countries: countries.filter(country => [
      'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada', 
      'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 
      'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 
      'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia', 
      'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'United States'
    ].includes(country.name))
  },
  {
    id: 'south_america',
    name: 'South America',
    countries: countries.filter(country => [
      'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 
      'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'
    ].includes(country.name))
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: countries.filter(country => [
      'Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 
      'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 
      'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'
    ].includes(country.name))
  }
];

// Helper function to get a region by its ID
export const getRegionById = (regionId: string): Region | undefined => {
  return regions.find(region => region.id === regionId);
};

// Helper function to get a region by country name
export const getRegionByCountry = (countryName: string): Region | undefined => {
  return regions.find(region => 
    region.countries.some(country => country.name === countryName)
  );
};

// Helper function to get a region name by country name
export const getRegionNameByCountry = (countryName: string): string => {
  const region = getRegionByCountry(countryName);
  return region ? region.name : 'Unknown Region';
};

// Helper function to get all countries in a specific region
export const getCountriesByRegion = (regionId: string): Country[] => {
  const region = getRegionById(regionId);
  return region ? region.countries : [];
};

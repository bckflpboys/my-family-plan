export interface Subscription {
  id: string;
  name: string;
  icon: string;
  category: SubscriptionCategory;
  description?: string;
}

export type SubscriptionCategory = 
  | 'streaming' 
  | 'music' 
  | 'gaming' 
  | 'productivity' 
  | 'other';

/**
 * List of all available subscription services
 * This centralized list can be used throughout the application
 * and makes it easy to add new services in the future
 */
export const subscriptions: Subscription[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    icon: 'netflix',
    category: 'streaming',
    description: 'Streaming service for movies and TV shows'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'spotify',
    category: 'music',
    description: 'Music streaming service'
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    icon: 'youtube',
    category: 'streaming',
    description: 'Ad-free videos, background play, and YouTube Music'
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    icon: 'disney',
    category: 'streaming',
    description: 'Disney, Pixar, Marvel, Star Wars, and National Geographic content'
  },
  {
    id: 'hbo-max',
    name: 'HBO Max',
    icon: 'hbo',
    category: 'streaming',
    description: 'HBO content, Warner Bros. films, and exclusive Max Originals'
  },
  {
    id: 'apple-tv-plus',
    name: 'Apple TV+',
    icon: 'apple',
    category: 'streaming',
    description: 'Apple original shows and movies'
  },
  {
    id: 'xbox-game-pass',
    name: 'Xbox Game Pass',
    icon: 'xbox',
    category: 'gaming',
    description: 'Library of games for Xbox and PC'
  },
  {
    id: 'playstation-plus',
    name: 'PlayStation Plus',
    icon: 'playstation',
    category: 'gaming',
    description: 'Online multiplayer, free monthly games, and exclusive discounts'
  },
  {
    id: 'nintendo-online',
    name: 'Nintendo Online',
    icon: 'nintendo',
    category: 'gaming',
    description: 'Online play for Nintendo Switch games and classic NES/SNES titles'
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime',
    icon: 'amazon',
    category: 'streaming',
    description: 'Free shipping, Prime Video, Prime Music, and more'
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    icon: 'apple-music',
    category: 'music',
    description: 'Music streaming service by Apple'
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    icon: 'paramount',
    category: 'streaming',
    description: 'CBS, Paramount Pictures, Nickelodeon, MTV, and Comedy Central content'
  },
  {
    id: 'ea-play',
    name: 'EA Play',
    icon: 'ea',
    category: 'gaming',
    description: 'Electronic Arts game subscription service'
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    icon: 'crunchyroll',
    category: 'streaming',
    description: 'Anime streaming service'
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    icon: 'microsoft',
    category: 'productivity',
    description: 'Office apps, cloud storage, and more'
  },
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    icon: 'adobe',
    category: 'productivity',
    description: 'Suite of Adobe creative applications'
  }
];

/**
 * Get all subscription names as a string array
 * Useful for type checking and filtering
 */
export const getSubscriptionNames = (): string[] => {
  return subscriptions.map(sub => sub.name);
};

/**
 * Get subscriptions filtered by category
 * @param category The category to filter by
 */
export const getSubscriptionsByCategory = (category: SubscriptionCategory): Subscription[] => {
  return subscriptions.filter(sub => sub.category === category);
};

/**
 * Find a subscription by its ID
 * @param id The subscription ID to find
 */
export const getSubscriptionById = (id: string): Subscription | undefined => {
  return subscriptions.find(sub => sub.id === id);
};

/**
 * Find a subscription by its name
 * @param name The subscription name to find
 */
export const getSubscriptionByName = (name: string): Subscription | undefined => {
  return subscriptions.find(sub => sub.name === name);
};

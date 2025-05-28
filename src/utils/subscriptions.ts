export interface Subscription {
  id: string;
  name: string;
  icon: string;
  category: SubscriptionCategory;
  description?: string;
  plans: Plan[];
}

export interface Plan {
  id: string;
  name: string;
  type: PlanType;
  price: string;
  maxUsers: number;
  features?: string[];
}

export type PlanType = 'individual' | 'family' | 'group';

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
    description: 'Streaming service for movies and TV shows',
    plans: [
      {
        id: 'netflix-standard',
        name: 'Standard',
        type: 'individual',
        price: '$15.49/month',
        maxUsers: 1,
        features: ['1080p HD video', 'Watch on 2 devices at once']
      },
      {
        id: 'netflix-premium',
        name: 'Premium',
        type: 'family',
        price: '$22.99/month',
        maxUsers: 4,
        features: ['4K Ultra HD video', 'Watch on 4 devices at once', 'Spatial audio']
      }
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'spotify',
    category: 'music',
    description: 'Music streaming service',
    plans: [
      {
        id: 'spotify-individual',
        name: 'Individual',
        type: 'individual',
        price: '$10.99/month',
        maxUsers: 1,
        features: ['Ad-free music', 'Download to listen offline']
      },
      {
        id: 'spotify-family',
        name: 'Family',
        type: 'family',
        price: '$16.99/month',
        maxUsers: 6,
        features: ['6 Premium accounts', 'Block explicit music', 'Spotify Kids access']
      }
    ]
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    icon: 'youtube',
    category: 'streaming',
    description: 'Ad-free videos, background play, and YouTube Music',
    plans: [
      {
        id: 'youtube-individual',
        name: 'Individual',
        type: 'individual',
        price: '$13.99/month',
        maxUsers: 1,
        features: ['Ad-free videos', 'Background play', 'YouTube Music Premium']
      },
      {
        id: 'youtube-family',
        name: 'Family',
        type: 'family',
        price: '$22.99/month',
        maxUsers: 5,
        features: ['Up to 5 family members', 'Each member gets their own account']
      }
    ]
  },
  {
    id: 'disney-plus',
    name: 'Disney+',
    icon: 'disney',
    category: 'streaming',
    description: 'Disney, Pixar, Marvel, Star Wars, and National Geographic content',
    plans: [
      {
        id: 'disney-standard',
        name: 'Standard',
        type: 'family',
        price: '$13.99/month',
        maxUsers: 4,
        features: ['4K UHD & HDR', 'Watch on 4 devices at once']
      }
    ]
  },
  {
    id: 'hbo-max',
    name: 'HBO Max',
    icon: 'hbo',
    category: 'streaming',
    description: 'HBO content, Warner Bros. films, and exclusive Max Originals',
    plans: [
      {
        id: 'hbo-with-ads',
        name: 'With Ads',
        type: 'individual',
        price: '$9.99/month',
        maxUsers: 1,
        features: ['Watch on 2 devices at once', 'Full HD']
      },
      {
        id: 'hbo-ad-free',
        name: 'Ad-Free',
        type: 'family',
        price: '$15.99/month',
        maxUsers: 3,
        features: ['Watch on 3 devices at once', '4K UHD', '30 downloads to watch offline']
      }
    ]
  },
  {
    id: 'apple-tv-plus',
    name: 'Apple TV+',
    icon: 'apple',
    category: 'streaming',
    description: 'Apple original shows and movies',
    plans: [
      {
        id: 'apple-tv-standard',
        name: 'Standard',
        type: 'family',
        price: '$9.99/month',
        maxUsers: 6,
        features: ['Family Sharing up to 6 people', '4K HDR', 'Download to watch offline']
      }
    ]
  },
  {
    id: 'xbox-game-pass',
    name: 'Xbox Game Pass',
    icon: 'xbox',
    category: 'gaming',
    description: 'Library of games for Xbox and PC',
    plans: [
      {
        id: 'xbox-standard',
        name: 'Standard',
        type: 'individual',
        price: '$10.99/month',
        maxUsers: 1,
        features: ['Access to 100+ games', 'New games added all the time']
      },
      {
        id: 'xbox-ultimate',
        name: 'Ultimate',
        type: 'individual',
        price: '$16.99/month',
        maxUsers: 1,
        features: ['Xbox Live Gold included', 'EA Play membership', 'Cloud gaming']
      }
    ]
  },
  {
    id: 'playstation-plus',
    name: 'PlayStation Plus',
    icon: 'playstation',
    category: 'gaming',
    description: 'Online multiplayer, free monthly games, and exclusive discounts',
    plans: [
      {
        id: 'ps-essential',
        name: 'Essential',
        type: 'individual',
        price: '$9.99/month',
        maxUsers: 1,
        features: ['Online multiplayer', 'Monthly games', 'Exclusive discounts']
      },
      {
        id: 'ps-extra',
        name: 'Extra',
        type: 'individual',
        price: '$14.99/month',
        maxUsers: 1,
        features: ['Everything in Essential', 'Game catalog of 400+ PS4 & PS5 games']
      }
    ]
  },
  {
    id: 'nintendo-online',
    name: 'Nintendo Online',
    icon: 'nintendo',
    category: 'gaming',
    description: 'Online play for Nintendo Switch games and classic NES/SNES titles',
    plans: [
      {
        id: 'nintendo-individual',
        name: 'Individual',
        type: 'individual',
        price: '$3.99/month',
        maxUsers: 1,
        features: ['Online play', 'NES & SNES games', 'Cloud saves']
      },
      {
        id: 'nintendo-family',
        name: 'Family',
        type: 'family',
        price: '$34.99/year',
        maxUsers: 8,
        features: ['Up to 8 account holders', 'Each member gets their own online access']
      }
    ]
  },
  {
    id: 'amazon-prime',
    name: 'Amazon Prime',
    icon: 'amazon',
    category: 'streaming',
    description: 'Free shipping, Prime Video, Prime Music, and more',
    plans: [
      {
        id: 'amazon-individual',
        name: 'Individual',
        type: 'individual',
        price: '$14.99/month',
        maxUsers: 1,
        features: ['Free shipping', 'Prime Video', 'Prime Music']
      },
      {
        id: 'amazon-family',
        name: 'Household',
        type: 'family',
        price: '$14.99/month',
        maxUsers: 2,
        features: ['Share with one adult', 'Amazon Household benefits']
      }
    ]
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    icon: 'apple-music',
    category: 'music',
    description: 'Music streaming service by Apple',
    plans: [
      {
        id: 'apple-music-individual',
        name: 'Individual',
        type: 'individual',
        price: '$10.99/month',
        maxUsers: 1,
        features: ['90 million songs', 'Spatial Audio with Dolby Atmos']
      },
      {
        id: 'apple-music-family',
        name: 'Family',
        type: 'family',
        price: '$16.99/month',
        maxUsers: 6,
        features: ['Up to 6 people', 'Each gets their own library']
      }
    ]
  },
  {
    id: 'paramount-plus',
    name: 'Paramount+',
    icon: 'paramount',
    category: 'streaming',
    description: 'CBS, Paramount Pictures, Nickelodeon, MTV, and Comedy Central content',
    plans: [
      {
        id: 'paramount-essential',
        name: 'Essential',
        type: 'individual',
        price: '$5.99/month',
        maxUsers: 1,
        features: ['Limited ads', 'NFL on CBS']
      },
      {
        id: 'paramount-premium',
        name: 'Premium',
        type: 'family',
        price: '$11.99/month',
        maxUsers: 3,
        features: ['No ads', 'CBS live stream', 'Download shows to watch offline']
      }
    ]
  },
  {
    id: 'ea-play',
    name: 'EA Play',
    icon: 'ea',
    category: 'gaming',
    description: 'Electronic Arts game subscription service',
    plans: [
      {
        id: 'ea-standard',
        name: 'Standard',
        type: 'individual',
        price: '$4.99/month',
        maxUsers: 1,
        features: ['Access to EA games', '10-hour trials of new games']
      },
      {
        id: 'ea-pro',
        name: 'Pro',
        type: 'individual',
        price: '$14.99/month',
        maxUsers: 1,
        features: ['Early access to new releases', 'Pro-exclusive content']
      }
    ]
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    icon: 'crunchyroll',
    category: 'streaming',
    description: 'Anime streaming service',
    plans: [
      {
        id: 'crunchyroll-fan',
        name: 'Fan',
        type: 'individual',
        price: '$7.99/month',
        maxUsers: 1,
        features: ['Ad-free', 'Simulcasts', 'Watch on 1 device at a time']
      },
      {
        id: 'crunchyroll-mega-fan',
        name: 'Mega Fan',
        type: 'family',
        price: '$9.99/month',
        maxUsers: 4,
        features: ['Watch on 4 devices at once', 'Offline viewing']
      }
    ]
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    icon: 'microsoft',
    category: 'productivity',
    description: 'Office apps, cloud storage, and more',
    plans: [
      {
        id: 'microsoft-personal',
        name: 'Personal',
        type: 'individual',
        price: '$6.99/month',
        maxUsers: 1,
        features: ['Word, Excel, PowerPoint', '1TB OneDrive storage']
      },
      {
        id: 'microsoft-family',
        name: 'Family',
        type: 'family',
        price: '$9.99/month',
        maxUsers: 6,
        features: ['Up to 6 people', '1TB OneDrive storage per person']
      }
    ]
  },
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud',
    icon: 'adobe',
    category: 'productivity',
    description: 'Suite of Adobe creative applications',
    plans: [
      {
        id: 'adobe-photography',
        name: 'Photography',
        type: 'individual',
        price: '$9.99/month',
        maxUsers: 1,
        features: ['Photoshop', 'Lightroom', '20GB cloud storage']
      },
      {
        id: 'adobe-all-apps',
        name: 'All Apps',
        type: 'individual',
        price: '$54.99/month',
        maxUsers: 1,
        features: ['All creative apps', '100GB cloud storage']
      }
    ]
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
 * Get all available plan types
 */
export const getPlanTypes = (): PlanType[] => {
  return ['individual', 'family', 'group'];
};

/**
 * Get subscriptions filtered by plan type
 * @param planType The plan type to filter by
 */
export const getSubscriptionsByPlanType = (planType: PlanType): Subscription[] => {
  return subscriptions.filter(sub => 
    sub.plans.some(plan => plan.type === planType)
  );
};

/**
 * Get all plans for a specific subscription
 * @param subscriptionId The subscription ID
 */
export const getPlansForSubscription = (subscriptionId: string): Plan[] => {
  const subscription = getSubscriptionById(subscriptionId);
  return subscription ? subscription.plans : [];
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

export interface Property {
  id: string;
  title: string;
  location: string;
  views: number;
  rating: number;
  dateRange: string;
  images: string[];
  liked: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Sushant Lok 2, Gurgaon',
    location: 'Gurgaon',
    views: 41172,
    rating: 3.82,
    dateRange: 'Mar 12 - 16',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    ],
    liked: false,
    coordinates: {
      lat: 28.4595,
      lng: 77.0266
    }
  },
  {
    id: '2',
    title: 'Rainbow Heights, HSR',
    location: 'HSR Layout',
    views: 8402,
    rating: 5.0,
    dateRange: 'Mar 8 - 14',
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800',
    ],
    liked: false,
    coordinates: {
      lat: 12.9081,
      lng: 77.6476
    }
  },
  {
    id: '3',
    title: 'Walden, Colorado, US',
    location: 'Colorado',
    views: 12648,
    rating: 4.82,
    dateRange: 'Mar 3 - 8',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    ],
    liked: false,
    coordinates: {
      lat: 40.7317,
      lng: -106.2839
    }
  },
  {
    id: '4',
    title: 'Poggibonsi, Italy',
    location: 'Italy',
    views: 81483,
    rating: 5.0,
    dateRange: 'Apr 28 - May 1',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800',
    ],
    liked: true,
    coordinates: {
      lat: 43.4715,
      lng: 11.1464
    }
  }
];
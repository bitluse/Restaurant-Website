// Restaurant Types

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'appetizers' | 'main' | 'desserts' | 'drinks';
  image: string;
  badge?: 'popular' | 'chefs-special' | 'new' | 'vegetarian';
  dietary?: ('vegetarian' | 'vegan' | 'gluten-free')[];
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  specialRequests?: string;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

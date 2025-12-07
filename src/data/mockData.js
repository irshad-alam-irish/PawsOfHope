// Mock Data for Paw of Hope NGO Dashboard

// Summary Statistics
export const summaryStats = {
  totalAnimals: 112,
  availableForAdoption: 78,
  adoptedAnimals: 34,
  pendingReports: 6
};

// Monthly Adoption Data for Chart
export const adoptionTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  data: [5, 8, 12, 7, 15, 18, 22, 19, 25, 20, 28, 34]
};

// Report Status Data for Pie Chart
export const reportStatusData = {
  labels: ['Pending', 'In Progress', 'Resolved'],
  data: [6, 4, 15],
  colors: ['#ffc107', '#17a2b8', '#28a745']
};

// Recently Reported Cases
export const recentReports = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop',
    location: 'Sector 15, Noida',
    problem: 'Injured dog found near highway',
    reporter: 'Rahul Sharma',
    status: 'pending',
    date: '2024-12-07'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop',
    location: 'MG Road, Delhi',
    problem: 'Stray cat with broken leg',
    reporter: 'Priya Singh',
    status: 'in-progress',
    date: '2024-12-06'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100&h=100&fit=crop',
    location: 'Connaught Place, Delhi',
    problem: 'Abandoned puppy in cardboard box',
    reporter: 'Amit Kumar',
    status: 'pending',
    date: '2024-12-06'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&h=100&fit=crop',
    location: 'Laxmi Nagar, Delhi',
    problem: 'Malnourished kitten needs help',
    reporter: 'Sneha Gupta',
    status: 'resolved',
    date: '2024-12-05'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop',
    location: 'Dwarka Sector 21',
    problem: 'Two dogs stuck in drain',
    reporter: 'Vikram Patel',
    status: 'in-progress',
    date: '2024-12-05'
  }
];

// Popular Animals (Most Viewed)
export const popularAnimals = [
  {
    id: 1,
    name: 'Bruno',
    type: 'Dog',
    breed: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop',
    views: 1250,
    interests: 45
  },
  {
    id: 2,
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Persian',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=100&h=100&fit=crop',
    views: 980,
    interests: 38
  },
  {
    id: 3,
    name: 'Max',
    type: 'Dog',
    breed: 'German Shepherd',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=100&h=100&fit=crop',
    views: 856,
    interests: 32
  },
  {
    id: 4,
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=100&h=100&fit=crop',
    views: 720,
    interests: 28
  },
  {
    id: 5,
    name: 'Rocky',
    type: 'Dog',
    breed: 'Labrador',
    image: 'https://images.unsplash.com/photo-1579213838826-64a346dbc3cc?w=100&h=100&fit=crop',
    views: 650,
    interests: 25
  }
];

// Recent Comments
export const recentComments = [
  {
    id: 1,
    username: 'Anita Desai',
    avatar: 'https://i.pravatar.cc/40?img=1',
    comment: 'Bruno is such a beautiful dog! Would love to adopt him.',
    animal: 'Bruno',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    username: 'Raj Malhotra',
    avatar: 'https://i.pravatar.cc/40?img=2',
    comment: 'Is Whiskers good with children?',
    animal: 'Whiskers',
    timestamp: '3 hours ago'
  },
  {
    id: 3,
    username: 'Meera Joshi',
    avatar: 'https://i.pravatar.cc/40?img=3',
    comment: 'Max looks so healthy now! Great work team!',
    animal: 'Max',
    timestamp: '5 hours ago'
  },
  {
    id: 4,
    username: 'Suresh Iyer',
    avatar: 'https://i.pravatar.cc/40?img=4',
    comment: 'Luna is adorable! What is the adoption process?',
    animal: 'Luna',
    timestamp: '6 hours ago'
  },
  {
    id: 5,
    username: 'Kavita Reddy',
    avatar: 'https://i.pravatar.cc/40?img=5',
    comment: 'Thank you for taking care of these beautiful souls!',
    animal: 'Rocky',
    timestamp: '8 hours ago'
  }
];

// Adoption Requests
export const adoptionRequests = [
  {
    id: 1,
    userName: 'Arun Kapoor',
    userAvatar: 'https://i.pravatar.cc/40?img=10',
    animalName: 'Bruno',
    animalImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=50&h=50&fit=crop',
    requestDate: '2024-12-07',
    status: 'pending',
    phone: '+91 98765 43210',
    email: 'arun.kapoor@email.com'
  },
  {
    id: 2,
    userName: 'Pooja Sharma',
    userAvatar: 'https://i.pravatar.cc/40?img=11',
    animalName: 'Luna',
    animalImage: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=50&h=50&fit=crop',
    requestDate: '2024-12-06',
    status: 'approved',
    phone: '+91 87654 32109',
    email: 'pooja.s@email.com'
  },
  {
    id: 3,
    userName: 'Nikhil Verma',
    userAvatar: 'https://i.pravatar.cc/40?img=12',
    animalName: 'Max',
    animalImage: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=50&h=50&fit=crop',
    requestDate: '2024-12-06',
    status: 'pending',
    phone: '+91 76543 21098',
    email: 'nikhil.v@email.com'
  },
  {
    id: 4,
    userName: 'Shalini Nair',
    userAvatar: 'https://i.pravatar.cc/40?img=13',
    animalName: 'Whiskers',
    animalImage: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=50&h=50&fit=crop',
    requestDate: '2024-12-05',
    status: 'pending',
    phone: '+91 65432 10987',
    email: 'shalini.n@email.com'
  },
  {
    id: 5,
    userName: 'Deepak Choudhary',
    userAvatar: 'https://i.pravatar.cc/40?img=14',
    animalName: 'Rocky',
    animalImage: 'https://images.unsplash.com/photo-1579213838826-64a346dbc3cc?w=50&h=50&fit=crop',
    requestDate: '2024-12-05',
    status: 'rejected',
    phone: '+91 54321 09876',
    email: 'deepak.c@email.com'
  }
];

// All Animals (for search functionality)
export const allAnimals = [
  {
    id: 1,
    name: 'Bruno',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    gender: 'Male',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Whiskers',
    type: 'Cat',
    breed: 'Persian',
    age: '1 year',
    gender: 'Female',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=200&h=200&fit=crop'
  },
  {
    id: 3,
    name: 'Max',
    type: 'Dog',
    breed: 'German Shepherd',
    age: '3 years',
    gender: 'Male',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=200&h=200&fit=crop'
  },
  {
    id: 4,
    name: 'Luna',
    type: 'Cat',
    breed: 'Siamese',
    age: '8 months',
    gender: 'Female',
    status: 'adopted',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=200&h=200&fit=crop'
  },
  {
    id: 5,
    name: 'Rocky',
    type: 'Dog',
    breed: 'Labrador',
    age: '4 years',
    gender: 'Male',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1579213838826-64a346dbc3cc?w=200&h=200&fit=crop'
  },
  {
    id: 6,
    name: 'Milo',
    type: 'Dog',
    breed: 'Beagle',
    age: '1 year',
    gender: 'Male',
    status: 'treatment',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop'
  }
];

// Users data (for search)
export const users = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', type: 'reporter' },
  { id: 2, name: 'Priya Singh', email: 'priya@email.com', type: 'adopter' },
  { id: 3, name: 'Amit Kumar', email: 'amit@email.com', type: 'adopter' },
  { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', type: 'reporter' },
  { id: 5, name: 'Vikram Patel', email: 'vikram@email.com', type: 'reporter' }
];

// Notifications
export const notifications = [
  { id: 1, type: 'adoption', message: 'New adoption request for Bruno', time: '5 min ago', read: false },
  { id: 2, type: 'report', message: 'New injured animal reported in Sector 15', time: '1 hour ago', read: false },
  { id: 3, type: 'comment', message: 'New comment on Max\'s profile', time: '2 hours ago', read: true },
  { id: 4, type: 'adoption', message: 'Luna adoption completed!', time: '3 hours ago', read: true },
  { id: 5, type: 'report', message: 'Report #4 marked as resolved', time: '5 hours ago', read: true }
];

const booksData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    description: "A classic American novel about the Jazz Age."
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "A gripping tale of racial injustice and childhood innocence in the American South."
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 13.50,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
    description: "A dystopian social science fiction novel about totalitarian control."
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    description: "A romantic novel of manners set in Georgian England."
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    description: "A controversial novel about teenage rebellion and alienation."
  },
  {
    id: 6,
    title: "Lord of the Flies",
    author: "William Golding",
    price: 12.50,
    image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&h=400&fit=crop",
    description: "A British novel about a group of boys stranded on an uninhabited island."
  },
  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop",
    description: "An epic high-fantasy novel set in Middle-earth."
  },
  {
    id: 8,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    description: "The first book in the magical Harry Potter series."
  },
  {
    id: 9,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "A fantasy novel about Bilbo Baggins' unexpected journey."
  },
  {
    id: 10,
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 13.25,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
    description: "A dystopian novel set in a futuristic world state."
  },
  {
    id: 11,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    price: 12.75,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    description: "A novel following the experiences of its eponymous heroine."
  },
  {
    id: 12,
    title: "Wuthering Heights",
    author: "Emily Brontë",
    price: 11.50,
    image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&h=400&fit=crop",
    description: "A tale of passion and revenge on the Yorkshire moors."
  },
  {
    id: 13,
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop",
    description: "A series of seven fantasy novels set in the magical land of Narnia."
  },
  {
    id: 14,
    title: "Animal Farm",
    author: "George Orwell",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    description: "An allegorical novella about farm animals who rebel against their owner."
  },
  {
    id: 15,
    title: "Of Mice and Men",
    author: "John Steinbeck",
    price: 12.25,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    description: "A novella about the friendship between two displaced migrant ranch workers."
  },
  {
    id: 16,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    price: 15.50,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    description: "A novel set during the Great Depression, focusing on the Joad family."
  },
  {
    id: 17,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    price: 13.75,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
    description: "A dystopian novel about a future where books are banned."
  },
  {
    id: 18,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    price: 14.25,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    description: "A philosophical novel about a man whose portrait ages while he remains young."
  },
  {
    id: 19,
    title: "Dracula",
    author: "Bram Stoker",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=300&h=400&fit=crop",
    description: "A Gothic horror novel introducing Count Dracula."
  },
  {
    id: 20,
    title: "Frankenstein",
    author: "Mary Shelley",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop",
    description: "A Gothic novel about a scientist who creates a sapient creature."
  }
];

export default booksData;
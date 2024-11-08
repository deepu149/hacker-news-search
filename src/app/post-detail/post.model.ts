export interface Post {
    objectID: string;
    title: string;
    author: string;
    url: string;
    points?: number;  // Optional field for points
    // Add any other fields based on the API response
  }
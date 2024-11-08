import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  private apiUrl = 'https://hn.algolia.com/api/v1'; // Base URL for Algolia API

  constructor(private http: HttpClient) {}

  // Method to fetch posts based on a search query
  getPosts(query: string = ''): Observable<any> {
    const params = new HttpParams().set('query', query); // Add query parameters for search if provided

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  // getPostDetails(postId: string): Observable<Post> {
  //   const url = `https://hn.algolia.com/api/v1/items/${postId}`;  // Using the correct API URL
  //   return this.http.get<Post>(url);
  // }

  getPostDetails(postId: string): Observable<any> {
    const url = `${this.apiUrl}/items/${postId}`;
    return this.http.get<any>(url);  // Return the post data
  }
  getPostById(id: string) {
    return this.http.get<Post>(`https://hn.algolia.com/api/v1/items/${id}`);
  }
}

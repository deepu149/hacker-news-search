import { Component, OnInit, ViewChild } from '@angular/core';
import { HackerNewsService } from '../service/hacker-news.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface Post {
  objectID: string;
  title: string;
  author: string;
  url: string;
}

export interface SearchResponse {
  hits: Post[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  posts: Post[] = [];
  displayedColumns: string[] = ['id', 'title', 'author',  'points', 'url'];
  dataSource = new MatTableDataSource<Post>();
  searchQuery: string = '';

  constructor(
    private hackerNewsService: HackerNewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosts(); // Fetch all posts initially
  }

  getPosts(): void {
    this.hackerNewsService.getPosts(this.searchQuery).subscribe((response) => {
      this.posts = response.hits;
      this.dataSource.data = this.posts;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onSearch(): void {
    this.getPosts(); // Fetch posts again based on search query
  }

  // Clear search input and reset filter
  clearSearch(): void {
    this.searchQuery = '';
    this.dataSource.filter = ''; // Reset the filter to show all posts
    this.getPosts(); 
  }

  // Add this method to navigate to post details page
  viewPostDetails(postId: string): void {
    this.router.navigate(['/post', postId]); // Navigate to post detail page
  }
}

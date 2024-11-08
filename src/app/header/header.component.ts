import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HackerNewsService } from '../service/hacker-news.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  query: string = ''; 
  constructor(private hackerNewsService: HackerNewsService, private router: Router) {}


  onSearch(): void {
    if (this.query) {
      this.hackerNewsService.getPosts(this.query).subscribe(posts => {
        this.router.navigate(['/'], { queryParams: { query: this.query } });
      });
    }
  }

  ngOnInit(): void {
  }

}

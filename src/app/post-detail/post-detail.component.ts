import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from '../service/hacker-news.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Post } from '../home/home.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postDetails: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private hackerNewsService: HackerNewsService
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');  // Get the post ID from route
    if (postId) {
      this.hackerNewsService.getPostById(postId).subscribe(post => {
        this.postDetails = post;  // Fetch and store the post details
      });
    }
  }
}

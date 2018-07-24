import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Tweet } from '../tweet';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  inflight = false;
  tweets: Tweet[] = [];
  ids = [];
  since = '';
  sort  = [ 'favourite_Count', 'retweet_count', 'id'];
  counts  = [50,100, 150,200,250,300,350,400]; 
  curCount : number = 0;
  curType = '';

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.getTweets();
  }

  onSortSelect(event) {
    this.curType = event.target.value;
    if(this.curType == 'favourite_Count') {
      this.tweets.sort(function (a, b) {
        return a.user.favourites_count - b.user.favourites_count;
      });
    } else if (this.curType == 'retweet_count') {
      this.tweets.sort(function (a, b) {
        return a.retweet_count - b.retweet_count;
      });
    } else if(this.curType == 'id' ) {
      this.tweets.sort(function (a, b) {
        return a.id- b.id;
      });
    } else {
      this.tweets.sort(function (a, b) {
        return a.retweet_count - b.retweet_count;
      });
    }
  }

  logText(searchKey : string) {
      this.since = searchKey;
      this.since = this.since.replace(/#/g, "%23");
      this.getTweets();
  }

  onCountSelect(event) {
    this.curCount = event.target.value;
  }


  getTweets() {
    for (var i = this.tweets.length; i > 0; i--) {
      this.tweets.pop();
    }
    this.twitter.home(this.since, this.curCount).subscribe(tweets => {
      
      try{
      tweets.data.statuses.forEach(tweet => {
          this.ids.push(tweet.id_str);
          this.tweets.unshift(tweet);
      });
      } catch(err) {
      }
    });
  }

}

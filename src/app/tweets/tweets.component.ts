import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Tweet } from '../tweet';
import { TwitterService } from '../twitter.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  tweets: Tweet[] = [];
  ids = [];
  since = '';
  sort  = ['' , 'Favorite Count', 'Retweet Count', 'Id', 'Creation Date'];
  counts  = ['']; 
  curCount : number = 0;
  curType = '';

  constructor(private twitter: TwitterService) {}

  ngOnInit() {
    this.getTweets();
    for (var i = 10; i <= 500; i+= 10) {
      this.counts.push(i.toString());
    } 
  }

  onSortSelect(event) {
    this.curType = event.target.value;
    if(this.curType == 'Favorite Count') {
      this.tweets.sort(function (a, b) {
        return a.user.favourites_count - b.user.favourites_count;
      });
    } else if (this.curType == 'Retweet Count') {
      this.tweets.sort(function (a, b) {
        return a.retweet_count - b.retweet_count;
      });
    } else if(this.curType == 'Id' ) {
      this.tweets.sort(function (a, b) {
        return a.id- b.id;
      });
    } else if(this.curType == ''){
        //Do nothing
      }else if(this.curType == 'Creation Date'){
        this.tweets.sort(function (a, b) {
        return b.created_at.localeCompare(a.created_at);
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

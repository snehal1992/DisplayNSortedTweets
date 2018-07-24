import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Tweet } from './tweet';

export interface TwitterResponse {
  data: any;
  resp: any;
}

@Injectable()
export class TwitterService {

  constructor(private http: HttpClient) { }

  user() {
    return this.http.get<TwitterResponse>(`${environment.api}/user`);
  }

  home(since?: string, curCount?: number) {
    return this.http.get<TwitterResponse>(`${environment.api}/home?since=${since}&count=${curCount}`);
  }
}

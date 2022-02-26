import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { ApiConfig } from 'src/app/interfaces/api-config.interface';
import { Joke } from 'src/app/interfaces/joke.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly debug: boolean = false;
  private apiConfig: ApiConfig;
  private amount: number;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.apiConfig = this.configService.getApiConfig();
    this.amount = this.configService.get('app', 'itemsPerPage') || 10;
  }

  // requests
  public getJokes(categories: string[], flags: string[], amount: number = this.amount): Observable<Joke[]> {
    const url = this.getJokesUrl(categories, flags, amount);
    return this.http.get(url, { observe: 'response' }).pipe(
      tap(res => { if (this.debug) console.log('# ApiService getJokes Response:', res) }),
      map((response: HttpResponse<any>) => response.body.jokes || []),
    );
  }

  // public url strings
  public getImage(seed: string, type: string = ''): string {
    return this.getImageUrl(seed, type);
  }

  // urls
  private getJokesUrl(categories: string[], flags: string[], amount: number): string {
    let url = this.apiConfig.jokesUrl;
    url = url.replace('{categories}', categories.join(','));
    url = url.replace('{flags}', flags.join(','));
    url = url.replace('{amount}', amount.toString());
    return url;
  }

  private getImageUrl(seed: string, type: string): string {
    let url = this.apiConfig.imageUrl;
    url = url.replace('{seed}', seed);
    url = url.replace('{width}', this.configService.get('app', 'imageWidth'));
    url = url.replace('{height}', this.configService.get('app', 'imageHeight'));
    if (type === 'blurred') url += '?blurred';
    if (type === 'grayscale') url += '?grayscale';
    return url;
  }

}

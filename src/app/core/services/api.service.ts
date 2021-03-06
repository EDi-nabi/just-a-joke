import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConfigService } from './config.service';
import { ApiConfig } from 'src/app/interfaces/api-config.interface';
import { Joke } from 'src/app/interfaces/joke.interface';
import { SubmitPayload } from 'src/app/interfaces/submit-payload.interface';
import { SubmitResponse } from 'src/app/interfaces/submit-response.interface';

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
    this.amount = this.configService.get('app', 'itemsPerPage');
  }

  // requests
  public getJokes(categories: string[], amount: number = this.amount): Observable<Joke[]> {
    const url = this.getJokesUrl(categories, amount);
    return this.http.get(url, { observe: 'response' }).pipe(
      tap(res => { if (this.debug) console.log('# ApiService getJokes Response:', res) }),
      map((response: HttpResponse<any>) => response.body.jokes || []),
    );
  }

  public submitJoke(joke: SubmitPayload): Observable<SubmitResponse> {
    const url = this.getSubmitJokeUrl();
    return this.http.post(url, joke, { observe: 'response' }).pipe(
      tap(res => { if (this.debug) console.log('# ApiService submitJoke Response:', res) }),
      map((response: HttpResponse<any>) => response.body as SubmitResponse),
    );
  }

  // public url strings
  public getImage(seed: string, type: string = ''): string {
    return this.getImageUrl(seed, type);
  }

  // urls
  private getJokesUrl(categories: string[], amount: number): string {
    let url = this.apiConfig.jokesUrl;
    url = url.replace('{categories}', categories.join(','));
    url = url.replace('{amount}', amount.toString());
    return url;
  }

  private getSubmitJokeUrl(): string {
    let url = this.apiConfig.submitJokeUrl;
    if (this.configService.get('app', 'dryRun')) {
      url += '?dry-run'
    }
    return url;
  }

  private getImageUrl(seed: string, type: string): string {
    let url = this.apiConfig.imageUrl;
    url = url.replace('{seed}', seed);
    url = url.replace('{width}', this.configService.get('app', 'imageWidth'));
    url = url.replace('{height}', this.configService.get('app', 'imageHeight'));
    if (type === 'blur') url += '?blur=3';
    if (type === 'grayscale') url += '?grayscale';
    if (type === 'grayscale&blur') url += '?grayscale&blur=3';
    return url;
  }

}

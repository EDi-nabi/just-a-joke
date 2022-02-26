import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppConfigService } from './app-config.service';
import { ApiConfig } from 'src/app/interfaces/api-config.interface';
import { Joke } from 'src/app/interfaces/joke.interface';
import { JokesResponse } from 'src/app/interfaces/jokes-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly debug: boolean = false;
  private apiConfig: ApiConfig;
  private amount: number;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
  ) {
    this.apiConfig = this.appConfigService.getApiConfig();
    this.amount = this.appConfigService.get('itemsPerPage') || 10;
  }

  // requests
  public getJokes(categories: string[], flags: string[], amount: number = this.amount): Observable<Joke[]> {
    const url = this.getJokesUrl(categories, flags, amount);
    return this.http.get(url, { observe: 'response' }).pipe(
      tap(res => { if (this.debug) console.log('# ApiService getJokes Response:', res) }),
      map((response: HttpResponse<any>) => response.body.jokes || []),
    );
  }

  // urls
  private getJokesUrl(categories: string[], flags: string[], amount: number): string {
    let url = this.apiConfig.jokesUrl;
    url = url.replace('{categories}', categories.join(','));
    url = url.replace('{flags}', flags.join(','));
    url = url.replace('{amount}', amount.toString());
    return url;
  }

}

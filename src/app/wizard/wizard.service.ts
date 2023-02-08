import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of } from 'rxjs';
import { ListItem, Step } from 'carbon-components-angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  steps: Step[];

  constructor(private http: HttpClient) {}
  sendRequest(url: string, method = 'GET', data: any = {}): any {
    let httpParams = new HttpParams(data);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const httpOptions = {
      headers: headers,
      withCredentials: true,
      body: httpParams,
    };

    let result;

    switch (method) {
      case 'GET':
        result = this.http.get(url, httpOptions);
        break;
      case 'POST':
        result = this.http.post(url, data, httpOptions);
        break;
      case 'PUT':
        result = this.http.put(url, data, httpOptions);
        break;
      case 'DELETE':
        result = this.http.delete(url, httpOptions);
        break;
    }

    console.log('result');
    console.log(result);

    return result
      .toPromise()
      .then((data: any) => data)
      .catch((e) => {
        throw e && e.error && e.error.Message;
      });
  }

  getGroupItemList(): Observable<ListItem[]> {
    let items: ListItem[] = [
      { content: 'ROOT', selected: true },
      { content: 'ADMIN', selected: false },
      { content: 'USER', selected: false },
    ];
    return of(items);
  }

  getTechnItemList(): Observable<ListItem[]> {
    let items: ListItem[] = [
      { content: 'Unassigned', selected: true },
      { content: 'ADMIN', selected: false },
      { content: 'USER', selected: false },
    ];
    return of(items);
  }

  getInitialSteps(): Step[] {
    this.steps = [
      {
        text: 'Step 1',
        state: ['complete', 'incomplete']
      },
      {
        text: 'Step 2',
        state: ['complete', 'incomplete']
      },
      {
        text: 'Step 3',
        state: ['complete', 'incomplete']
      },
      {
        text: 'Step 4',
        state: ['complete', 'incomplete']
      }
    ];
    return this.steps;
  }
}

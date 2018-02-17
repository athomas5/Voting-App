import { Injectable } from '@angular/core';

@Injectable()
export class MLabService {
  API_KEY: string = 'yI91dhkKuGjCZFNSXzNNwuejIJMU4tOw';
  GET_OPTIONS_URL: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/options?apiKey=';
  GET_USERS_URL: string = 'https://api.mlab.com/api/1/databases/voting-app/collections/users?apiKey=';

  constructor() { }

}

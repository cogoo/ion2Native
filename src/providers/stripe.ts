import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Stripe provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Stripe {

  constructor(public http: Http) {
    console.log('Hello Stripe Provider');
  }

  generateToken(card) {
    let headers = new Headers({
      'X-Mashape-Key': 'VM7WufhrblmshmmRv0MXJEuiB1Tkp1I5KWkjsnsPpmrxml131T',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });

    let data = new URLSearchParams();
    data.append('number', card.number);
    data.append('cvc', card.cvc);
    data.append('exp_month', card.exp_month);
    data.append('exp_year', card.exp_year);
    data.append('test', 'false');
    data.append('livemode', 'true');

    return this.http.post(
      'https://noodlio-pay.p.mashape.com/tokens/create',
      data,
      options
    )
      .map(res => res.json())
  }

  charge(token, amount) {
    let headers = new Headers({
      'X-Mashape-Key': 'VM7WufhrblmshmmRv0MXJEuiB1Tkp1I5KWkjsnsPpmrxml131T',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    let data = new URLSearchParams();
    data.append('amount', amount);
    data.append('currency', 'gbp');
    data.append('description', 'purchase from CardIO');
    data.append('source', token);
    data.append('stripe_account', 'acct_19IednAf6LmvO2is');
    data.append('test', 'false');
    data.append('livemode', 'true');

    return this.http.post(
      'https://noodlio-pay.p.mashape.com/charge/token',
      data,
      options
    )
      .map(res => res.json())
  }

}

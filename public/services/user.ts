import {Component, Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

import {bootstrap} from "angular2/platform/browser";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {User} from "../models/user.ts";

@Injectable()

export class UserService{
  users: Subject<User[]> = new Subject<User[]>();

  constructor(http: Http){};
  //
  getAllUsers(){
    http.get("https://swim-site.herokuapp.com/users")
        .map((function(res){res.json()})
        .subscribe(function(users){this.users.next(users)});
  };
  // // getuser(id){
  // //   http.get(`https://swim-site.herokuapp.com/users/${id}`)
  // //       .map(res => res.json())
  // //       .subscribe(user => this.user = user)
  // // };
  addUser(user){};
}

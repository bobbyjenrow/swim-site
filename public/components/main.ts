import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {UserService} from "../services/user.ts";
import {User} from "../models/user.ts";

@Component({
  selector: 'user-list',
  template:  `
  <table>
    <tr>
      <th> <label>Name</label> </th>
      <th> <label>Email</label> </th>
      <th> <label>UserName</label> </th>
      <th> <label>Role</label> </th>
      <th> <label>-Id</label> </th>
    </tr>
    <tr *ngFor="#user of users">
      <th> <label>{{user.bio.name}}</label> </th>
      <th> <label>{{user.email}}</label> </th>
      <th> <label>{{user.userName}}</label> </th>
      <th> <label>{{user.role}}</label> </th>
      <th> <label>{{user._id}}</label> </th>
    </tr>
  </table>
  <button (click)="getUser(id)">Click</button><br/>
  <input type="text" #id/><br/>
  {{user.email}}<br/>

  `,
  providers: [UserService]

})

export class UserListComponent{
  users: Observable<User[]> = new Observable<User[]>();

  constructor(public userService: UserService){
    userService.getUser
  }

  getUser(id){
    userService.getUser(id);
  };

}

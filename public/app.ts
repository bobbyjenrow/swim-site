import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {UserListComponent} from "./components/main.ts";
import {HTTP_PROVIDERS} from "angular2/http";

@Component({
  selector: 'app',
  template: `
    <h2>Component Loaded</h2>
    <user-list> list loading </user-list>
  `,
  directives: [UserListComponent],
  providers: [HTTP_PROVIDERS]
})

class App{
  constructor(){}
}

bootstrap(App);

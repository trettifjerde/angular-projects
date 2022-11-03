import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  users: string[] = [];
  
  constructor(private userService: UserService) {
    this.users = this.userService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.userService.activate(id);
  }
}

import { ToastService } from './toast.service';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private messageService: MessageService, private toast: ToastService) {}

  show() {
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
this.toast.showSuccess("experiemt successed")
  }
}

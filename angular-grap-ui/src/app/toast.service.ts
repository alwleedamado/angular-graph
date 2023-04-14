import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })

export class ToastService {
    private msgs: any[];
    constructor(private service: MessageService) { }

    showInfo(title, message) {
        this.service.add({ severity: 'info', summary: title, detail: message });
    }

    showWarn(title, message?) {
        this.service.add({ severity: 'warn', summary: title, detail: message });
    }

    showError(title, message?) {
        this.service.add({ severity: 'error', summary: title, detail: message });
    }

    showSuccess(title, message?) {
        this.service.add({ severity: 'success', summary: title, detail: message });
    }

}
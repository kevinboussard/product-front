import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class AltenMessageService {


    constructor(private messageService: MessageService){}

    successMessage(successMessage: string): void{
        this.messageService.add({severity:'success', summary: 'Successful', detail: successMessage, life: 3000});   
    }

    errorMessage(errorMessage: string): void{
        this.messageService.add({severity:'error', summary: 'Error', detail: errorMessage, life: 3000});
    }
    
}
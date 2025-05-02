import { Component, OnInit } from '@angular/core';
import { QuestionBase } from '../../models/questions/question-base';
import { Observable } from 'rxjs';
import { QuestionService } from '../../service/question/question.service';
import { DynamicService } from '../../service/dynamic-service/dynamic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/loginService/login.service';
import { DynamicFormComponent } from '../../dynamic-components/dynamic-form/dynamic-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [DynamicFormComponent, AsyncPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{
  LoginQuestions$: Observable<QuestionBase<any>[]>; 

  constructor(service: QuestionService,private loginService:LoginService, private router: Router,  private route: ActivatedRoute){
    this.LoginQuestions$ = service.getLoginQuestions();
  }
  ngOnInit(): void {
   
  }
  save(payload: any){
    console.log(payload);
    
    this.loginService.login(payload).subscribe({
      next: (res) => {
        console.log("Uspešna prijava", res);
      },
      error: (err) => {
        console.error("Greška pri prijavi", err);
      }
    }); 
  }
}

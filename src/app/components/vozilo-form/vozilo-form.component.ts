import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { QuestionBase } from '../../models/questions/question-base';
import { QuestionService } from '../../service/question/question.service';
import { DynamicService } from '../../service/dynamic-service/dynamic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vozilo } from '../../models/vozilo';
import { DynamicFormComponent } from '../../dynamic-components/dynamic-form/dynamic-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-vozilo-form',
  imports: [DynamicFormComponent, AsyncPipe],
  templateUrl: './vozilo-form.component.html',
  styleUrl: './vozilo-form.component.css'
})
export class VoziloFormComponent implements OnInit{
  selectedVozilo: any = {};
  private routeSub: Subscription = new Subscription;
  voziloId: string | null = null;
  VoziloQuestions$: Observable<QuestionBase<any>[]>; 

  constructor(service: QuestionService,private httpService:DynamicService, private router: Router,  private route: ActivatedRoute){
    this.VoziloQuestions$ = service.getVoziloQuestions();
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.voziloId = params.get('id');
      if (this.voziloId) {
        this.httpService.getById<Vozilo>('vozila', Number(this.voziloId)).subscribe(data => {
          this.selectedVozilo = data;
        });
      }
    });
  }

  save(payload: any){
    if(this.voziloId){
      this.httpService.update<Vozilo>("vozila", Number(this.voziloId), payload).subscribe(()=>{
        this.router.navigate(["/vozila"]);
      });
      return
    }
    this.httpService.create<Vozilo>("vozila", payload).subscribe(()=>{
      this.router.navigate(["/vozila"]);
    });
  }
}

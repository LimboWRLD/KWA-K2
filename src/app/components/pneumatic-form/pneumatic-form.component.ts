import { Component } from '@angular/core';
import { QuestionService } from '../../service/question/question.service';
import { QuestionBase } from '../../models/questions/question-base';
import { DynamicService } from '../../service/dynamic-service/dynamic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pneumatik } from '../../models/pneumatic';
import { DropdownQuestion } from '../../models/questions/question-dropdown';
import { Vozilo } from '../../models/vozilo';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DynamicFormComponent } from '../../dynamic-components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-pneumatic-form',
  imports: [AsyncPipe, DynamicFormComponent],
  templateUrl: './pneumatic-form.component.html',
  styleUrl: './pneumatic-form.component.css'
})
export class PneumaticFormComponent {
  selectedPneumatic: any = {};
  pneumaticId: string | null = null;
  PneumaticQuestions$: Observable<QuestionBase<any>[]>; 

  constructor(service: QuestionService,private httpService:DynamicService, private router: Router,  private route: ActivatedRoute){
    this.PneumaticQuestions$ = service.getPneumatikQuestions();
  }
  ngOnInit(): void {
    this.pneumaticId = this.route.snapshot.paramMap.get("id");
    if(this.pneumaticId){
      this.httpService.getById<Pneumatik>("pneumatici", Number(this.pneumaticId)).subscribe(data => this.selectedPneumatic = data);
    }
    this.httpService.getAll<Vozilo>("vozila").subscribe(data=>{
      this.PneumaticQuestions$.subscribe((questions)=>{
        const dropdownQuestion = questions.find((q) => q.key === 'idVozila') as DropdownQuestion;
        if (dropdownQuestion) {
          dropdownQuestion.options = data.map((d) => ({
            id: d.id,
            naziv: d.registarskiBroj
          }));
        }
      })
    });
  }

  private isSamePneumatic(a: Pneumatik, b: Pneumatik): boolean {
    return (
      a.idVozila === b.idVozila &&
      a.sirina === b.sirina &&
      a.profil === b.profil &&
      a.konstrukcija.toLocaleUpperCase() === b.konstrukcija.toLocaleUpperCase()  &&
      a.precnik === b.precnik &&
      a.indeksNosivosti === b.indeksNosivosti &&
      a.indeksBrzine.toLocaleUpperCase()  === b.indeksBrzine.toLocaleUpperCase() 
    );
  }

  save(payload: Pneumatik) {
    this.httpService.getAll<Pneumatik>("pneumatici").subscribe(existingList => {
      const existingMatch = existingList.find(p =>
        this.isSamePneumatic(p, payload) &&
        (!this.pneumaticId || p.id !== Number(this.pneumaticId)) 
      );
  
      if (existingMatch) {
        const updated = {
          ...existingMatch,
          kolicina: Number(existingMatch.kolicina) + Number(payload.kolicina)
        };
  
        this.httpService.update<Pneumatik>("pneumatici", existingMatch.id, updated).subscribe(() => {
          if (this.pneumaticId) {
            this.httpService.delete("pneumatici", Number(this.pneumaticId)).subscribe(() => {
              this.router.navigate(["/pneumatici"]);
            });
          } else {
            this.router.navigate(["/pneumatici"]);
          }
        });
  
      } else if (this.pneumaticId) {
        this.httpService.update<Pneumatik>("pneumatici", Number(this.pneumaticId), payload).subscribe(() => {
          this.router.navigate(["/pneumatici"]);
        });
      } else {
        this.httpService.create<Pneumatik>("pneumatici", payload).subscribe(() => {
          this.router.navigate(["/pneumatici"]);
        });
      }
    });
  }
  
}

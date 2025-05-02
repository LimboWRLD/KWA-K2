import {Injectable} from '@angular/core';
import {DropdownQuestion} from '../../models/questions/question-dropdown';
import {QuestionBase} from '../../models/questions/question-base';
import {TextboxQuestion} from '../../models/questions/question-textbox';
import {of} from 'rxjs';
@Injectable()
export class QuestionService {
  getVoziloQuestions(){
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key:"id",
        type:"hidden"
      }),
      new TextboxQuestion({
        key:"registarskiBroj",
        label:"Registarski Broj",
        required:true
      }),
      new TextboxQuestion({
        key:"imeVlasnika",
        label:"Ime vlasnika",
        required:true
      }),
      new TextboxQuestion({
        key:"prezimeVlasnika",
        label:"Prezime vlasnika",
        required:true
      })
    ]
    return of(questions.sort((a, b) => a.order - b.order));
  }

  getLoginQuestions(){
    const questions: QuestionBase<string>[] = [
      new TextboxQuestion({
        key:"username",
        label: "Username",
        required: true
      }),
      new TextboxQuestion({
        key:"password",
        label: "Password",
        required: true
      })
    ]
    return of(questions.sort((a, b) => a.order - b.order));;
  }

  getPneumatikQuestions(){
    const questions : QuestionBase<string>[] = [
      new TextboxQuestion({
        key:"id",
        type:"hidden"
      }),
      new DropdownQuestion({
        key: 'idVozila',
        label: 'Vozilo',
        options: [
        ],
        required:true
      }),
      new TextboxQuestion({
        key:"sirina",
        label:"Sirina",
        type:"number",
        required:true
      }),
      new TextboxQuestion({
        key:"profil",
        label:"Profil",
        type:"number",
        required:true
      }),
      new TextboxQuestion({
        key:"konstrukcija",
        label:"Konstrukcija",
        required:true
      }),
      new TextboxQuestion({
        key:"precnik",
        label:"Precnik",
        type:"number",
        required:true
      }),
      new TextboxQuestion({
        key:"indeksNosivosti",
        label:"Indeks nosivosti",
        type:"number",
        required:true
      }),
      new TextboxQuestion({
        key:"indeksBrzine",
        label:"Indeks brzine",
        required:true
      }),
      new TextboxQuestion({
        key:"kolicina",
        label:"Kolicina",
        type:"number",
        required:true
      })
    ]
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
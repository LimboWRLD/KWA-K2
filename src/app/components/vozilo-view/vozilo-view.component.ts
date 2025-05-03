import { CdkDragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Vozilo } from '../../models/vozilo';
import { Pneumatik } from '../../models/pneumatic';
import { NgFor, NgIf } from '@angular/common';
import { DynamicService } from '../../service/dynamic-service/dynamic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vozilo-view',
  imports: [DragDropModule, NgFor],
  templateUrl: './vozilo-view.component.html',
  styleUrl: './vozilo-view.component.css'
})
export class VoziloViewComponent implements OnInit{
  vozilo: Vozilo | null = null

  constructor(private httpService: DynamicService, private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let voziloId = params.get('id');
      if (voziloId) {
        this.httpService.getById<Vozilo>('vozila', Number(voziloId)).subscribe(data => {
          this.vozilo = data;
        });
        this.httpService.getAll<Pneumatik>("pneumatici").subscribe(data =>{
          this.sviPneumatici = data.filter(p => p.idVozila == Number(voziloId));
        });
      }
    });
  }

  sviPneumatici: Pneumatik[] = [];
 
  leftTopPneumatic: (Pneumatik)[] = [];
  rightTopPneumatic: (Pneumatik)[] = [];
  leftBottomPneumatic: (Pneumatik)[] = [];
  rightBottomPneumatic: (Pneumatik)[] = [];
  
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      return;
    }

    const item = event.previousContainer.data[event.previousIndex];
    
    if (event.container.id === "cdk-drop-list-4") {

      if (event.previousContainer.id === "cdk-drop-list-0") {
        this.leftTopPneumatic = [];
      } else if (event.previousContainer.id === "cdk-drop-list-1") {
        this.rightTopPneumatic = [];
      } else if (event.previousContainer.id === "cdk-drop-list-2") {
        this.leftBottomPneumatic = [];
      } else if (event.previousContainer.id === "cdk-drop-list-3") {
        this.rightBottomPneumatic = [];
      }
      
      event.container.data.push(item);
    } else {
      if (event.container.data.length > 0) {
        const prevItem = event.container.data[0];
        console.log(prevItem);
        
        this.sviPneumatici.push(prevItem);
        event.container.data.shift();
      }
      event.container.data.unshift(item);
    }

    event.previousContainer.data.splice(event.previousIndex, 1);
  }
  
  getPneumatikDetails(p: Pneumatik): string {
    return p.sirina + " " + p.profil + p.konstrukcija + " " + p.precnik + " " + p.indeksNosivosti + p.indeksBrzine;
}

}

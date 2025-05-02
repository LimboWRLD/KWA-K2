import { Component, NgModule } from '@angular/core';
import { Pneumatik } from '../../models/pneumatic';
import { DynamicService } from '../../service/dynamic-service/dynamic.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vozilo } from '../../models/vozilo';
import { NgFor } from '@angular/common';
import { GenericTableComponent } from '../../dynamic-components/generic-table/generic-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pneumatic-table',
  imports: [NgFor, GenericTableComponent, FormsModule, RouterModule],
  templateUrl: './pneumatic-table.component.html',
  styleUrl: './pneumatic-table.component.css'
})
export class PneumaticTableComponent {
  selectedVoziloId: number | null = null;
  dataVozila: Vozilo[] = [];
  dataPneumatic: Pneumatik[] = [];
  filteredListPneumatic : Pneumatik[] = [];

  constructor(private httpService: DynamicService, private router: Router,  private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.httpService.getAll<Pneumatik>("pneumatici").subscribe(data => {
      this.dataPneumatic = data;
      this.filteredListPneumatic = data;
    });
    this.httpService.getAll<Vozilo>("vozila").subscribe(data => this.dataVozila = data);
  }

  remove(id: any): void{
    this.httpService.delete("pneumatici", id).subscribe(() => {
      this.dataPneumatic = this.dataPneumatic.filter(item => item.id !== id);
      this.filteredListPneumatic = this.filteredListPneumatic.filter(item => item.id !== id);
    });
  }

  edit(id: any): void {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }

  onVoziloChange(){
    this.filteredListPneumatic = this.dataPneumatic;
    console.log(this.selectedVoziloId);
    
    this.filteredListPneumatic = this.filteredListPneumatic.filter(p => p.idVozila == this.selectedVoziloId);
  }
  
  reset(){
    this.filteredListPneumatic = this.dataPneumatic;
    this.selectedVoziloId = null;
  }
}

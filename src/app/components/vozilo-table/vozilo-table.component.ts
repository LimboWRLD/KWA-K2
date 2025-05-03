import { Component, OnInit } from '@angular/core';
import { DynamicService } from '../../service/dynamic-service/dynamic.service';
import { Vozilo } from '../../models/vozilo';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GenericTableComponent } from '../../dynamic-components/generic-table/generic-table.component';

@Component({
  selector: 'app-vozilo-table',
  imports: [GenericTableComponent, RouterModule],
  templateUrl: './vozilo-table.component.html',
  styleUrl: './vozilo-table.component.css'
})
export class VoziloTableComponent implements OnInit{
  dataVozilo: Vozilo[] = [];
  filteredListVozilo : Vozilo[] = [];

  constructor(private httpService: DynamicService, private router: Router,  private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.httpService.getAll<Vozilo>("vozila").subscribe(data => this.dataVozilo = data);
  }

  remove(id: any): void{
    this.httpService.delete("vozila", id).subscribe(() => {
      this.dataVozilo = this.dataVozilo.filter(item => item.id !== id);
      this.filteredListVozilo = this.filteredListVozilo.filter(item => item.id !== id);
    });
  }

  edit(id: any): void {
    this.router.navigate(["edit", id], { relativeTo: this.route });
  }
}

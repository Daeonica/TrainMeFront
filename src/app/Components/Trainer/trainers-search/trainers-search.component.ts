import { Component, Input, EventEmitter, Output } from '@angular/core';
import { concat } from 'rxjs';
import { url } from 'src/app/Services/proxy';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-trainers-search',
  templateUrl: './trainers-search.component.html',
  styleUrls: ['./trainers-search.component.css']
})
export class TrainersSearchComponent {

  all_trainers: any;
  @Input() trainersToShow: any;
  url = url;
  search: any;
  loading = true;

  constructor(private trainerService: UserService) {
  }

  ngOnInit(): void {
    this.trainerService.trainers().subscribe((res: any) => {
      this.all_trainers = res;
      this.trainersToShow = res;
      this.loading = false;
    }
    );
  }

  query(){
    this.trainersToShow = this.all_trainers.filter((trainer: any) => trainer.name.toLowerCase().includes(this.search.toLowerCase()));
    console.log(this.trainersToShow);
  }

}

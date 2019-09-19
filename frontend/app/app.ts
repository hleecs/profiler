import {Component, OnInit} from '@angular/core';

import {Tool} from 'org_xprof/frontend/app/common/interfaces/tool';
import {DataService} from 'org_xprof/frontend/app/services/data_service/data_service';

/** The root component. */
@Component({
  selector: 'app',
  templateUrl: './app.ng.html',
  styleUrls: ['./app.css'],
  providers: [DataService]
})
export class App implements OnInit {
  dataNotFound = false;
  datasets: Tool[] = [];

  constructor(private readonly dataService: DataService) {}

  ngOnInit() {
    this.dataService.getTools().subscribe(tools => {
      const keys = Object.keys(tools);
      const values = Object.values(tools);
      for (let i = 0; i < keys.length; i++) {
        this.datasets.push({name: keys[i], activeTools: values[i] || []});
      };
      this.datasets.sort((a, b) => (a.name > b.name) ? 1 : -1);
      this.dataNotFound = this.datasets.length === 0;
    });
  }
}

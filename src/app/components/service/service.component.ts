import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { WWDOService } from '../../services/wwdo.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  service$;
  constructor(private _router: Router, private route: ActivatedRoute,
  private wwdo: WWDOService) { }

  ngOnInit() {
    this.route.paramMap.map((param) => {
      let id = param.get("id");
      return id;
    }).subscribe(id => {
      this.service$ = this.wwdo.getOneService(id);
    });
  }

}

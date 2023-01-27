import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Param } from 'src/app/shared/enums/param.enum';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {

  public readonly projectId$ = new ReplaySubject<string>(1);

  constructor(private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId$.next(this.activatedRoute.snapshot.params[Param.ProjectId])
  }

}

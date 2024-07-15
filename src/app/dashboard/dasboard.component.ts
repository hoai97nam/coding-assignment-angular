import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  handleTransitToTask() {
    this.router.navigate(['/task']);
  }
}

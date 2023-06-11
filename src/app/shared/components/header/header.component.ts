import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared.module";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}

import { Component, HostBinding, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SidenavService } from "app/base/sidenav/sidenav.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  @HostBinding("class.transparent") transparent = false;

  constructor(
    private readonly sidenavService: SidenavService
  ) {}

  get getExpanded(): boolean {
    return this.sidenavService.getExpanded();
  }
  get getPinned(): boolean {
    return this.sidenavService.getPinned();
  }

  ngOnInit() {}
}

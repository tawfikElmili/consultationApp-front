import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "src/app/shared/models/UserModel";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  {
    path: "/user-profile",
    title: "User profile",
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  {
    path: "/user-list",
    title: "List of users",
    icon: "ni-single-copy-04 text-blue",
    class: "",
  },
  {
    path: "/consultation-list",
    title: "List of consultations",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  {
    path: "/consultation-add",
    title: "Add consultation",
    icon: "ni-fat-add text-green",
    class: "",
  },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  public isCollapsed = true;
  user: UserModel;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);

    this.menuItems.forEach((item) => {
      if (item.title === "Add consultation") {
        if (this.user.role === "DOCTOR") {
          item.class = "";
        } else {
          item.class = "hide-navigation-item";
        }
      }

      if (item.title === "List of users") {
        if (this.user.role === "RH") {
          item.class = "";
        } else {
          item.class = "hide-navigation-item";
        }
      }
    });

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
  logout() {
    localStorage.clear();
    this.user = new UserModel();
  }
}

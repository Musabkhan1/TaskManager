import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

interface Task {
  title: string;
  description: string;
  date: string;
  priority: number;
  status: string;
}
@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  tasks: Task[] = [];
  newTask: Task = {
    title: "",
    description: "",
    date: "",
    priority: 1,
    status: "Pending",
  };
  isDateAscending: boolean = false; // Flag for date sort direction
  isPriorityAscending: boolean = false; // Flag for priority sort direction
  sortButton: string = "date"; // Text for sort button
  selectStatus: string = "";
  selectPriority: any = "";
  buttonDisabled: boolean = true;
  errorMessage: string;
  // Inside a method where an error occurs

  ngOnInit() {
    this.buttonDisabled = !(
      this.newTask.title.length > 0 && this.newTask.date.length > 0
    );
    console.log(this.newTask);
    this.getTasks();
  }

  toggleDateSortDirection() {
    this.sortButton = "date";
    this.isDateAscending = !this.isDateAscending;
    this.isPriorityAscending = false; // Toggle the date sort direction flag
    this.sortTasksByPriority();
  }

  togglePrioritySortDirection() {
    this.sortButton = "priority";
    this.isPriorityAscending = !this.isPriorityAscending;
    this.isDateAscending = false; // Toggle the priority sort direction flag
    this.sortTasksByPriority();
  }

  sortTasksByPriority() {
    let body = {};
    if (this.sortButton === "date") {
      this.isDateAscending === true
        ? (body["date"] = "asc")
        : (body["date"] = "desc");
    } else if (this.sortButton === "priority") {
      this.isPriorityAscending === true
        ? (body["priority"] = "asc")
        : (body["priority"] = "desc");
    }

    console.log(body);

    this.apiService.sortTask(body).subscribe(
      (response) => {
        console.log(response);
        this.tasks = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getTasks() {
    let body = {};
    if (this.selectStatus !== "") {
      // body["status"] = this.selectStatus === "2" ? "PENDING" : "DONE";
      body["status"] = this.selectStatus;
    }
    if (this.selectPriority !== "") {
      body["priority"] =
        this.selectPriority === "LOW"
          ? "1"
          : this.selectPriority === "MEDIUM"
          ? "2"
          : "3";
    }

    this.apiService.getAllTask(body).subscribe(
      (response) => {
        console.log(response);
        this.tasks = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addTask() {
    this.newTask.title = this.newTask.title;
    this.newTask.date = this.newTask.date;
    this.newTask.priority = this.newTask.priority;
    // this.saveTasks();
    const body = {
      title: this.newTask.title,
      date: this.newTask.date,
      description: this.newTask.description,
      priority: this.newTask.priority,
    };
    if (this.newTask.title.length === 0 || this.newTask.date.length === 0) {
      this.errorMessage = "Please enter Title and Date.";
      return;
    } else {
      const response = this.apiService.addTask(body).subscribe(
        (response) => {
          console.log(response);
          this.newTask.title = "";
          this.newTask.date = "";
          this.newTask.priority = 1;
          this.newTask.description = "";
          this.errorMessage = "";
          this.getTasks();
        },
        (error) => {
          console.error(error);
        }
      );
      console.log(response);
    }
  }

  updateTask(id) {
    const body = {
      id: id,
      status: "DONE",
    };
    const response = this.apiService.updateTask(body).subscribe((response) => {
      console.log(response);
      this.getTasks();
    });
    console.log(response);
  }

  deleteTask(id) {
    const body = {
      id: id,
    };
    const response = this.apiService.deleteTask(body).subscribe((response) => {
      console.log(response);
      this.getTasks();
    });
  }

  reset() {
    this.newTask.title = "";
    this.newTask.date = "";
    this.newTask.priority = 1;
    this.newTask.description = "";
    this.errorMessage = "";
  }
}

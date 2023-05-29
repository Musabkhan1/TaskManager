import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  BASE_URL = "http://localhost:3001/v1/task/"; // Corrected BASE_URL with protocol and fixing typo
  constructor(private http: HttpClient) {}

  // Define methods to make API calls
  getSomeData(): Observable<any> {
    return this.http.get("https://api.example.com/some-data");
  }

  postSomeData(data: any): Observable<any> {
    return this.http.post("https://api.example.com/some-data", data);
  }

  addTask(data: any): Observable<any> {
    const url = this.BASE_URL + "add-task";
    return this.http.post(url, data);
  }

  deleteTask(data: any): Observable<any> {
    const url = this.BASE_URL + "delete-task";
    return this.http.post(url, data);
  }

  updateTask(data: any): Observable<any> {
    const url = this.BASE_URL + "update-task";
    return this.http.post(url, data);
  }

  sortTask(data: any): Observable<any> {
    const url = this.BASE_URL + "sort-tasks";
    return this.http.post(url, data);
  }

  getAllTask(data: any): Observable<any> {
    const url = this.BASE_URL + "get-all-tasks";
    return this.http.post(url, data);
  }

  // Add more methods for other API calls
}

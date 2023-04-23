import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public _credentials: any
  baseUrl:string = environment.serverUrl
  public isUserLogin: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  constructor(
    private http: HttpClient,
  ) { }


  signUp(data: any){
    return this.http.post(`${this.baseUrl}/user/signup`, data).pipe(
      map((data: any)=>{
        delete data.status
        this.setCredentials(data)
        return data
      })
    )
  }

  public setCredentials(credentials?: any){
    this._credentials = credentials || null

    if(credentials && credentials.user){
      localStorage.setItem('credentials', JSON.stringify(credentials))
      this.isUserLogin.next(true)
    }else{
      localStorage.clear()
    }

  }

  logIn(data: any){
    return this.http.post(`${this.baseUrl}/user/login`, data).pipe(
      map((data: any)=>{
        delete data.status
        this.setCredentials(data)
        return data
    }))
  }
  me(){
    return this.http.get(`${this.baseUrl}/user/me`)
  }

  addNotes(data: any){
      return this.http.post(`${this.baseUrl}/note/create`, data)
  }

  getAllNotes(){
      return this.http.get<any>(`${this.baseUrl}/note/getAllNotes`)
  }
  updateNote(noteID, payload){
      return this.http.put<any>(`${this.baseUrl}/note/updateNote/${noteID}`, payload)
  }
  deleteNote(noteID){
      return this.http.delete<any>(`${this.baseUrl}/note/delete/${noteID}`)
  }

  isLoggedIn(){
    return !!JSON.parse(localStorage.getItem('credentials'))
  }
}

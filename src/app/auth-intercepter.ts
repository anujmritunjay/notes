import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommonService } from "./common.service";

@Injectable()

export class AuthIntecepter implements HttpInterceptor {
  constructor(
    private commonService: CommonService
  ){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.commonService.isLoggedIn()){
      const token = JSON.parse(localStorage.getItem('credentials'))
       req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.token}`
        }
      })

    }
    return next.handle(req)
  }

}

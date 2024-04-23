import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Slider} from "../models/slider";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SlidersService{
  private baseUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient) {}

  getSlider(sliderId: number) : Observable<Slider>{ //Not in, added for completion
    let uri = '/getSlider'
    return this.http.get<Slider>(this.baseUrl+uri+`/${sliderId}`)
  }

  list() : Observable<Slider[]>{
    let uri = '/sliders';
    return this.http.get<Slider[]> (this.baseUrl+uri);
  }

  addSlider(slider: Slider): Observable<Slider>{
    let uri = '/addSlider'
    let newSlider= {url: slider.url, duration: slider.duration}
    return this.http.post<Slider>(this.baseUrl + uri , newSlider);
  }

  updateSlider(slider:Slider): Observable<Slider>{ // //Not in, added for completion
    let uri = "/updateSlider"
    return this.http.patch<Slider>(this.baseUrl+uri, slider)
  }

  deleteSlider (sliderId : number) : Observable<Slider>{
    let uri = '/removeSlider'
    return this.http.delete<Slider>(this.baseUrl + uri +`/${sliderId}`);
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Slider} from "../../models/slider";
import {SlidersService} from "../../services/slider.service";
import {lastValueFrom} from "rxjs";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {crossfade} from "./animations";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sliders',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf,
    FormsModule
  ],
  templateUrl: './sliders.component.html',
  styleUrl: './sliders.component.css',
  animations: [crossfade]
})
export class SlidersComponent implements OnInit, OnDestroy{

  slider: Array<Slider> = new Array<Slider>()
  haveSlides = false;
  viewMode: 'list' | 'slideshow' = 'list';
  changeViewModeText = 'Lets Go To The Slideshow!'

  currentSlide! : Slider;
  currentIndex: number = 0;
  sliderSwitchInterval: any;

  newUrl : string | null = null;
  newDuration : number | null = null;

  slideToDelete : Slider | null = null ;

  constructor(private slidersService: SlidersService) {}



  async ngOnInit() {
    try{
      this.haveSlides = false;

      if (!await this.loadDataIfAvailable()){
        this.sliderSwitchInterval = setInterval(async () =>{
          await this.loadDataIfAvailable();
        }, 5000)
      }
    }catch (err){
      console.error(err);
    }

  }

  async loadDataIfAvailable(){
    this.slider = await lastValueFrom(this.slidersService.list())

    if(this.slider && this.slider.length > 0) {
      this.haveSlides = true;
    }
    return this.haveSlides
  }

  startInterval() {
    this.sliderSwitchInterval = setInterval(() => {
        this.changeSlider();
    }, this.currentSlide.duration * 1000)
  }

  ngOnDestroy() {
    clearInterval(this.sliderSwitchInterval)
  }

  changeSlider(){
    this.currentIndex = (this.currentIndex + 1) % this.slider.length;
      setTimeout(() => {
        this.currentSlide = this.slider[this.currentIndex];
        clearInterval(this.sliderSwitchInterval);
        this.startInterval()
      }, 500);
  }

  changeViewMode(){
    if(this.viewMode == 'list'){
      //go to slideshow
      if(this.haveSlides){
        this.currentIndex = 0;
        this.currentSlide = this.slider[0]
        this.startInterval()

        this.viewMode = 'slideshow'
        this.changeViewModeText = "List view"
      }
    } else{
      //go to list
      clearInterval(this.sliderSwitchInterval);

      this.viewMode = 'list'
      this.changeViewModeText = 'Lets Go To The Slideshow!'
    }


  }



  openAddPopup(){
    let modalDiv = document.getElementById("addPopup");
    if(modalDiv != null){
      modalDiv.style.display = 'block'
    }
  }

  closeAddPopup(){
    this.newUrl = null;
    this.newDuration = null;

    let modalDiv = document.getElementById("addPopup");
    if(modalDiv != null){
      modalDiv.style.display = 'none'
    }
  }


  async saveNewSlide(){
    if(this.newUrl != null && this.newDuration != null){
      let newSlide : Slider = {id: -1, url: this.newUrl, duration: this.newDuration};
      await lastValueFrom(this.slidersService.addSlider(newSlide))

      this.closeAddPopup();
      await this.loadDataIfAvailable()
    }
  }


  openDeletePopup(){
    this.slideToDelete = this.currentSlide;
    let modalDiv = document.getElementById("deletePopup");
    if(modalDiv != null){
      modalDiv.style.display = 'block'
    }
  }

  closeDeletePopup(){
    this.slideToDelete = null;
    let modalDiv = document.getElementById("deletePopup");
    if(modalDiv != null){
      modalDiv.style.display = 'none'
    }
  }


  async deleteSlide(id: number){
    await lastValueFrom(this.slidersService.deleteSlider(id))
    await this.loadDataIfAvailable();
  }

  async deleteCurrentSlide(){
    if(this.slideToDelete){
      let sliderId = this.slideToDelete.id
      if(this.currentSlide == this.slideToDelete){
        this.currentIndex ++;
        this.changeSlider();
      }

      setTimeout(async () =>{
        await lastValueFrom(this.slidersService.deleteSlider(sliderId))

        this.closeDeletePopup();
        await this.loadDataIfAvailable();
      }, 500)
    }
  }


}




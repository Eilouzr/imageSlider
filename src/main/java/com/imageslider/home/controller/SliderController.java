package com.imageslider.home.controller;

import com.imageslider.home.model.Slider;
import com.imageslider.home.repository.SliderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class SliderController {
    private final SliderRepository repository;

    public SliderController(SliderRepository repository){
        this.repository = repository;
    }
    @GetMapping("/getSlider/{id}")
    public Slider show(@PathVariable Integer id){
        Optional<Slider> slider = repository.findById(id);
        return slider.orElse(null);
    }

    @GetMapping("/sliders")
    public Iterable<Slider> list(){
        return repository.findAll();
    }

    @PostMapping("/addSlider")
    public Slider create(@RequestBody Slider slider){
        return repository.save(slider);
    }

    @PatchMapping("/updateSlider") //Won't be use in this project.
    public Slider update(@RequestBody Slider slider){
        return repository.save(slider);
    }

    @DeleteMapping("/removeSlider/{id}")
    public void remove(@PathVariable Integer id){

        repository.deleteById(id);
    }




}

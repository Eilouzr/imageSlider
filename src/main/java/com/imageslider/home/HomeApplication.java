package com.imageslider.home;

import com.imageslider.home.model.Slider;
import com.imageslider.home.repository.SliderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HomeApplication {

	public static void main(String[] args) {

		SpringApplication.run(HomeApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner (SliderRepository repository){
		return args -> {
			repository.save(new Slider(null , "https://www.novisign.com/wp-content/uploads/2017/03/NoviSign_logo_new_750x750px.png" , 5));
			repository.save(new Slider(null , "https://i.etsystatic.com/39582183/r/il/45396c/4881629201/il_1588xN.4881629201_oksp.jpg" , 3));
			repository.save(new Slider(null , "https://steamuserimages-a.akamaihd.net/ugc/307738670230847301/02FCBC35FC39EC8A78464A4CB62F049987C44892/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" , 5));

		};
	}

}

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CharacterService, Character } from './services/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  character : Character;

  cargando = false;
  constructor(
    private _characterService: CharacterService
  ){}

  ngOnInit() {
    this.getCharacterRandom();

    setInterval(()=> {
      this.cargando = true;
      

      setTimeout(()=>{
        this.cargando = false;
        this.getCharacterRandom();  
      }, 3000)

    }, 15000)

  }

  generateNumberRandom( ){

    return this._characterService.getCharacters()
              .pipe( 
                map( (data:any) => {
                  let characterCount = data.info.count+1;

                  return Math.floor((Math.random() * (characterCount -1))+1);
                } )
              )
  }

  getCharacterRandom(){
    this.generateNumberRandom()
      .subscribe((data) => {
        this._characterService.getCharacter(data)
            .subscribe((data) => {
              this.character = {
                ...data
              }

              this.getEpisode(this.character.aparition);
            })
      })
  }


  getEpisode(urlEpisode: string){
    return this._characterService.getEpisode(urlEpisode)
      .subscribe((data) => {
        this.character.aparition = data;

        return this.character;
      })
  }

  refresh(){
    this.cargando = true;
    setTimeout(()=>{
      this.cargando = false;
      this.getCharacterRandom(); 
    }, 2000)
  }

}

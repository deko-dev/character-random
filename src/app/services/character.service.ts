import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface Character {
  img: string,
  name: string,
  status: string,
  species: string,
  location: string,
  aparition?: any,
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private API_URL = "https://rickandmortyapi.com/api/";

  characterRandom: Character;

  constructor(
    private http: HttpClient,
  ) {
  }

  // Getting all character
  getCharacters(){
    return this.http.get(this.API_URL+'character');
  }

  // Getting a character
  getCharacter( idCharacter: number ){

    const api = this.API_URL+'character/'+idCharacter;

    return this.http.get(api)
                  .pipe(
                    map((data: any) => {

                      this.characterRandom = {
                        img: data.image,
                        name: data.name,
                        status: data.status,
                        species: data.species,
                        location: data.location.name,
                        aparition: data.episode[0]
                      }                      

                      return this.characterRandom;

                    })
                  )

  }


  getEpisode(urlEpisode: string){
    return this.http.get(urlEpisode)
              .pipe(
                map((data:any) => {
                  return data.name;
                })
              )
  }

}

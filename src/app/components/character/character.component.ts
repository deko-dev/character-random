import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../services/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() 
  character: Character

  @Input() cargando: boolean;

  constructor() {
    console.log(this.cargando);
  }

  ngOnInit(): void {
  }

}

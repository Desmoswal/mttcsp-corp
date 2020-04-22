import { Injectable } from '@angular/core';
import {ipcRenderer} from 'electron';
import {Language} from './language.model'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }
  languageList: Language[] = [];

  getAllLanguages() {
    ipcRenderer.send('async-langauge-get-all');
    ipcRenderer.on('async-langauge-get-all-reply', (event, arg) => {
      this.languageList = [];
      arg.forEach(element => {
        this.languageList.push(element);
      });
    })
    return this.languageList;
  }
}

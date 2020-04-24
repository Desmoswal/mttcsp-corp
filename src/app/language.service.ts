import { Injectable } from '@angular/core';
import {ipcRenderer} from 'electron';
import {Language} from './language.model'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }
  languageList: Language[] = [];

  createLanguage(newLanguage: Language){
    ipcRenderer.send('async-language-create', newLanguage)
    ipcRenderer.on('async-language-create-reply', (event, arg) => {
      console.log(arg)
    })
  }

  updateLanguage(modifiedLanguage: Language){
    console.log('service' + JSON.stringify(modifiedLanguage))
    ipcRenderer.send('async-language-update', modifiedLanguage)
    ipcRenderer.on('async-language-update-reply', (event, arg) => {
      console.log(arg)
    })
  }

  removeLanguage(languageName: string) {
    ipcRenderer.send('async-language-remove', languageName)
    ipcRenderer.on('async-language-remove-reply', (event, arg) => {
      console.log(arg)
    })
  }

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

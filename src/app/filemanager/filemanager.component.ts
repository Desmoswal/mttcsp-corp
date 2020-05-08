import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public hostUrl = 'https://console.cloud.google.com/';
  public ajaxSettings: object = {
    url: 'https://console.cloud.google.com/storage/browser/mttcsp/'
  };

}

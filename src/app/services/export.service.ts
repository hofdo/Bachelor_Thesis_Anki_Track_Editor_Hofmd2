import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FileSaverService} from 'ngx-filesaver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
    private httpClient: HttpClient,
    private fileSaverService: FileSaverService
  ) { }

  exportEach(type){
    return this.httpClient.get("http://localhost:8081/export", {
      'responseType': 'blob',
      'params': new HttpParams().set("type", type)
    })
  }

  exportSingle(list, rows, cols, type){
      return  this.httpClient.post("http://localhost:8081/export", list,{
      'responseType': 'blob',
      'params': new HttpParams()
        .set("exportAs", "single")
        .set("maxRows", rows)
        .set("maxCols", cols)
        .set("fileFormat", type),
      'headers': new HttpHeaders().set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
        .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    })
  }

  exportAsJSON(text){
    console.log(JSON.stringify(text))
    this.fileSaverService.saveText(JSON.stringify(text), "track.conf")
  }

}

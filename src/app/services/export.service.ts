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

  exportEach(type, lanes, track_id){
    return this.httpClient.get("http://localhost:8081/image", {
      'responseType': 'blob',
      'params': new HttpParams().set("type", type)
        .set("lanes", lanes)
        .set("track_id", track_id)
    })
  }

  exportSingle(list, rows, cols, type){
      return  this.httpClient.post("http://localhost:8081/export", list,{
      'responseType': 'blob',
      'params': new HttpParams()
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

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FileSaverService} from 'ngx-filesaver';

/**
 * This service handles all the export requests and communication with the REST-API
 */
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  /**
   * @param httpClient: HTTPClient for sending and receiving HTTP Request
   * @param fileSaverService: Service for saving files on the clientside
   */
  constructor(
    private httpClient: HttpClient,
    private fileSaverService: FileSaverService
  ) { }

  /**
   * This function exports each track piece as a single image
   * @param type: which type the track piece should be
   * @param lanes: How many lanes the track piece should have
   * @param track_id: What Track ID the track piece should have
   */
  exportEach(type, lanes, track_id){
    return this.httpClient.get("http://localhost:8081/image", {
      'responseType': 'blob',
      'params': new HttpParams().set("type", type)
        .set("lanes", lanes)
        .set("track_id", track_id)
    })
  }

  /**
   *  This function export the whole track as one picture
   * @param list: List of all the grid-elements
   * @param rows: How many rows the grid-system has
   * @param cols: How many columns the grid-system has
   * @param type: Which format the picture should have
   */
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

  /**
   * This function exports the track as a configuration file
   * @param text: The text that should be exported as a configuration file
   */
  exportAsJSON(text){
    console.log(JSON.stringify(text))
    this.fileSaverService.saveText(JSON.stringify(text), "track.conf")
  }

}

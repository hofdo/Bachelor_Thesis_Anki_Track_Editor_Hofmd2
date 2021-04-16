import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileSaverService} from 'ngx-filesaver';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(
    private httpClient: HttpClient,
    private fileSaverService: FileSaverService
  ) { }


}

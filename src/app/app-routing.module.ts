import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/TrackEditor',
    pathMatch: 'full'
  },
  {
    path: 'TrackEditor',
    loadChildren: () => import('./track-editor/track-editor.module').then(m => m.TrackEditorModule)
  },
  {
    path: 'DigitalTwin',
    loadChildren: () => import('./digital-twin/digital-twin.module').then(m => m.DigitalTwinModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanderComponent } from './components/lander/lander.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lander' },
  { path: 'lander', component: LanderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

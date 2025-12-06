import { Routes } from '@angular/router';

import { HomeComponent } from './home/home';
import { HabitsComponent } from './habits/habits';
import { CreateHabitComponent } from './create-habit/create-habit';
import { EditHabitComponent } from './edit-habit/edit-habit';
import { ProfileComponent } from './profile/profile';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'habits', component: HabitsComponent },
  { path: 'create', component: CreateHabitComponent },
  { path: 'edit/:id', component: EditHabitComponent },
  { path: 'profile', component: ProfileComponent }
];

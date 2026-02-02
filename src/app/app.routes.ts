/*hier werden die Routen der App definiert*/

import { Routes } from '@angular/router';
import { StartPage } from './start-page/start-page';
import { FleetPage } from './fleet-page/fleet-page';
import { ScoreBoard } from './GameModule/score-board/score-board';
import {GameBoard} from "./GameModule/game-board/game-board";
import {RuleDescription} from "./GameModule/rule-description/rule-description";
import {LoginComponent} from "./UserModule/login-component/login-component";
import {ProfileComponent} from "./UserModule/profile-component/profile-component";


export const routes: Routes = [
    {path: '', component: StartPage},
    {path: 'game', component: GameBoard},
    {path: 'rules', component: RuleDescription},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'fleet', component: FleetPage},
    {path: 'scoreboard', component: ScoreBoard},
    

];

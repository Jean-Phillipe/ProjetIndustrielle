import { Routes } from '@angular/router'

import { SolversOverviewComponent } from './components/solversOverview.component'
import { SolverFormComponent } from './components/solverForm.component'

/**
 * Routes of the solvers module.
 */
export const solversRoutes: Routes = [
	{
		path: 'solver',
		component: SolversOverviewComponent
	},
	{
		path: 'solver/add',
		component: SolverFormComponent
	},
	{
		path: 'solver/edit',
		component: SolverFormComponent
	},
	{
		path: 'solver/:solverID',
		component: SolversOverviewComponent
	}
]

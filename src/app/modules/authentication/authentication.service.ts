import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { retry, map } from 'rxjs/operators'

import { appConfig } from '../../config'

//TODO: sync with backend && JWTInterceptor && user access level guard

@Injectable()
export class AuthenticationService {

	private loggedIn: boolean = false

	private user: BehaviorSubject<any> = new BehaviorSubject<any>(null)

	constructor(private http: HttpClient) {}

	login(username: string, password: string) {
		return this.http.post(appConfig.apiUrl + '/token-auth', { username: username, password: password })
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map((data: any) => {
					if (data.token) {
						localStorage.setItem('user', JSON.stringify(this.createLoggedInUser(data.token, username)))
						this.loggedIn = true
						return data
					}
					else
						throw new Error('Pas de jeton, pas de chocolat.')
				})
			)
	}

	logout() {
		localStorage.removeItem('user')
		this.loggedIn = false
	}

	isLoggedIn(): boolean {
		return this.loggedIn
	}

	private createLoggedInUser(token?: string, username?: string, accessLevel?: string) {
		return {
			token: token,
			username: username,
			accessLevel: accessLevel
		}
	}
}
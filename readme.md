1. Create new app - add very simple SSR
	1.1 ng new my-app
	1.2 ng add @ng-toolkit/universal
	1.3 yarn add webpack@4.19.1
	1.4 yarn build:prod

2. SSR with request
	1.1 Import BrowserTransferStateModule
	1.2 Request with TransferState and makeStateKey
	1.3 Get and set state

3. SSR with authentication JWT
	1.1 Create simple server
	1.2 Add cookie service
	1.3 Send and set token

URL = https://jsonplaceholder.typicode.com/todos/1

********CURRENT ISSUES***********
- GET /users/:userId does not return 404 when nonexistent user is asked for. The 	request will return undefined when request for nonexistent user goes through.


Planned Routes:

Create/View/Delete a user:
	POST /users
	GET /users/:userId
	DELETE /users/:userId

Create/View/Delete a routine:
	POST /users/:userId/workouts
	POST /users/:userId/workouts/:workoutId/exercises
	GET /users/:userId/workouts
	GET /users/:userId/workouts/:workoutId
	GET /users/:userId/workouts/:workoutId/exercises
	GET /users/:userId/workouts/:workoutId/exercises/:exerciseId
	DELETE /users/:userId/workouts/:workoutId
	DELETE /users/:userId/workouts
	DELETE /users/:userId/workouts/:workoutId/exercises
	DELETE /users/:userId/workouts/:workoutId/exercises/:exerciseId

Create/View/Delete/Update a statistic(stat):
	POST /users/:userId/stats
	GET /users/:userId/stats


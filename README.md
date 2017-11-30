********CURRENT ISSUES***********
- GET /users/:userId does not return 404 when nonexistent user is asked for. The 	request will return undefined when request for nonexistent user goes through.


Planned Routes:

Create/View/Delete a user:
	POST /users
	GET /users/:userId
	DELETE /users/:userId

Create/View/Delete a routine:
	POST /users/:userId/routines
	POST /users/:userId/routines/:routineId/workouts
	GET /users/:userId/routines
	GET /users/:userId/routines/:routineId
	GET /users/:userId/routines/:routineId/workouts
	GET /users/:userId/routines/:routineId/workouts/:workoutId
	DELETE /users/:userId/routines/:routineId
	DELETE /users/:userId/routines
	DELETE /users/:userId/routines/:routineId/workouts
	DELETE /users/:userId/routines/:routineId/workouts/:workoutId

Create/View/Delete/Update a statistic(stat):
	POST /users/:userId/stats
	GET /users/:userId/stats
	GET /users/:userId/stats/:statId
	DELETE /users/:userId/stats
	DELETE /users/:userId/stats/:statId


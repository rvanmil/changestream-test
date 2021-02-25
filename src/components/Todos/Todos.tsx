import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, Divider, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core'
import * as todos1Actions from '../../redux/todo1/actions'
import * as todos2Actions from '../../redux/todo2/actions'
import { RootState } from '../../redux/rootState'

const TodoSelection: React.FC = () => {
	const dispatch = useDispatch()

	const todos1Map = useSelector((state: RootState) => state.todos1State.todosMap)
	const isLoading1 = useSelector((state: RootState) => state.todos1State.meta.isLoading)
	const todos1 = useMemo(() => [...todos1Map.values()], [todos1Map])

	const todos2Map = useSelector((state: RootState) => state.todos2State.todosMap)
	const isLoading2 = useSelector((state: RootState) => state.todos2State.meta.isLoading)
	const todos2 = useMemo(() => [...todos2Map.values()], [todos2Map])

	const handleCreateTodo1 = () => {
		dispatch(todos1Actions.createTodo1({
			todo: {
				description: 'New todo',
				completed: false
			}
		}))
	}

	const handleCreateTodo2 = () => {
		dispatch(todos2Actions.createTodo2({
			todo: {
				description: 'New todo',
				completed: false
			}
		}))
	}

	const todo1Items = todos1.map((todo1, index) => (
		<ListItem key={todo1._id.toHexString()} divider={index < todos1.length - 1}>
			<ListItemText primary={todo1.description} />
			<ListItemSecondaryAction>
				<Checkbox edge="end" checked={todo1.completed} readOnly />
			</ListItemSecondaryAction>
		</ListItem>
	))

	const todo2Items = todos2.map((todo2, index) => (
		<ListItem key={todo2._id.toHexString()} divider={index < todos2.length - 1}>
			<ListItemText primary={todo2.description} />
			<ListItemSecondaryAction>
				<Checkbox edge="end" checked={todo2.completed} readOnly />
			</ListItemSecondaryAction>
		</ListItem>
	))

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<div style={{ display: 'flex', padding: 8, alignItems: 'center', flexDirection: 'column' }}>
					<Typography variant="h6">Open devtools to view change stream</Typography>
				</div>
			</Grid>
			<Grid item xs={6}>
				<Paper>
					<div style={{ display: 'flex', padding: 8, alignItems: 'center', flexDirection: 'column' }}>
						<Typography gutterBottom variant="h6">Todos without function rule</Typography>
						<Button variant="outlined" color="primary" onClick={handleCreateTodo1}>Add todo</Button>
					</div>
					<Divider />
					<List disablePadding>{(isLoading1) ? <p>Loading...</p> : todo1Items}</List>
				</Paper>
			</Grid>
			<Grid item xs={6}>
				<Paper>
					<div style={{ display: 'flex', padding: 8, alignItems: 'center', flexDirection: 'column' }}>
						<Typography gutterBottom variant="h6">Todos with function rule</Typography>
						<Button variant="outlined" color="primary" onClick={handleCreateTodo2}>Add todo</Button>
					</div>
					<Divider />
					<List disablePadding>{(isLoading2) ? <p>Loading...</p> : todo2Items}</List>
				</Paper>
			</Grid>
		</Grid>
	)
}

export default TodoSelection

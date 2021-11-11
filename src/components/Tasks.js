import Task from './Task';

const Tasks = ({tasks, toggleReminder, deleteTask}) => {

    return (
        <>
            {tasks.map((task) => (<Task task={task} key={task.id} deleteTask={deleteTask} toggleReminder={toggleReminder}/>) )}               
        </>
    )
}

export default Tasks;
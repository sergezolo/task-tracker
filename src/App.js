import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

const App = () => {

  const [showTaskForm, setShowTaskForm] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //Add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(task)})
    const data = await res.json()
    setTasks([...tasks, data])
    setShowTaskForm(!showTaskForm)
  }

  //Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updatedTask)}) 
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowTaskForm(!showTaskForm)} showTaskForm={showTaskForm}/>
            <Route path='/' exact render={(props) => (
                <>
                  {showTaskForm && <AddTask addTask={addTask}/>}
                  {tasks.length > 0 ? <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder}/> : ('No Tasks')}
                </>
              )}/>
              <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

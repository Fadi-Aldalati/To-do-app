import React, { Component} from 'react';
import { saveTask ,getTasks,deleteTask} from '../services/taskService';


class Main extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            title:"",
            tasks:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    async componentDidMount(){
        const data = await (await getTasks()).data;
        const tasks=[...data];
        this.setState({tasks:tasks});
    };
    async handleDelete(task){
        const tasks = this.state.tasks.filter(m => m._id !== task._id);
        this.setState({ tasks });
        try{
            await deleteTask(task._id);
             }
             catch(err){
                console.log('deleting task error',err);
             }  
            
    }
    handleChange(e){
        this.setState({
            title: e.target.value
        });
        
    }
    async handleSubmit(event) {
        event.preventDefault();
        
        try{
            if(this.state.title!==''){
        const demo = {
            title:this.state.title,
        }
        const task = await (await saveTask(demo)).data;
        const tasks=[...this.state.tasks,task];
        this.setState({tasks});
    }
        
         }
         catch(err){
            console.log('submiting task error',err);
         }    
         event.target.reset();
         this.setState({title:''});
    }
    
    render() { 
        const{tasks}=this.state;
        return (
            <React.Fragment>
                <div className='container' style={{"marginTop":"20px"}}>
                    <h2>Add Item</h2>
                    <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <div  className="form-outline">
                        <input type="text" onChange={this.handleChange} placeholder="Type here..." className="form-control"/>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </div>
                    </form>
                    <br/>
                    <ul className="list-group">
                    {tasks.map(task =>
                        <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
                            {task.title}
                            <div style={{"textAlign":"right"}}>
                            <button type="text" onClick={e =>this.handleDelete(task)} className="btn btn-danger">Delete</button>
                            </div>
                        </li>
                        )}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Main;
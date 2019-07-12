

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function RenderRow(props){
  if(document.forms.auth_name){
    var auth_name = document.forms.auth_name.user.value;
    console.log(auth_name);
  }else{
    var auth_name = 'guest';
    console.log(auth_name);
  }
  return props.todos.map(todo => {
    return (
      <tr key={todo.id}>
        <td>{todo.name}</td>
        <td>{todo.title}</td>
        <td>{todo.created_at}</td>
        {(() => {
        if(auth_name == todo.name){
          return <td><button className="btn btn-secondary" onClick={() => props.deleteTask(todo)}>完了</button></td>
        }
        })()}
      </tr>
    )
  })
}


export default class TodoApp extends Component {
    constructor(){
      super();
      if(document.forms.auth_name){
        var auth_name = document.forms.auth_name.user.value;
        console.log(auth_name);
      }else{
        var auth_name = 'guest';
        console.log(auth_name);
      }
      this.state = {
        name:auth_name,
        todos:[],
        todo:''
      };
      this.inputChange = this.inputChange.bind(this);
      this.addTodo = this.addTodo.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
    }
    componentDidMount(){

      axios
      .get('api/get')
      .then((res)=> {
        this.setState({
          todos:res.data
        });
      })
      .catch(error =>{
        console.log(error);
      });

      Echo.channel('chat')
      .listen('MessageCreated', (e) => {

        this.appget();

      });
    }


    inputChange(event){
      switch(event.target.name){
        case 'todo':
          this.setState({
            todo:event.target.value
          });
          break;
        default:
          break;
      }
    }
    appget(){
      axios
      .get('api/get')
      .then((res)=> {
        this.setState({
          todos:res.data
        });
      })
      .catch(error =>{
        console.log(error);
      });
    };
    addTodo(){

      if(this.state.todo == ''){
        return;
      }

      axios
      .post('/api/add',{
        name:this.state.name,
        title:this.state.todo,
      })
      .then((res)=>{
        this.setState({
          todos:res.data,
          todo:'',
          title:'',
          created_at:''
        });
      })
      .catch(error => {
        console.log(error);
      })
    }

    deleteTask(todo){
      axios
      .post('/api/del',{
        id:todo.id,
        name:todo.name,
        title:'削除されました。'
      })
      .then((res)=>{
        this.setState({
          todos:res.data
        });
      })
      .catch(error => {
        console.log(error);
      })
    }


    render() {
        return (
          <React.Fragment>
            <div className="from-group mt-4">
              <label htmlFor="todo">新規Todo</label>
              <input type="text" className="form-control" name="todo" value={this.state.todo} onChange={this.inputChange} />
            </div>
            <button className="btn btn-primary" onClick={this.addTodo}>登録</button>
            <table className="table mt-5">
              <thead>
                <tr>
                  <td>名前</td>
                  <td>Todo</td>
                  <td>時間</td>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                <RenderRow todos={this.state.todos} deleteTask={this.deleteTask} />
              </tbody>  
            </table>          
          </React.Fragment>
        );
    }
}

if (document.getElementById('todoApp')) {
    ReactDOM.render(<TodoApp />, document.getElementById('todoApp'));
}

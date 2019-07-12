<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
use App\Events\MessageCreated;

class TodoController extends Controller
{
    public function getTodos()
    {
      $todos = Todo::latest()->get();
      return $todos;
    }
    public function addTodo(Request $request)
    {
      $todo = \App\Todo::create([
        'name' => $request->name,
        'title' => $request->title
      ]);
      event(new MessageCreated($todo));
      
      $todos = Todo::all();
      return $todos;

    }
    public function DeleteTodo(Request $request)
    {
      $todo = Todo::find($request->id);
      $todo->title = $request->title;
      $todo->update();
      event(new MessageCreated($todo));
      
      $todos = Todo::all();
      return $todos;
    }
}

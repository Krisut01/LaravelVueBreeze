<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        return Todo::create($request->all());
    }

    public function show($id)
    {
        return Todo::find($id);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);
        $todo->update($request->all());

        return $todo;
    }

    public function destroy($id)
    {
        return Todo::destroy($id);
    }
}

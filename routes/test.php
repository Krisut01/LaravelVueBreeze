<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public route - redirect root (/) to the login page
Route::get('/', function () {
    return redirect()->route('login');  // Redirect to the login page, adjust if needed
});

// Authenticated and verified users can access these routes
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard route
    Route::get('/dashboard', function () {
        return view('dashboard');
    });

    // Todo route - renders the Todo Vue component using Inertia
    Route::get('/todo', function () {
        return Inertia::render('Todo'); // Make sure 'Todo' matches the name of your Vue component in the Pages folder
    });
});

// Include the auth routes
require __DIR__.'/auth.php';

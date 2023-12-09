<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function home() {
        return view('home');
    }
    
    public function login()
    {
        return view('login');
    }

    public function admin()
    {
        return view('admin');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function auth(Request $request)
    {
        $found = User::where('username', $request->username)->first();

        if($request->has('password'))
        {
            $found = User::where('username', $request->username)
            ->where('password', $request->password)
            ->first();
        }
        Auth::login($found);
        if ($found['type'] == 1) {
            return response()->json('/admin');
        }
        return response()->json('/home');
    }

    public function logout()
    {
        Auth::logout();
    }

    public function user() {
        return response()->json(Auth::user());
    }
}

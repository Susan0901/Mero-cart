<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function googleLogin(Request $request)
    {
        $googleToken = $request->token;

        $response = Http::get(config('services.google.tokeninfo_url'), [
            'id_token' => $googleToken
        ]);

        if ($response->failed()) {
            return response([
                'message' => 'Invalid google token'
            ], 401);
        }

        $googleUser = $response->json();

        $user = User::where('email', $googleUser['email'])->first();
        if ($user) {
            $user->update([
                'name' => $googleUser['name'],
                'google_id' => $googleUser['sub'],
                'avatar' => $googleUser['picture'],
            ]);
        } else {
            $user = User::create([
                'name' => $googleUser['name'],
                'email' => $googleUser['email'],
                'google_id' => $googleUser['sub'],
                'avatar' => $googleUser['picture'],
                'role_id' => Role::where('id', '=', 2)->first()->id
            ]);
        }

        $token = $user->createToken(config('app.name') . '-token')->plainTextToken;

        $user['role'] = $user->role;
        $user['isAdmin'] = $user->isAdmin();

        return response([
            'auth_user' => $user,
            'token' => $token,
            'message' => 'Logged in'
        ], 200);
    }

    public function login(Request $request)
    {
        dd($request->all());
    }
}

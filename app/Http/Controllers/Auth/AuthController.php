<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
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

        $user = User::updateOrCreate([
            'email' => $googleUser['email'],
        ], [
            'name' => $googleUser['name'],
            'google_id' => $googleUser['sub'],
            'avatar' => $googleUser['picture'],
        ]);

        $token = $user->createToken(config('app.name') . '-token')->plainTextToken;

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

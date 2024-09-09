<?php

// namespace App\Http\Middleware;

// use Closure;
// use Illuminate\Http\Request;
// use Symfony\Component\HttpFoundation\Response;

// class SetLocale
// {
//     /**
//      * Handle an incoming request.
//      *
//      * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
//      */
//     public function handle(Request $request, Closure $next): Response
//     {
//         return $next($request);
//     }
// }

// app/Http/Middleware/SetLocale.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserLanguagePreference;
use App\Models\Language;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $userId = Auth::id();
            $userPreference = UserLanguagePreference::where('user_id', $userId)->first();
            if ($userPreference) {
                app()->setLocale($userPreference->language_code);
            } else {
                $defaultLanguage = Language::where('is_default', true)->first();
                app()->setLocale($defaultLanguage->code);
            }
        } else {
            $defaultLanguage = Language::where('is_default', true)->first();
            app()->setLocale($defaultLanguage->code);
        }

        return $next($request);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TranslationController extends Controller
{
    /**
     * Display a translated welcome message.
     *
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        // Example: Fetching translations for English and French
        $languageCode = $request->get('lang', 'en'); // Default to English if no language specified

        // Fetch translations using the helper function
        $welcomeMessage = translate('welcome_message', $languageCode);
        $description = translate('description', $languageCode);

        // Pass the translated content to the view
        return view('translations.index', compact('welcomeMessage', 'description', 'languageCode'));
    }
}

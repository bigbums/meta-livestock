<?php
// app/Helpers/translation_helper.php
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

use App\Models\Translation;

// if (!function_exists('translate')) {
//     function translate($key)
//     {
//         $locale = app()->getLocale();
//         $translation = Translation::where('key', $key)->where('language_code', $locale)->first();

//         return $translation ? $translation->value : $key;
//     }
// }

if (!function_exists('translate')) {
    function translate($key, $languageCode = 'en')
    {
        $cacheKey = "translation_{$languageCode}_{$key}";

        // Check if translation is cached
        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        // Fetch translation from the database
        $translation = DB::table('translations')
            ->where('key', $key)
            ->where('language_code', $languageCode)
            ->value('value');

        // If translation not found, return the key itself
        if (!$translation) {
            return $key;
        }

        // Cache the translation for future requests
        Cache::put($cacheKey, $translation, 3600); // Cache for 1 hour

        return $translation;
    }
}

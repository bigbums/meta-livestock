<!DOCTYPE html>
<html lang="{{ $languageCode }}">

<head>
    <meta charset="UTF-8">
    <title>{{ translate('page_title', $languageCode) }}</title>
</head>

<body>
    <h1>{{ $welcomeMessage }}</h1>
    <p>{{ $description }}</p>

    <!-- Language switcher for demonstration -->
    <a href="{{ url('/translations?lang=en') }}">English</a> |
    <a href="{{ url('/translations?lang=fr') }}">French</a>
</body>

</html>

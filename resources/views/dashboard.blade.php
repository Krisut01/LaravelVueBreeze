<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo Lieasdasdsaeasst</title>
    @vite('resources/js/app.js')
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body>
    <div id="app">
        <todo></todo>
    </div>

    <script>
        window.location = '/todo';
    </script>
    

    !
</body>
</html>

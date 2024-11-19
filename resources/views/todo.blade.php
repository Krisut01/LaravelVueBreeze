<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo Litse</title>
    @vite('resources/js/app.js') <!-- This ensures your JS file is loaded correctly -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body>
    <div id="app">
        <todo></todo> <!-- Here you are using the 'todo' component you registered -->
    </div>
</body>
</html>

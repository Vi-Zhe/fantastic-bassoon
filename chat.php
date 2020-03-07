<link href="chat.css" rel="stylesheet">

<div id="app"></div>

<!-- <form method="POST" action="">
    <input type="text" name="login" required/>
    <input type="password" name="password" required/>
    <input type="submit" value="Войти" id="login"/>
</form> -->

<!-- <main>
    <section class="users">
        <?php
        $link = mysqli_connect(
            'localhost',
            'root',
            '',
            'web0812'
        );
        $query = "SELECT LOGIN FROM users WHERE ACTIVE=true";
        $resDb = mysqli_query($link, $query);
        while($user = mysqli_fetch_assoc($resDb)){
            echo "<div class='user'>{$user['LOGIN']}</div>";
        }
        mysqli_close($link);
        ?>
    </section>

    <section class="chat">
        <div class="messages" id="messages">
        </div>
        <div class="message">
            <input type="hidden" id="from"/>
            <input type="hidden" id="to"/>
            <textarea id="message"></textarea>
            <button id="submit_message">Отправить</button>
        </div>
    </section>
</main> -->

<script src="chat.js"></script>
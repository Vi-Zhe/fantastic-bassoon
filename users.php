<?php

class DbController{
    private static $DB_NAME = 'web0812';
    private static $DB_HOST = 'localhost';
    private static $DB_LOGIN = 'root';
    private static $DB_PASSWORD = '';

    protected $link = null;

    function __construct(){
        $this->connect();
    }


    function __destruct(){
        mysqli_close($this->link);
        $this->link = null;
    }

    private function connect(){
        $this->link = mysqli_connect(
            $this::$DB_HOST,
            $this::$DB_LOGIN,
            $this::$DB_PASSWORD,
            $this::$DB_NAME
        );
    }

    public function users($login, $password){
        $query = "SELECT LOGIN FROM users WHERE ACTIVE=true";
        $resDb = mysqli_query( $this->link, $query);
        while($user = mysqli_fetch_assoc($resDb)){
            echo "<div class='user'>{$user['LOGIN']}</div>";
        }
        mysqli_close( $this->link);
    }    
}





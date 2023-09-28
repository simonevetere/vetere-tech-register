function step1() {
    $("#myModal").prop( "hidden", false );

     if($("#email").attr('type') == 'email' || $("#email").attr('name') == 'email') {
     
        if($("#email").val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            
            showValidate();
            alert("Invalid Email");
     
        } else {

            var email = $("#email").val();

            $("#gotostep2").prop( "disabled", false );
            $("#gotostep2").prop( "hidden", false );
            $("#verification").prop( "style", "" );
            $("#verification").prop( "hidden", false );
            $("#verification").prop( "disabled", false );
     
            // Creare un'istanza dell'oggetto XMLHttpRequest
            let xhr = new XMLHttpRequest();

            // Aprire la connessione con il server specificando il metodo, l'URL e la modalità asincrona
            xhr.open("GET", "https://vetere.tech/verification?email=" + email +  "&sendmail=true&extoken=", true);

            // Assegnare una funzione da eseguire quando la richiesta è completata
            xhr.onload = function() {

                var resp = JSON.parse(xhr.response);

                // Verificare se lo status HTTP è 200 (OK)
                if (xhr.status == 200) {
                    
                    alert(resp.message);

                // Fare il redirect alla pagina indicata dall'URL
                } else {
    
                    alert(resp.message);

                    return false;
              }
            };

            // Inviare la richiesta al server
            xhr.send();
        }
    }
};


function checkmailtocken (input) {
    
    var email = $("#email").val();
    var verification = $("#verification").val();

// Creare un'istanza dell'oggetto XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Aprire la connessione con il server specificando il metodo, l'URL e la modalità asincrona
    xhr.open("GET", "https://vetere.tech/verification?email=" + email +  "&sendmail=false&extoken=" + verification, true);

    // Assegnare una funzione da eseguire quando la richiesta è completata
    xhr.onload = function() {

        var resp = JSON.parse(xhr.response);

        // Verificare se lo status HTTP è 200 (OK)
        if (xhr.status == 200) {

            $("#verification").prop( "disabled", false );
            $("#verification").prop( "hidden", false );

            $("#gotostep2").prop( "disabled", true );
            $("#gotostep2").prop( "hidden", true );  

            $("#gotostep3").prop( "disabled", false );
            $("#gotostep3").prop( "hidden", false );            
            
            alert(resp.message);


            window.localStorage.setItem('email', email);
            window.location = "http://127.0.0.1:8081/step2";

        // Fare il redirect alla pagina indicata dall'URL
        } else {

            alert(resp.message);
      }
    };

    // Inviare la richiesta al server
    xhr.send();
};

function step2() {
     if($("#email").attr('type') == 'email' || $("#email").attr('name') == 'email') {
     
        if($("#email").val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            
            showValidate();
            alert("Invalid Email");
     
        } else {

            if($("#chatbot-name").val().indexOf(".") >= 0 || $("#chatbot-name").val().indexOf(" ") >= 0 || $("#chatbot-name").val() == ""){
                
                alert("Invalid Chatbot Name");

                return false;
            }

            if($("#prompt").val() == ""){
                
                alert("Invalid prompt");

                return false;
            }

            var username = $("#email").val();
            var nome = $("#chatbot-name").val();
            var password = $("#password").val();
            var prompt = $("#prompt").val();
     
            // Creare un'istanza dell'oggetto XMLHttpRequest
            let xhr = new XMLHttpRequest();

            // Aprire la connessione con il server specificando il metodo, l'URL e la modalità asincrona
            xhr.open("GET", "https://vetere.tech/manager?username=" + username +  "&nome=" + nome + "&password=" + password + "&prompt=" + prompt + "&ip=", true);

            // Assegnare una funzione da eseguire quando la richiesta è completata
            xhr.onload = function() {

                var resp = JSON.parse(xhr.response);

                // Verificare se lo status HTTP è 200 (OK)
                if (xhr.status == 200) {
                    
                    alert(resp.message);

                // Fare il redirect alla pagina indicata dall'URL
                } else {
                    alert(resp.message);
              }
            };

            // Inviare la richiesta al server
            xhr.send();

            // Creare un'istanza dell'oggetto XMLHttpRequest
            let xhr_login = new XMLHttpRequest();

            // Aprire la connessione con il server specificando il metodo, l'URL e la modalità asincrona
            xhr_login.open("GET", "https://vetere.tech/login?username=" + username +  "&nome=" + nome + "&password=" + password, true);

            // Assegnare una funzione da eseguire quando la richiesta è completata
            xhr_login.onload = function() {

                var resp = JSON.parse(xhr_login.response);
                console.log(xhr_login);
                // Verificare se lo status HTTP è 200 (OK)
                if (xhr_login.status == 200) {
                    
                    alert(resp.message);

                    window.localStorage.setItem('token', resp.token);
                    window.localStorage.setItem('nome', nome);

                    window.location = "http://127.0.0.1:8081/step3";
                // Fare il redirect alla pagina indicata dall'URL
                } else {
    
                    alert(resp.message);

                    return false;
              }
            };

            xhr_login.send();

        }
    }
};

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
};

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
};
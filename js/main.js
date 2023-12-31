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

                    $("#sendcode").prop( "hidden", true );
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
            window.location = "https://register.vetere.tech/step2";

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

            // Crea un oggetto RegExp con il modello desiderato
            var regex = /^[A-Za-z]+$/;

            // Ottieni il valore del campo
            var name = $("#chatbot-name").val();
            // Testa se il valore corrisponde alla regex
            if (!regex.test(name) || $("#chatbot-name").val().indexOf(".") > 0 || $("#chatbot-name").val().indexOf(" ") > 0 || $("#chatbot-name").val() == "") {
                    
                alert("Invalid Chatbot Name, please use a-z,A-Z");

                return false;
            
            }

            if($("#prompt").val() == ""){
                
                alert("Invalid prompt");

                return false;
            }

            if($("#password").val().length < 8){
            
                alert("password minimum lenght 8 char");

                return false;
            }                


            var username = $("#email").val();
            var nome = $("#chatbot-name").val();
            var password = $("#password").val();
            var prompt = $("#prompt").val();
     
            localStorage.setItem("chatbot-name", nome);
            
            // Creare un'istanza dell'oggetto XMLHttpRequest
            let xhr = new XMLHttpRequest();

            // Aprire la connessione con il server specificando il metodo, l'URL e la modalità asincrona
            xhr.open("GET", "https://vetere.tech/manager?username=" + username +  "&nome=" + nome + "&password=" + password + "&prompt=" + prompt + "&ip=", true);

            // Assegnare una funzione da eseguire quando la richiesta è completata
            xhr.onload = function() {

                var resp = JSON.parse(xhr.response);

                console.log(xhr.status);
                // Verificare se lo status HTTP è 200 (OK)
                if (xhr.status == 200) {
                    
                    alert(resp.message);
                    
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

                            // Creare un'istanza dell'oggetto XMLHttpRequest
                            let xhr_deploy = new XMLHttpRequest();

                            // Aprire la connessione con il server specificando il metodo, l'URL e la modalità asincrona
                            xhr_deploy.open("GET", "https://vetere.tech/start_deploy?nome=" + nome + "&prompt=" + prompt, true);

                            // Inviare la richiesta al server
                            xhr_deploy.send();
                            
                            window.localStorage.setItem('token', resp.token);
                            window.localStorage.setItem('nome', nome);

                            window.location = "https://register.vetere.tech/step3";
                        // Fare il redirect alla pagina indicata dall'URL
                        } else {
            
                            alert(resp.message);

                            return false;
                      }
                    };

                    xhr_login.send();

                // Fare il redirect alla pagina indicata dall'URL
                } else {
                    alert(resp.message);
              }
            };

            // Inviare la richiesta al server
            xhr.send();

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
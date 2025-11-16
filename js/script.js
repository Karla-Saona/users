const lista = document.getElementById("listaUsuarios");//traer 

function obtenerUsuarios() {
    fetch("https://jsonplaceholder.typicode.com/users")//función de JS q descarga los datos desde una URL(las imagenes). Siempre hay q comprobar si funciona
        .then(res => {  //espera la respuesta del servidor (promesa) En caso de error...
            if (!res.ok) {
                console.log("Error:", res.status);
                return;
            }
            return res.json();// convierte la respuesta en un array de objetos
        })
        .then(datos => { //Aquí ya tengo los usuarios dentro de la variable 'datos'
            if (!datos) return;

            const usuariosProcesados = []; //es un array vacío que voy a llenar después

            for (let i = 0; i < datos.length; i++) { //bucle q recorre cada usuario recibido desde la API (uno por uno)

                const {
                    id,
                    name,
                    username,
                    phone,
                    email,
                    company,
                    address 
                } = datos[i];   //destructuring lo utilizó para extraer solo las propiedades que necesitamos del usuario actual.

                const nuevaAddress = {
                    ...address,
                    fullAddress: `${address.street}, ${address.suite}, ${address.city}`
                };  
                
    /* Creó un nuevo objeto de dirección usando el spread operator (...address)
    y añadó un campo extra llamado "fullAddress" que contiene la dirección completa
    uniendo street + suite + city.*/


                const nuevoUsuario = {
                    id,
                    name,
                    username,
                    phone,
                    email,
                    company,
                    ...datos[i], // Copió el objeto original completo
                    age: Math.floor(Math.random() * 32) + 18,  // Edad aleatoria entre 18 y 50
                    img: `./assets/img/${id}.jpeg`,   // Imagen asociada al ID del usuario
                    address: nuevaAddress  // Reemplazó address por la versión mejorada
                };

    // Creó un nuevo usuario combinando:
    // Los datos originales (con spread)
    // Nuevas propiedades personalizadas: age, img y address completo.

                usuariosProcesados.push(nuevoUsuario);
            }
    // Guardamos este nuevo usuario modificado en el array usuariosProcesados
    // que luego usaré para mostrar las tarjetas en el HTML.

            mostrarUsuarios(usuariosProcesados);
        });
}
// Cuando el bucle termina, enviamos el array completo de usuarios modificados
// a la función mostrarUsuarios() para dibujarlos en pantalla.


function mostrarUsuarios(usuarios) {
     // Esta función recibe el array de usuarios ya procesados
    // y se encarga de crear las tarjetas en el HTML para mostrarlos en pantalla.

    for (let i = 0; i < usuarios.length; i++) {

        const {
            img,
            name,
            age,
            username,
            phone,
            email,
            company,
            address
        } = usuarios[i];

        //Usamos destructuring para obtener las propiedades necesarias del usuario actual.
        // Esto hace el código más limpio y fácil de leer.

        const li = document.createElement("li"); // Creamos un nuevo elemento <li> para insertar la tarjeta del usuario. solo esta en la memoria, no se puede ver en la pantalla
        li.classList.add("usuario-card"); // Añadimos una clase al <li> para poder darle estilos desde CSS.



    // Insertó dentro del <li> toda la estructura HTML de la tarjeta.
    // Usó template literals para incluir variables como ${name} o ${img}.
        li.innerHTML = `
            <div class="card">
                <img src="${img}">
                <div class="info">
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Edad:</strong> ${age}</p>
                    <p><strong>Username:</strong> ${username}</p>
                    <p><strong>Teléfono:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Compañía:</strong> ${company.name}</p>
                    <p><strong>Dirección:</strong> ${address.fullAddress}</p>
                </div>
            </div>  
        `; /* Aquí se construye toda la tarjeta visual del usuario: img, datos personales, empresa...*/
        
        lista.appendChild(li); //  agregamos el <li> como hijo del <ul id="listaUsuarios"> y pone la tarjeta en la pantalla
    }
}

obtenerUsuarios();//inicia el programa


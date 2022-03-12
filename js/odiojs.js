var ListaPersona = []

var botonGuardado = undefined

class Person{
    constructor(nombre, edad, sexo, id){
        this.nombre = nombre;
        this.edad = edad;
        this.sexo = sexo;
        this.id = id;
    }
}

function GenerarId(ListaRecorrer){ 
    let GeneratedID = 1


    if (ListaRecorrer.length == 0)
    {
        return GeneratedID
    } 
    else
    {
        ListaRecorrer.forEach(element => {
            if(element.id == GeneratedID){
                GeneratedID = GeneratedID + 1
            }
            else{
                return GeneratedID
            }
        });
    }   
    return GeneratedID
}



function CrearPersona(){
    let _Nombre = document.getElementById('Nombre').value
    let _Edad = document.getElementById('Edad').value
    let SexoS = document.getElementById('SexSelect')
    let _Sexo = SexoS.options[SexoS.selectedIndex].text


    let validacion = 0

    if(_Nombre != ""){
        validacion = validacion + 1
    }

    if(_Edad != ""){
        validacion = validacion + 1
    }

    if(_Sexo == "Femenino" || "Masculino"){
        validacion = validacion + 1

    }

    if (validacion == 3){

        ListaPersona = ListaPersona.sort((a,b) => a.id - b.id)

        let nuevaPersona = new Person(_Nombre, _Edad, _Sexo, GenerarId(ListaPersona))
    
        ListaPersona.push(nuevaPersona)

        alert("Se ha agregado una nueva persona exitosamente.")

        EmptyFields()

        ListarPersona(ListaPersona)
    }
    else{
        alert("Faltan campos!!")
    }


    

}

function ListarPersona(ArrayLoco){
    let CardsContent = document.getElementById("ListadoCard")
    CardsContent.innerHTML = ''
    ArrayLoco.forEach(element => {
        let eachCard = 
        `<div class="card Cartita" id="Card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Nombre: ${element.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">ID: ${element.id}</h6>
                <p class="card-text">Sexo: ${element.sexo}</p>
                <p class="card-subtitle mb-2 text-muted">Edad: ${element.edad}</p>
                <button type="button" onclick="EliminarPorId(${element.id}, ListaPersona)" id="btnEliminar" class="btn btn-danger">Eliminar</button>
                <button type="button" onclick="EditarPorId(${element.id}, ListaPersona)" id="btnEditar" class="btn btn-warning">Editar</button>
            </div>
        </div>`
        CardsContent.innerHTML += (eachCard)       
    });
}

function EliminarPorId(id_, PerArr){
    
    if(confirm("¿Está seguro de querer eliminar la persona " + id_ + "?")){
        ListaPersona = PerArr.filter(element => element.id != id_);
        ListarPersona(ListaPersona)
    }
    
}

function EditarPorId(id_, PerArr){

    let EditarPers = PerArr.filter(element => element.id == id_)[0]


    document.getElementById('Nombre').value = EditarPers.nombre
    document.getElementById('Edad').value = EditarPers.edad
    var SeleccionarSex = document.getElementById('SexSelect')
    let numerito = 0

    for (let i = 0; i < SeleccionarSex.length; i++) {
        if(SeleccionarSex[i].innerText == EditarPers.sexo){
            numerito = i
            break
        }
    }

    document.getElementById('SexSelect').selectedIndex = numerito
    
    //Modo edición

    botonAgregar = document.getElementById('btnAgregar')

    botonGuardado = GetAddButtonBack(botonAgregar)

    SeccionCrear = document.getElementsByClassName('Creare')[0]

    //Eliminar botón agregar

    SeccionCrear.removeChild(botonAgregar)

    botonEditar = `<button type="button" id="btnConfirmarEdicion" onclick="ConfirmarEdicion(${EditarPers.id}, ListaPersona)" class=" fieldos btn btn-success">Guardar cambios</button>`
    botonCancelar = `<button type="button" id="btnCancelarEdicion" onclick="ModoCreacion()" class="fieldos btn btn-danger">Cancelar</button>`

    SeccionCrear.innerHTML = botonEditar
    SeccionCrear.innerHTML += botonCancelar


    

}

function GetAddButtonBack(AddButton){
    return AddButton
}


function ConfirmarEdicion(_id, PerArr){
    
    console.log("The person which is being edited has a ID of: " + _id)



    let NombreEditado = document.getElementById('Nombre').value
    let EdadEditada = document.getElementById('Edad').value
    let SexoSEditado = document.getElementById('SexSelect')
    let SexoEditado = SexoSEditado.options[SexoSEditado.selectedIndex].text

    let PersonaEditada = new Person(NombreEditado, EdadEditada, SexoEditado, _id)
    
    
    PerArr.forEach(x => {
        if(x.id == _id){
            x.nombre = PersonaEditada.nombre
            x.edad = PersonaEditada.edad
            x.sexo = PersonaEditada.sexo
        }
    })

    alert('Persona editada exitosamente')

    ListarPersona(ListaPersona)


    //Modo edición

    ModoCreacion()




}

function EmptyFields(){
    document.getElementById('Nombre').value = ""
    document.getElementById('Edad').value = ""
    document.getElementById('SexSelect').selectedIndex = 0
}

function ModoCreacion(){
    botonConfirmarCambios = document.getElementById('btnConfirmarEdicion')
    botonCancelar = document.getElementById('btnCancelarEdicion')

    SeccionCrear = document.getElementsByClassName('Creare')[0]


    SeccionCrear.removeChild(botonConfirmarCambios)
    SeccionCrear.removeChild(botonCancelar)

    SeccionCrear.appendChild(botonGuardado)

    EmptyFields()
}
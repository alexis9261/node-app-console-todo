import { Task } from "./task.js";

class Tasks {

    // Propiedades de la clase
    _listado = {};

    // Funcion Getter, propia de JavaScript
    get listadoArr( ) {

        const listado = [];

        // Obtenemos todas las llaves del objeto
        Object.keys(this._listado).forEach( key => {
            const task = this._listado[key];
            listado.push( task )
        })

        return listado;
    }

    constructor () {
        this._listado = {};
    }

    create( description = '' ){

        // Creo una nueva tarea
        const task = new Task( description );

        // Agrego la nueva tarea al listado de tareas
        this._listado[task.id] = task;

    }

    storeTasksFromArray( tasks = [] ) {

        tasks.forEach( task => {
            this._listado[task.id] = task;
        });

    }

    show(){

        console.log('\n')
        this.listadoArr.forEach( (task, i) => {
            const idx = `${i + 1}`.green;
            const {description, completed} = task;
            const status = (completed) ? `${'Completada'.green}` : `${'Pendiente'.red}`;

            console.log(`${idx} ${ description } :: ${ status }`);
  
        })

    }

    showCompletedPendingTasks ( showCompleted = true ) {

        console.log('\n')
        this.listadoArr.forEach( (task, i) => {
            
            const idx = `${i + 1}`.green;
            const {description, completed} = task;
            const status = (completed) ? `${'Completada'.green}` : `${'Pendiente'.red}`;

            if(showCompleted){
                if(completed){
                    console.log(`${idx} ${ description } :: ${ completed.green }`);
                }
            }else{
                if(!completed){
                    console.log(`${idx} ${ description } :: ${ status }`);
                }
            }
                
        })

    }

    delete (id = ''){

        if(this._listado[id]){
            delete this._listado[id];
        }
        
    }

    toggleCompleted ( ids = []) {

        ids.forEach( id => {

            const task = this._listado[id];

            if ( !task.completed ) {
                task.completed = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( task => {

            if ( !ids.includes(task.id) ) {
                this._listado[task.id].completed = null;
            }

        })

    }

}

export {
    Tasks
}
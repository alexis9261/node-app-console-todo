import { v4 as uuidv4 } from 'uuid';

class Task {

    // Propiedades de la clase
    id = '';
    description= '';
    completed = null;

    constructor( description ) {

        this.id = uuidv4();
        this.description = description;
        this.completed   = null;

    }



}

export {
    Task
}
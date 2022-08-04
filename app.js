import colors from 'colors';
import { 
        listTasksDelete, 
        menu,
        pause,
        readInput,
        showTasksChecklist,
        confirm } from './helpers/inquirer.js';
import { storeData, readDatabase } from './helpers/storeFile.js';
import { Task } from './models/task.js';
import { Tasks } from './models/tasks.js';

console.clear();
const main = async () => {

    let opt = '';

    const tasks = new Tasks();

    const tasksDB = readDatabase();

    if (tasksDB) {
        tasks.storeTasksFromArray(tasksDB);
    }

    do {

        const { option } = await menu();

        switch (option) {
            case '1': //crear
                const description = await readInput('Descripción:');
                tasks.create(description);
                break;
            case '2': //listar
                tasks.show();
                break;
            case '3': //mostrar completadas
                tasks.showCompletedPendingTasks();
                break;
            case '4': //mostrar pendientes
                tasks.showCompletedPendingTasks(false);
                break;
            case '5': //completar tareas
                const ids = await showTasksChecklist(tasks.listadoArr);
                tasks.toggleCompleted(ids);                
                break;
            case '6': //borrar
                const id = await listTasksDelete(tasks.listadoArr)
                if(id !== '0'){
                    const ok = await confirm('¿Estas seguro que deseas borrar la tarea?');
    
                    if(ok){
                        tasks.delete( id );
                        console.log('Tarea borrada exitosamente!')
                    }
                }
                break;
            case '0':
                
                break;
        }

        storeData(tasks.listadoArr);

        await pause();

    } while (opt !== '0');

}

main();
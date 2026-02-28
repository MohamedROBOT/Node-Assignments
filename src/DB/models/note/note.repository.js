import DBRepository from "../../db.repository.js";
import Note from "./note.model.js";

class NoteRepository extends DBRepository {
    constructor(){
        super(Note)
    }
}


const noteRepository = new NoteRepository();
export default noteRepository;
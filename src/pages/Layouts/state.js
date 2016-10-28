/**
 * for Layouts
 */
import { restate } from 'UTILS';

class State {
    constructor () {
        this.state = {
            loading: false
        };
    }
}

export default restate.createState(State)

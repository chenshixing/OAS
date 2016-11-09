/**
 * indexState
 */
import { restate } from 'UTILS';

class State {
    constructor () {
        this.state = {
            data: null
        };
        this.sessionId = 'redirect_state';
    }
}

export default restate.createState(State)

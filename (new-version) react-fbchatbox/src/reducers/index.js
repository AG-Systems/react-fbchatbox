// const statuses = ['TODO', 'DOING', 'DONE'];
const statuses = ['TODO', 'DOING'];

const task = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                id: action.id,
                text: action.text,
                online: action.online,
                executor: action.executor,
                status: 'TODO'
            };
        case 'REMOVE_TASK':
            if (state.id === action.id) {
                return false;
            }
            return true;
        case 'CHANGE_TASK_STATUS':
            if (state.id !== action.id) {
                return state;
            }
            let statusNum = statuses.indexOf(state.status);
            let active = false;
            const nextStatus = 
                statusNum === 1 // 2 
                ? statuses[0] 
                : statuses[statusNum + 1];
            if(state.id === action.id)
            {
                active = true
            }
            return {
                ...state,
                status: nextStatus,
                active_chat: active,
            };
            
        case 'CHANGE_TO_ACTIVE_CHAT':
            if(state.id == action.id)
            {
                return {
                    ...state,
                    active_chat: true,
                };
            }
            return {
                ...state,
                active_chat: false,
            };
        default:
            return state;
    }
};

const tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                task(undefined, action)
            ];
        case 'REMOVE_TASK':
            return state.filter(t => 
                task(t, action)
            );
        case 'CHANGE_TASK_STATUS':
            return state.map(t => 
                task(t, action)
            );
        case 'CHANGE_TO_ACTIVE_CHAT':
            return state.map(t => 
                task(t, action)
            );
        default:
            return state;
    }
};

export default tasks;
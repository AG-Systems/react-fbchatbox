let nextTaskId = 0;

export const addTask = ({ text, executor, online }) => {
    return {
        type: 'ADD_TASK',
        id: (nextTaskId++).toString(),
        text,
        online,
        executor
    };
};

export const removeTask = (id) => {
    return {
        type: 'REMOVE_TASK',
        id
    };
};

export const changeTaskStatus = (id) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        id
    };
};

export const changeToActiveChat = (id, text) => {
    return {
        type: 'CHANGE_TO_ACTIVE_CHAT',
        id,
        text
    };
};
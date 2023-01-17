import http from "./httpService";

const apiUrl="http://localhost:3900/api/tasks";

export function getTasks(){
   return http.get(apiUrl);
};
export function deleteTask(taskId){
    return http.delete(apiUrl + '/'+ taskId);
};
 export function saveTask(task){
    return http.post(apiUrl,task);
};
const {API,tokens} = require("../models/const");


async function fetchTasks(token) {
  try {
     const response = await fetch(`${API}/clicker/list-tasks`,{
       method: "POST",
       headers: {
        "authorization": token
      }
    });
    if (!response.ok)
    {
      console.log(await response.json())
        throw new Error(`Feaild to fetch tasks status code: ${response.status}`)
    }
    
    const tasks = await response.json();
    //console.log(tasks)
    return tasks.tasks;
  }
  catch (err) {
    console.error(err.message)
    return null;
  }
  
}

async function checkTasks(token,task) {
  
    if (!task.isCompleted) {
      try {
      const response = await fetch(`${API}/clicker/check-task`, {
        method: "POST",
        headers: {
          "authorization": token,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          "taskId": task.id
        })
      });
      console.log(task.id)
      if(!response.ok) {
        console.log(await response.json());
        throw new Error(`Feaild to check task status code: ${response.status}`)
      }
      const taskClaimd = response.json()
      console.log(taskClaimd)
      return taskClaimd;
    }
    catch(err) {
      console.error(err.message)
      return null
    }
    
  }
}

async function checkTaskForTokens() {
  const promises = tokens.map(async(token) => {
    const tasks = await fetchTasks(token);
    //console.log(tasks)
    if(tasks) {
      //console.log(tasks)
      for (task of tasks) {
        const checkTask = await checkTasks(token,task);
      if(checkTask) {
        console.log(`Task claimd successfully`)
      }
      else {
        console.log(checkTask)
      }
    }
    }
  })
  await Promise.all(promises)
}
exports.checkTask = checkTaskForTokens;
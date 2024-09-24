const express = require("express");
const router = express.Router();

let todos = [
  {
    id: "123",
    text: "範例資料1",
  },
  {
    id:'1234',
    text:'範例資料2',

  }
];

// req 前端發送的資料，res 前端回傳的資料
router
// 取得列表
.get("/todos", (req, res) => {
  res.send(todos);
})

// 新增
.post("/todos",(req, res)=>{
  const { text } = req.body;
  console.log(text);

  // 錯誤處理
  if(!text){
    res.status(400);
    return res.send({
      message: "text 不得為空"
    })
  }

  // 新增
  const id = new Date().getTime().toString();
  const todo = {
    id,
    text
  }

  todos.push(todo)

  res.send();
})

//刪除
.delete("/todos/:id",(req, res)=>{
  const { id } = req.params;
  console.log(id);
 
  // 檢查索引id
  const index = todos.findIndex((todo)=>{
    return todo.id === id
  });

  // 如果索引不存在
  if(index === -1){
    res.status(400);
    return res.send({
      message: "無此資料"
    });
  }

  // 刪除
  todos.splice(index, 1);
  res.send(todos);
})

.put("/todos/:id", (req, res) =>{
  const { id } = req.params;
  const { text } = req.body;

  // 檢查索引id
  const index = todos.findIndex((todo)=>{
    return todo.id === id
  });

  // 如果索引不存在
  if(index === -1){
    res.status(400);
    return res.send({
      message: "無此資料"
    });
  }

  // 更新
  todos[index].text = text;

  res.send(todos);
})


module.exports = router;

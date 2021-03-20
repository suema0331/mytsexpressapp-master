import {RequestHandler} from 'express';
import {Todo} from "../models/todo";

const TODOS: Todo[] =[];

export const createTodo: RequestHandler = (req ,
                                           res ,
                                           _next) => {
    const text = (req.body as {text: string}).text;//text:stringをもつrequest

    //post時に新配列に追加
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    //201responseを作成
    res.status(201).json({message:'TODO作成完了！',createdTodo:newTodo});
}

export const getTodos: RequestHandler =
    (_req, res, _next) =>{
    res.json({todos: TODOS});
}

//idを受けて更新
export const updateTodo: RequestHandler <{id: string}> = (req,res,_next) =>{
    const todoId =  req.params.id;
    const updateText = (req.body as {text:string}).text;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId); //対象の要素のindexを取得
    if (todoIndex<0){
        throw new Error ("対象のTODOが見つかりませんでした"); //app.tsのエラーハンドリング関数で処理
    }

    TODOS[todoIndex] = new Todo(todoId,updateText);
    res.json({message:"更新しました！", updateTodo: TODOS[todoIndex]});


}

export const deleteTodo: RequestHandler = (req, res, _next) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error('対象のTODOが見つかりませんでした。');
    }

    TODOS.splice(todoIndex, 1);

    res.json({ message: 'TODOを削除しました。' });
};


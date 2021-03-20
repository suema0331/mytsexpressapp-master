//expressのrouter設定
import {Router} from "express";
import {createTodo, deleteTodo, getTodos, updateTodo} from "../controllers/todos";


//Router関数として実行し、戻り値のオブジェクトにリクエストを受け付けるpathを設定
const router = Router();

//postリクエストを受けると、第二引数の関数をexpressが自動実行する
router.post('/',createTodo);

router.get('/', getTodos);

//特定のidを持つpath
router.patch('/:id',updateTodo);

router.delete('/:id', deleteTodo);

export default router;



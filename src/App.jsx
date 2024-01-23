import { useEffect, useState } from 'react';
import './App.css'
import { useAuth } from './firebase/auth.firebase'
import { useNavigate } from 'react-router-dom';
import Loader from './components/Loader';
import { MdDeleteForever } from "react-icons/md";
import {
  collection, addDoc, getDocs, query, deleteDoc, updateDoc, doc, getDoc,
} from "firebase/firestore";

import { db } from './firebase/config.firebase';
import ToastError from './utility/toastify';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { authUser, isLoading } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isLoading && !authUser) {
      navigate('/login')
    }
  }, [isLoading, authUser, navigate])

  const [todoTitle, setTodoTitle] = useState("");
  const [todoInput, setTodoInput] = useState("");
  const [TodoDate, setTodoDate] = useState("");
  const [Assignuser, setAssignUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [userList, setUserList] = useState();
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
    if (!!authUser) {
      fetchTodos(authUser.uid);
    }
  }, [authUser, isLoading]);

  const EmptyTodoError = () => {
    ToastError({ message: "Empty Todo can't be added" })
  }
  const addToDo = async () => {
    try {
      if (!todoInput.trim().length) {
        EmptyTodoError();
        return;
      }
      await addDoc(collection(db, "todos"), {
        content: todoInput,
        completed: false,
        title: todoTitle,
        description: todoInput,
        dueDate: TodoDate,
        assignedUser: Assignuser,
        createdBy: authUser.uid,
      });
      fetchTodos(authUser.uid);
      setTodoInput("");
      setTodoTitle("");
      setTodoDate("")
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (docId) => {
    try {
      const DocumentData = await getDoc(doc(db, 'todos', docId))
      const { createdBy, assignedUser } = DocumentData.data()

      if (createdBy == authUser.uid || assignedUser == authUser.email) {
        await deleteDoc(doc(db, "todos", docId));
        fetchTodos(authUser.uid);
        return;
      }
      else {
        ToastError({ message: "Only admin or assigned person can delete this" })
      }
    } catch (error) {
      console.error(error);
      ToastError({ message: "Something went Wrong" })
    }
  };

  const fetchTodos = async (uid) => {
    try {
      const q = query(collection(db, "todos"));
      const querySnapshot = await getDocs(q);

      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setTodos(data);
    } catch (error) {
      ToastError({ message: "Something went wrong file fetching the data" })
      console.error(error);
    }
  };

  const UpdateData = async (event, docId) => {
    try {
      const docRef = doc(db, "todos", docId);
      await updateDoc(docRef, {
        completed: event.target.checked,
      });
      fetchTodos(authUser.uid);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUsers()
  }, [userList])
  const fetchAllUsers = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const temp = []
    querySnapshot.forEach((doc) => {
      temp.push({
        ...doc.data()
      })
    });
    setUserList(temp)
  };


  const onKeyUp = (event) => {
    if (event.key === "Enter" && todoInput.length > 0) {
      addToDo();
    }
  };

  return !authUser ? (
    <Loader />
  ) : (
    <main className="">
      <div className="max-w-3xl mx-auto mt-10 p-8">
        <div className="bg-white -m-6 p-3 sticky top-0">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-5xl md:text-5xl font-bold">
              Task Management System
            </h1>
          </div>
          <div className="flex items-center gap-4 mt-10 flex-col w-full">
            <input
              placeholder={`Write Title of the Todo`}
              type="text"
              className="w-full font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
              autoFocus
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}

            />
            <input
              placeholder={`👋 Hello Resoulter, What to do Today?`}
              type="text"
              className="w-full font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"

              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}

            />
            <div className='w-full flex justify-center items-center'>
              <h1 className='w-1/4 mb-4 text-4xl font-semibold leading-none  text-gray-900 dark:text-white'>
                Due Date
              </h1>
              <input
                placeholder={`👋 Hello Resoulter, What to do Today?`}
                type="date"
                className="w-1/4 font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
                value={TodoDate}
                onChange={(e) => setTodoDate(e.target.value)}
                onKeyUp={onKeyUp}
              />
            </div>
            <select id="users" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setAssignUser(e.target.value)}>
              <option selected value='demo@gmail.com'>Asign Task to someone</option>
              {
                userList?.map((user) => {
                  if (user.email)
                  if(authUser.email == user.email){
                    return (
                      <option value={user.email}>You</option>
                    )
                  }
                    return (
                      <option value={user.email}>{user.email}</option>
                    )
                })
              }
            </select>

            <button
              className=" w-full h-[60px] text-white rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8]"
              onClick={addToDo}
            >
              Add Task

            </button>
          </div>
        </div>
        <div className="my-10">

          <div
            key="{todo.id}"
            className="flex items-center justify-between mt-4"
          >

          </div>
          {todos.length > 0 &&
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className="flex items-center justify-between mt-4"
              >
                <ul class="w-full  bg-white rounded-lg shadow divide-gray-200 ">
                  <li class="px-6 py-4">
                    <p>
                      Assigned To: {(authUser.email == todo.assignedUser) ? "You" : todo?.assignedUser
                      }
                    </p>
                    <div class="flex justify-between">
                      <span class="font-semibold text-lg">{todo.title}</span>
                      <span class="text-gray-500 text-xs"> Due Date:- {todo?.dueDate} </span>
                    </div>
                    <p class="text-gray-700 break-words">{todo.description}</p>

                  </li>
                </ul>
                <div className="flex items-center gap-3">
                  <MdDeleteForever
                    size={35}
                    className="text-red-400 hover:text-red-600 cursor-pointer"
                    onClick={() => deleteTodo(todo.id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div >
      <ToastContainer />
    </main >
  );
}

export default App
